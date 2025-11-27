const Child = require('../models/Child');
const Assessment = require('../models/Assessment');
const ResourceRequest = require('../models/ResourceRequest');
const Message = require('../models/Message');
const crypto = require('crypto');

// Generate unique resource request ID
const generateRequestId = () => {
  const prefix = 'RR';
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// @desc    Get all children assigned to this caregiver
// @route   GET /api/caregiver/children
// @access  Private (Caregiver only)
exports.getMyChildren = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const children = await Child.find({ 
      assignedCaregiver: req.user.id 
    })
      .populate('assignedSocialWorker', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Child.countDocuments({ assignedCaregiver: req.user.id });

    // Get statistics
    const stats = await Child.aggregate([
      { $match: { assignedCaregiver: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: children,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      },
      statistics: {
        total,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Get children error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get detailed information about a specific child
// @route   GET /api/caregiver/children/:childId
// @access  Private (Caregiver only)
exports.getChildDetails = async (req, res) => {
  try {
    const { childId } = req.params;

    // Find by MongoDB _id
    const child = await Child.findOne({
      _id: childId,
      assignedCaregiver: req.user.id
    }).populate('assignedSocialWorker', 'name email phone');

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or not assigned to you'
      });
    }

    // Get recent assessments
    const assessments = await Assessment.find({ child: child._id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get resource requests
    const resourceRequests = await ResourceRequest.find({ child: child._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        child,
        recentAssessments: assessments,
        recentResourceRequests: resourceRequests
      }
    });

  } catch (error) {
    console.error('Get child details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create an assessment for a child
// @route   POST /api/caregiver/assessments
// @access  Private (Caregiver only)
exports.createAssessment = async (req, res) => {
  try {
    const {
      childId,
      assessmentType,
      status,
      description,
      observations,
      recommendations,
      urgency,
      followUpDate
    } = req.body;

    // Find child by MongoDB _id and verify it's assigned to this caregiver
    const child = await Child.findOne({
      _id: childId,
      assignedCaregiver: req.user.id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or not assigned to you'
      });
    }

    // Create assessment
    const assessment = new Assessment({
      child: child._id,
      caregiver: req.user.id,
      socialWorker: child.assignedSocialWorker,
      assessmentType,
      status,
      description,
      observations: observations || [],
      recommendations: recommendations || [],
      urgency: urgency || 'medium',
      followUpDate
    });

    await assessment.save();

    // Send notification message to social worker
    const notificationMessage = new Message({
      sender: req.user.id,
      recipient: child.assignedSocialWorker,
      child: child._id,
      subject: `New Assessment: ${assessmentType} - ${child.firstName}`,
      message: `A new ${assessmentType} assessment has been submitted for ${child.firstName} ${child.lastName}. Status: ${status}. ${description}`,
      priority: urgency === 'urgent' || urgency === 'high' ? 'high' : 'normal',
      relatedTo: 'assessment',
      relatedId: assessment._id
    });

    await notificationMessage.save();

    res.status(201).json({
      success: true,
      message: 'Assessment created successfully',
      data: assessment
    });

  } catch (error) {
    console.error('Create assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all assessments created by this caregiver
// @route   GET /api/caregiver/assessments
// @access  Private (Caregiver only)
exports.getMyAssessments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { caregiver: req.user.id };

    // Add filters
    if (req.query.childId) {
      const child = await Child.findOne({ childId: req.query.childId });
      if (child) filter.child = child._id;
    }
    if (req.query.assessmentType) {
      filter.assessmentType = req.query.assessmentType;
    }
    if (req.query.urgency) {
      filter.urgency = req.query.urgency;
    }

    const assessments = await Assessment.find(filter)
      .populate('child', 'childId personalInfo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Assessment.countDocuments(filter);

    res.json({
      success: true,
      data: assessments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create a resource request for a child
// @route   POST /api/caregiver/resource-requests
// @access  Private (Caregiver only)
exports.createResourceRequest = async (req, res) => {
  try {
    const {
      childId,
      category,
      title,
      description,
      urgency,
      estimatedCost,
      quantity,
      justification
    } = req.body;

    // Find child by MongoDB _id and verify it's assigned to this caregiver
    const child = await Child.findOne({
      _id: childId,
      assignedCaregiver: req.user.id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or not assigned to you'
      });
    }

    // Generate request ID
    const requestId = generateRequestId();

    // Create resource request
    const request = new ResourceRequest({
      requestId,
      child: child._id,
      caregiver: req.user.id,
      socialWorker: child.assignedSocialWorker,
      category,
      title,
      description,
      urgency: urgency || 'medium',
      estimatedCost: estimatedCost || 0,
      quantity: quantity || 1,
      justification,
      status: 'pending'
    });

    await request.save();

    // Send notification to social worker
    const notificationMessage = new Message({
      sender: req.user.id,
      recipient: child.assignedSocialWorker,
      child: child._id,
      subject: `Resource Request: ${title}`,
      message: `A new resource request has been submitted for ${child.firstName} ${child.lastName}. Category: ${category}. ${description}`,
      priority: urgency === 'urgent' || urgency === 'high' ? 'high' : 'normal',
      relatedTo: 'resource-request',
      relatedId: request._id
    });

    await notificationMessage.save();

    res.status(201).json({
      success: true,
      message: 'Resource request created successfully',
      data: request
    });

  } catch (error) {
    console.error('Create resource request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all resource requests created by this caregiver
// @route   GET /api/caregiver/resource-requests
// @access  Private (Caregiver only)
exports.getMyResourceRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { caregiver: req.user.id };

    // Add filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const requests = await ResourceRequest.find(filter)
      .populate('child', 'childId personalInfo')
      .populate('socialWorker', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ResourceRequest.countDocuments(filter);

    // Get statistics
    const stats = await ResourceRequest.aggregate([
      { $match: { caregiver: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: requests,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      },
      statistics: {
        total,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Get resource requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Send message to social worker
// @route   POST /api/caregiver/messages
// @access  Private (Caregiver only)
exports.sendMessage = async (req, res) => {
  try {
    const {
      recipientId,
      childId,
      subject,
      message,
      priority
    } = req.body;

    let childObjectId = null;
    if (childId) {
      const child = await Child.findOne({ childId });
      if (child) childObjectId = child._id;
    }

    const newMessage = new Message({
      sender: req.user.id,
      recipient: recipientId,
      child: childObjectId,
      subject,
      message,
      priority: priority || 'normal',
      relatedTo: 'general'
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get messages (inbox)
// @route   GET /api/caregiver/messages
// @access  Private (Caregiver only)
exports.getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const messages = await Message.find(filter)
      .populate('sender', 'name email role')
      .populate('recipient', 'name email role')
      .populate('child', 'childId personalInfo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments(filter);

    // Count unread messages
    const unreadCount = await Message.countDocuments({
      recipient: req.user.id,
      status: 'unread'
    });

    res.json({
      success: true,
      data: messages,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      },
      unreadCount
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/caregiver/messages/:messageId/read
// @access  Private (Caregiver only)
exports.markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findOne({
      _id: messageId,
      recipient: req.user.id
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.status = 'read';
    message.readAt = new Date();
    await message.save();

    res.json({
      success: true,
      message: 'Message marked as read'
    });

  } catch (error) {
    console.error('Mark message as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/caregiver/dashboard
// @access  Private (Caregiver only)
exports.getDashboardStats = async (req, res) => {
  try {
    // Total children
    const totalChildren = await Child.countDocuments({
      assignedCaregiver: req.user.id
    });

    // Active assessments (recent)
    const recentAssessments = await Assessment.countDocuments({
      caregiver: req.user.id,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Pending resource requests
    const pendingRequests = await ResourceRequest.countDocuments({
      caregiver: req.user.id,
      status: 'pending'
    });

    // Unread messages
    const unreadMessages = await Message.countDocuments({
      recipient: req.user.id,
      status: 'unread'
    });

    // Children needing attention (based on recent assessments)
    const needsAttention = await Assessment.aggregate([
      {
        $match: {
          caregiver: req.user.id,
          urgency: { $in: ['high', 'urgent'] },
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: '$child',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalChildren,
        recentAssessments,
        pendingRequests,
        unreadMessages,
        childrenNeedingAttention: needsAttention.length
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = exports;

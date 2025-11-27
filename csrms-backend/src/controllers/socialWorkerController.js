const Child = require('../models/Child');
const Case = require('../models/Case');
const User = require('../models/User');
const crypto = require('crypto');

// Generate unique child ID
const generateChildId = () => {
  const prefix = 'CH';
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Generate unique case ID
const generateCaseId = () => {
  const prefix = 'CS';
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// @desc    Add a new child to the system
// @route   POST /api/social-worker/children
// @access  Private (Social Worker only)
exports.addChild = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      guardianName,
      guardianRelationship,
      guardianPhone,
      guardianEmail,
      district,
      sector,
      cell,
      village,
      healthcareNeeded,
      educationNeeded,
      nutritionNeeded,
      housingNeeded
    } = req.body;

    // Generate unique child ID
    const childId = generateChildId();

    // Create child
    const child = new Child({
      childId,
      personalInfo: {
        firstName,
        lastName,
        dateOfBirth,
        gender
      },
      guardian: {
        name: guardianName,
        relationship: guardianRelationship,
        phone: guardianPhone,
        email: guardianEmail,
        address: {
          district,
          sector,
          cell,
          village
        }
      },
      location: {
        district,
        sector
      },
      assignedSocialWorker: req.user.id,
      status: 'active',
      needs: {
        healthcare: {
          required: healthcareNeeded || false
        },
        education: {
          required: educationNeeded || false
        },
        nutrition: {
          required: nutritionNeeded || false
        },
        housing: {
          required: housingNeeded || false
        }
      }
    });

    await child.save();

    res.status(201).json({
      success: true,
      message: 'Child added successfully',
      data: child
    });

  } catch (error) {
    console.error('Add child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Assign child to a caregiver
// @route   PUT /api/social-worker/children/:childId/assign
// @access  Private (Social Worker only)
exports.assignChildToCaregiver = async (req, res) => {
  try {
    const { childId } = req.params;
    const { caregiverId } = req.body;

    // Find child and verify it belongs to this social worker
    const child = await Child.findOne({ 
      childId,
      assignedSocialWorker: req.user.id 
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or not assigned to you'
      });
    }

    // Verify caregiver exists and is active
    const caregiver = await User.findOne({
      _id: caregiverId,
      role: 'caregiver',
      isActive: true
    });

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: 'Caregiver not found or inactive'
      });
    }

    // Assign caregiver
    child.assignedCaregiver = caregiverId;
    await child.save();

    res.json({
      success: true,
      message: 'Child assigned to caregiver successfully',
      data: child
    });

  } catch (error) {
    console.error('Assign child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create a new case for a child
// @route   POST /api/social-worker/cases
// @access  Private (Social Worker only)
exports.createCase = async (req, res) => {
  try {
    const {
      childId,
      category,
      priority,
      description,
      goals
    } = req.body;

    // Find child and verify it belongs to this social worker
    const child = await Child.findOne({ 
      childId,
      assignedSocialWorker: req.user.id 
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or not assigned to you'
      });
    }

    // Generate unique case ID
    const caseId = generateCaseId();

    // Create case
    const caseRecord = new Case({
      caseId,
      child: child._id,
      assignedSocialWorker: req.user.id,
      category,
      priority: priority || 'medium',
      description,
      status: 'active',
      goals: goals || []
    });

    await caseRecord.save();

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: caseRecord
    });

  } catch (error) {
    console.error('Create case error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all children assigned to this social worker
// @route   GET /api/social-worker/children
// @access  Private (Social Worker only)
exports.getMyChildren = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { assignedSocialWorker: req.user.id };

    // Add status filter if provided
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const children = await Child.find(filter)
      .populate('assignedCaregiver', 'name email phone district')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Child.countDocuments(filter);

    // Get statistics
    const stats = await Child.aggregate([
      { $match: { assignedSocialWorker: req.user.id } },
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

// @desc    Get all cases assigned to this social worker
// @route   GET /api/social-worker/cases
// @access  Private (Social Worker only)
exports.getMyCases = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { assignedSocialWorker: req.user.id };

    // Add filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const cases = await Case.find(filter)
      .populate('child', 'childId personalInfo location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Case.countDocuments(filter);

    // Get statistics
    const stats = await Case.aggregate([
      { $match: { assignedSocialWorker: req.user.id } },
      {
        $group: {
          _id: {
            status: '$status',
            priority: '$priority',
            category: '$category'
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: cases,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      },
      statistics: {
        total,
        byStatus: {},
        byPriority: {},
        byCategory: {}
      }
    });

  } catch (error) {
    console.error('Get cases error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get available caregivers in social worker's district
// @route   GET /api/social-worker/caregivers
// @access  Private (Social Worker only)
exports.getAvailableCaregivers = async (req, res) => {
  try {
    // Get caregivers - prioritize same district if social worker has one
    const filter = {
      role: 'caregiver',
      isActive: true
    };
    
    // If social worker has a district, prioritize caregivers from same district
    // but don't exclude others
    const caregivers = await User.find(filter)
      .select('name email phone district')
      .sort({ district: req.user.district ? -1 : 1 });

    res.json({
      success: true,
      data: caregivers
    });

  } catch (error) {
    console.error('Get caregivers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get dashboard statistics and reports
// @route   GET /api/social-worker/reports
// @access  Private (Social Worker only)
exports.getMyReports = async (req, res) => {
  try {
    // Total children
    const totalChildren = await Child.countDocuments({
      assignedSocialWorker: req.user.id
    });

    // Active cases
    const activeCases = await Case.countDocuments({
      assignedSocialWorker: req.user.id,
      status: 'active'
    });

    // Children by status
    const childrenByStatus = await Child.aggregate([
      { $match: { assignedSocialWorker: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Cases by priority
    const casesByPriority = await Case.aggregate([
      { $match: { assignedSocialWorker: req.user.id } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Cases by category
    const casesByCategory = await Case.aggregate([
      { $match: { assignedSocialWorker: req.user.id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Children with caregivers assigned
    const childrenWithCaregivers = await Child.countDocuments({
      assignedSocialWorker: req.user.id,
      assignedCaregiver: { $exists: true, $ne: null }
    });

    // Recent activities (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentChildren = await Child.countDocuments({
      assignedSocialWorker: req.user.id,
      createdAt: { $gte: thirtyDaysAgo }
    });

    const recentCases = await Case.countDocuments({
      assignedSocialWorker: req.user.id,
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalChildren,
          activeCases,
          childrenWithCaregivers,
          childrenWithoutCaregivers: totalChildren - childrenWithCaregivers
        },
        childrenByStatus: childrenByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        casesByPriority: casesByPriority.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        casesByCategory: casesByCategory.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        recentActivity: {
          last30Days: {
            newChildren: recentChildren,
            newCases: recentCases
          }
        }
      }
    });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update child information
// @route   PUT /api/social-worker/children/:childId
// @access  Private (Social Worker only)
exports.updateChild = async (req, res) => {
  try {
    const { childId } = req.params;

    // Find child and verify it belongs to this social worker
    const child = await Child.findOne({ 
      childId,
      assignedSocialWorker: req.user.id 
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or not assigned to you'
      });
    }

    // Update allowed fields
    const allowedUpdates = [
      'personalInfo',
      'guardian',
      'location',
      'needs',
      'status'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field]) {
        child[field] = { ...child[field].toObject(), ...req.body[field] };
      }
    });

    await child.save();

    res.json({
      success: true,
      message: 'Child information updated successfully',
      data: child
    });

  } catch (error) {
    console.error('Update child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update case information
// @route   PUT /api/social-worker/cases/:caseId
// @access  Private (Social Worker only)
exports.updateCase = async (req, res) => {
  try {
    const { caseId } = req.params;

    // Find case and verify it belongs to this social worker
    const caseRecord = await Case.findOne({ 
      caseId,
      assignedSocialWorker: req.user.id 
    });

    if (!caseRecord) {
      return res.status(404).json({
        success: false,
        message: 'Case not found or not assigned to you'
      });
    }

    // Update allowed fields
    const allowedUpdates = [
      'status',
      'priority',
      'description',
      'goals'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        caseRecord[field] = req.body[field];
      }
    });

    await caseRecord.save();

    res.json({
      success: true,
      message: 'Case updated successfully',
      data: caseRecord
    });

  } catch (error) {
    console.error('Update case error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = exports;


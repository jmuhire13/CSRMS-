const User = require('../models/User');
const ResourceRequest = require('../models/ResourceRequest');
const crypto = require('crypto');

// Generate temporary password
const generateTempPassword = () => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

// @desc    Create social worker account (Admin only)
exports.createSocialWorker = async (req, res) => {
  try {
    const { name, email, phone, district, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Use provided password or generate temporary password
    const tempPassword = password || generateTempPassword();

    console.log('Creating social worker with password:', tempPassword);

    // Create user
    const user = new User({
      name,
      email,
      password: tempPassword,
      role: 'social-worker',
      phone,
      district,
      isActive: true,
      requirePasswordChange: true
    });

    await user.save();

    console.log('Social worker created successfully. Temp password:', tempPassword);

    res.status(201).json({
      success: true,
      message: 'Social worker account created successfully',
      data: {
        user: user.getPublicProfile(),
        temporaryPassword: tempPassword
      }
    });

  } catch (error) {
    console.error('Create social worker error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create caregiver account (Admin only)
exports.createCaregiver = async (req, res) => {
  try {
    const { name, email, phone, district, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Use provided password or generate temporary password
    const tempPassword = password || generateTempPassword();

    console.log('Creating caregiver with password:', tempPassword);

    // Create user
    const user = new User({
      name,
      email,
      password: tempPassword,
      role: 'caregiver',
      phone,
      district,
      isActive: true,
      requirePasswordChange: true
    });

    await user.save();

    console.log('Caregiver created successfully. Temp password:', tempPassword);

    res.status(201).json({
      success: true,
      message: 'Caregiver account created successfully',
      data: {
        user: user.getPublicProfile(),
        temporaryPassword: tempPassword
      }
    });

  } catch (error) {
    console.error('Create caregiver error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all social workers
exports.getAllSocialWorkers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = { role: 'social-worker' };
    
    if (req.query.district) filter.district = req.query.district;
    if (req.query.status) filter.isActive = req.query.status === 'active';
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const socialWorkers = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: socialWorkers.map(user => user.getPublicProfile()),
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get social workers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all caregivers
exports.getAllCaregivers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = { role: 'caregiver' };
    
    if (req.query.district) filter.district = req.query.district;
    if (req.query.status) filter.isActive = req.query.status === 'active';
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const caregivers = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: caregivers.map(user => user.getPublicProfile()),
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get caregivers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user (Admin only)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, district, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (district) user.district = district;
    if (typeof isActive !== 'undefined') user.isActive = isActive;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Reset user password (Admin only)
exports.resetUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new temporary password
    const tempPassword = generateTempPassword();
    user.password = tempPassword;
    user.requirePasswordChange = true;
    
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully',
      data: {
        temporaryPassword: tempPassword
      }
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all resource requests (Admin only)
exports.getAllResourceRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Add filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.urgency) filter.urgency = req.query.urgency;

    const requests = await ResourceRequest.find(filter)
      .populate('child', 'childId personalInfo')
      .populate('caregiver', 'name email phone')
      .populate('socialWorker', 'name email')
      .populate('respondedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ResourceRequest.countDocuments(filter);

    // Get statistics
    const stats = await ResourceRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalCost: { $sum: '$estimatedCost' }
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
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = { count: stat.count, totalCost: stat.totalCost };
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Get resource requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Approve or reject resource request (Admin only)
exports.updateResourceRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, responseNote } = req.body;

    if (!['approved', 'rejected', 'fulfilled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be approved, rejected, or fulfilled'
      });
    }

    const request = await ResourceRequest.findById(requestId);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Resource request not found'
      });
    }

    request.status = status;
    request.responseNote = responseNote || '';
    request.respondedBy = req.user.id;
    request.respondedAt = new Date();
    
    if (status === 'fulfilled') {
      request.fulfilledAt = new Date();
    }

    await request.save();

    await request.populate([
      { path: 'child', select: 'childId personalInfo' },
      { path: 'caregiver', select: 'name email' },
      { path: 'respondedBy', select: 'name' }
    ]);

    res.json({
      success: true,
      message: `Resource request ${status} successfully`,
      data: request
    });

  } catch (error) {
    console.error('Update resource request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

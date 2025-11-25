const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Child = require('../models/Child');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/children
// @desc    Get all children (with filters)
// @access  Private
router.get('/', auth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('district').optional().isString().withMessage('District must be a string'),
  query('status').optional().isIn(['active', 'inactive', 'graduated', 'transferred']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};
    
    // Role-based filtering
    if (req.user.role === 'social-worker') {
      filter.assignedSocialWorker = req.user.id;
    }
    
    if (req.query.district) filter['location.district'] = req.query.district;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { 'personalInfo.firstName': { $regex: req.query.search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: req.query.search, $options: 'i' } },
        { childId: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const children = await Child.find(filter)
      .populate('assignedSocialWorker', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Child.countDocuments(filter);

    res.json({
      success: true,
      data: children,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get children error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/children/:id
// @desc    Get single child
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id)
      .populate('assignedSocialWorker', 'name email phone')
      .populate('notes.author', 'name');

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Check permissions
    if (req.user.role === 'social-worker' && child.assignedSocialWorker._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: child
    });

  } catch (error) {
    console.error('Get child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/children
// @desc    Create new child record
// @access  Private (Admin, Social Worker)
router.post('/', [auth, authorize('admin', 'social-worker')], [
  body('personalInfo.firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('personalInfo.lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('personalInfo.dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('personalInfo.gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('guardian.name').trim().isLength({ min: 1 }).withMessage('Guardian name is required'),
  body('guardian.relationship').trim().isLength({ min: 1 }).withMessage('Guardian relationship is required'),
  body('location.district').trim().isLength({ min: 1 }).withMessage('District is required'),
  body('location.sector').trim().isLength({ min: 1 }).withMessage('Sector is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const childData = {
      ...req.body,
      assignedSocialWorker: req.user.role === 'social-worker' ? req.user.id : req.body.assignedSocialWorker
    };

    const child = new Child(childData);
    await child.save();

    await child.populate('assignedSocialWorker', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Child record created successfully',
      data: child
    });

  } catch (error) {
    console.error('Create child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/children/:id
// @desc    Update child record
// @access  Private (Admin, Assigned Social Worker)
router.put('/:id', auth, async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Check permissions
    if (req.user.role === 'social-worker' && child.assignedSocialWorker.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== 'childId') {
        child[key] = req.body[key];
      }
    });

    await child.save();
    await child.populate('assignedSocialWorker', 'name email phone');

    res.json({
      success: true,
      message: 'Child record updated successfully',
      data: child
    });

  } catch (error) {
    console.error('Update child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/children/:id/notes
// @desc    Add note to child record
// @access  Private
router.post('/:id/notes', auth, [
  body('content').trim().isLength({ min: 1 }).withMessage('Note content is required'),
  body('isPrivate').optional().isBoolean().withMessage('isPrivate must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const child = await Child.findById(req.params.id);
    
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    const note = {
      content: req.body.content,
      author: req.user.id,
      isPrivate: req.body.isPrivate || false
    };

    child.notes.push(note);
    await child.save();

    await child.populate('notes.author', 'name');

    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: child.notes[child.notes.length - 1]
    });

  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
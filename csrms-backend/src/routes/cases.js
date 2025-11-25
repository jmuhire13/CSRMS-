const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Case model (create if doesn't exist)
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    unique: true,
    required: true
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true
  },
  assignedSocialWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'completed', 'closed', 'transferred'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['healthcare', 'education', 'nutrition', 'housing', 'emergency', 'general'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  goals: [{
    description: String,
    targetDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    completedDate: Date
  }],
  activities: [{
    type: {
      type: String,
      enum: ['visit', 'call', 'meeting', 'assessment', 'resource-delivery', 'other'],
      required: true
    },
    description: String,
    date: { type: Date, required: true },
    duration: Number, // in minutes
    outcome: String,
    nextSteps: String,
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recordedAt: { type: Date, default: Date.now }
  }],
  resources: [{
    type: String,
    description: String,
    amount: Number,
    provider: String,
    dateProvided: Date,
    status: {
      type: String,
      enum: ['requested', 'approved', 'delivered', 'completed'],
      default: 'requested'
    }
  }],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  nextVisitDate: Date,
  closureReason: String,
  closureDate: Date
}, {
  timestamps: true
});

// Generate case ID before saving
caseSchema.pre('save', async function(next) {
  if (!this.caseId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.caseId = `CSE-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

const Case = require('../models/Case');

// @route   GET /api/cases
// @desc    Get all cases
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let filter = {};
    
    // Role-based filtering
    if (req.user.role === 'social-worker') {
      filter.assignedSocialWorker = req.user.id;
    }
    
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.category) filter.category = req.query.category;

    const cases = await Case.find(filter)
      .populate('child', 'personalInfo childId')
      .populate('assignedSocialWorker', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: cases
    });

  } catch (error) {
    console.error('Get cases error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/cases
// @desc    Create new case
// @access  Private (Admin, Social Worker)
router.post('/', [auth, authorize('admin', 'social-worker')], [
  body('child').isMongoId().withMessage('Valid child ID is required'),
  body('category').isIn(['healthcare', 'education', 'nutrition', 'housing', 'emergency', 'general']).withMessage('Invalid category'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority')
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

    const caseData = {
      ...req.body,
      assignedSocialWorker: req.user.role === 'social-worker' ? req.user.id : req.body.assignedSocialWorker
    };

    const newCase = new Case(caseData);
    await newCase.save();

    await newCase.populate([
      { path: 'child', select: 'personalInfo childId' },
      { path: 'assignedSocialWorker', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: newCase
    });

  } catch (error) {
    console.error('Create case error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/cases/:id/activities
// @desc    Add activity to case
// @access  Private
router.post('/:id/activities', auth, [
  body('type').isIn(['visit', 'call', 'meeting', 'assessment', 'resource-delivery', 'other']).withMessage('Invalid activity type'),
  body('description').trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
  body('date').isISO8601().withMessage('Valid date is required')
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

    const caseRecord = await Case.findById(req.params.id);
    
    if (!caseRecord) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    const activity = {
      ...req.body,
      recordedBy: req.user.id
    };

    caseRecord.activities.push(activity);
    await caseRecord.save();

    res.status(201).json({
      success: true,
      message: 'Activity added successfully',
      data: caseRecord.activities[caseRecord.activities.length - 1]
    });

  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Donation model
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donationId: {
    type: String,
    unique: true,
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [1, 'Amount must be at least $1']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'RWF']
  },
  type: {
    type: String,
    enum: ['one-time', 'monthly', 'quarterly', 'yearly'],
    default: 'one-time'
  },
  category: {
    type: String,
    enum: ['general', 'healthcare', 'education', 'nutrition', 'housing', 'emergency'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'debit-card', 'paypal', 'bank-transfer', 'mobile-money'],
    required: true
  },
  transactionId: String,
  dedicatedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  }],
  message: String,
  isAnonymous: {
    type: Boolean,
    default: false
  },
  recurringDetails: {
    isRecurring: { type: Boolean, default: false },
    frequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly']
    },
    nextPaymentDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true }
  },
  receipt: {
    receiptNumber: String,
    issued: { type: Boolean, default: false },
    issuedDate: Date,
    downloadUrl: String
  },
  impact: {
    childrenHelped: { type: Number, default: 0 },
    mealsProvided: { type: Number, default: 0 },
    medicalCheckups: { type: Number, default: 0 },
    schoolDays: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Generate donation ID before saving
donationSchema.pre('save', async function(next) {
  if (!this.donationId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.donationId = `DON-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  
  // Generate receipt number if completed
  if (this.status === 'completed' && !this.receipt.receiptNumber) {
    this.receipt.receiptNumber = `RCP-${this.donationId}`;
    this.receipt.issued = true;
    this.receipt.issuedDate = new Date();
  }
  
  next();
});

// Create Donation model
const Donation = mongoose.model('Donation', donationSchema);

// @route   GET /api/donations
// @desc    Get donations (filtered by role)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let filter = {};
    
    // Role-based filtering
    if (req.user.role === 'donor') {
      filter.donor = req.user.id;
    }
    
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;

    const donations = await Donation.find(filter)
      .populate('donor', 'name email')
      .populate('dedicatedTo', 'personalInfo childId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: donations
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/donations
// @desc    Create new donation
// @access  Private (Donor)
router.post('/', [auth, authorize('donor')], [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least $1'),
  body('paymentMethod').isIn(['credit-card', 'debit-card', 'paypal', 'bank-transfer', 'mobile-money']).withMessage('Invalid payment method'),
  body('category').optional().isIn(['general', 'healthcare', 'education', 'nutrition', 'housing', 'emergency']).withMessage('Invalid category')
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

    const donationData = {
      ...req.body,
      donor: req.user.id,
      status: 'completed', // Simulate successful payment
      transactionId: `TXN-${Date.now()}`
    };

    // Calculate impact based on amount
    const amount = donationData.amount;
    donationData.impact = {
      childrenHelped: Math.floor(amount / 50),
      mealsProvided: Math.floor(amount / 5),
      medicalCheckups: Math.floor(amount / 25),
      schoolDays: Math.floor(amount / 10)
    };

    const donation = new Donation(donationData);
    await donation.save();

    await donation.populate([
      { path: 'donor', select: 'name email' },
      { path: 'dedicatedTo', select: 'personalInfo childId' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Donation processed successfully',
      data: donation
    });

  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/donations/stats
// @desc    Get donation statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    let filter = {};
    
    if (req.user.role === 'donor') {
      filter.donor = req.user.id;
    }

    const stats = await Donation.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalDonations: { $sum: 1 },
          avgDonation: { $avg: '$amount' },
          totalChildrenHelped: { $sum: '$impact.childrenHelped' },
          totalMealsProvided: { $sum: '$impact.mealsProvided' },
          totalMedicalCheckups: { $sum: '$impact.medicalCheckups' },
          totalSchoolDays: { $sum: '$impact.schoolDays' }
        }
      }
    ]);

    const monthlyStats = await Donation.aggregate([
      { $match: { ...filter, createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          amount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        overall: stats[0] || {
          totalAmount: 0,
          totalDonations: 0,
          avgDonation: 0,
          totalChildrenHelped: 0,
          totalMealsProvided: 0,
          totalMedicalCheckups: 0,
          totalSchoolDays: 0
        },
        monthly: monthlyStats
      }
    });

  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donationId: {
    type: String,
    unique: true,
    sparse: true // Allow null values temporarily until pre-save hook generates it
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
  try {
    if (!this.donationId) {
      const year = new Date().getFullYear();
      const count = await this.constructor.countDocuments();
      // Use timestamp for better uniqueness
      this.donationId = `DON-${year}-${String(count + 1).padStart(4, '0')}-${Date.now().toString().slice(-4)}`;
    }
    
    // Generate receipt number if completed
    if (this.status === 'completed' && !this.receipt.receiptNumber) {
      this.receipt.receiptNumber = `RCP-${this.donationId}`;
      this.receipt.issued = true;
      this.receipt.issuedDate = new Date();
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Donation', donationSchema);

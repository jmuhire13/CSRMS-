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

// Indexes for better performance
caseSchema.index({ assignedSocialWorker: 1 });
caseSchema.index({ child: 1 });
caseSchema.index({ status: 1 });
caseSchema.index({ priority: 1 });

module.exports = mongoose.model('Case', caseSchema);
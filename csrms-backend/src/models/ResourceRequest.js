const mongoose = require('mongoose');

const resourceRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    unique: true,
    required: true
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true
  },
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  socialWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['healthcare', 'education', 'nutrition', 'housing', 'clothing', 'emergency', 'other'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'approved', 'rejected', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  estimatedCost: {
    type: Number,
    min: 0
  },
  quantity: {
    type: String,
    default: '1'
  },
  justification: String,
  responseNote: String,
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: Date,
  fulfilledAt: Date
}, {
  timestamps: true
});

resourceRequestSchema.index({ child: 1 });
resourceRequestSchema.index({ caregiver: 1, status: 1 });
resourceRequestSchema.index({ socialWorker: 1, status: 1 });
resourceRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ResourceRequest', resourceRequestSchema);

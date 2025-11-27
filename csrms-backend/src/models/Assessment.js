const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
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
  assessmentType: {
    type: String,
    enum: ['health', 'education', 'nutrition', 'housing', 'wellbeing', 'general'],
    required: true
  },
  status: {
    type: String,
    enum: ['needs-attention', 'improving', 'stable', 'excellent'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  observations: [{
    category: String,
    note: String,
    timestamp: { type: Date, default: Date.now }
  }],
  recommendations: [String],
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  followUpDate: Date,
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

assessmentSchema.index({ child: 1, createdAt: -1 });
assessmentSchema.index({ caregiver: 1 });
assessmentSchema.index({ socialWorker: 1 });

module.exports = mongoose.model('Assessment', assessmentSchema);

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread'
  },
  readAt: Date,
  attachments: [{
    filename: String,
    url: String
  }],
  relatedTo: {
    type: String,
    enum: ['assessment', 'resource-request', 'case', 'general']
  },
  relatedId: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
});

messageSchema.index({ sender: 1, createdAt: -1 });
messageSchema.index({ recipient: 1, status: 1, createdAt: -1 });
messageSchema.index({ child: 1 });

module.exports = mongoose.model('Message', messageSchema);

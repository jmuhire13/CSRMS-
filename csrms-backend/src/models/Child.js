const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  childId: {
    type: String,
    unique: true,
    required: true
  },
  personalInfo: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    photo: String,
    nationalId: String
  },
  guardian: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: String,
    email: String,
    address: {
      district: String,
      sector: String,
      cell: String,
      village: String,
      street: String
    }
  },
  location: {
    district: { type: String, required: true },
    sector: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  assignedSocialWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedCaregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred'],
    default: 'active'
  },
  needs: {
    healthcare: {
      required: { type: Boolean, default: false },
      description: String,
      priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' }
    },
    education: {
      required: { type: Boolean, default: false },
      description: String,
      priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
      schoolName: String,
      grade: String
    },
    nutrition: {
      required: { type: Boolean, default: false },
      description: String,
      priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' }
    },
    housing: {
      required: { type: Boolean, default: false },
      description: String,
      priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' }
    },
    other: [{
      type: String,
      description: String,
      priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' }
    }]
  },
  progress: {
    health: { type: Number, min: 0, max: 100, default: 0 },
    education: { type: Number, min: 0, max: 100, default: 0 },
    nutrition: { type: Number, min: 0, max: 100, default: 0 },
    housing: { type: Number, min: 0, max: 100, default: 0 },
    overall: { type: Number, min: 0, max: 100, default: 0 }
  },
  documents: [{
    type: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  notes: [{
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

// Generate child ID before saving
childSchema.pre('save', async function(next) {
  if (!this.childId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.childId = `CHD-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  
  // Calculate overall progress
  const { health, education, nutrition, housing } = this.progress;
  this.progress.overall = Math.round((health + education + nutrition + housing) / 4);
  
  next();
});

// Indexes for better performance
childSchema.index({ assignedSocialWorker: 1 });
childSchema.index({ 'location.district': 1 });
childSchema.index({ status: 1 });

// Virtual for age
childSchema.virtual('age').get(function() {
  if (!this.personalInfo.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.personalInfo.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for full name
childSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Virtual for firstName (flat access)
childSchema.virtual('firstName').get(function() {
  return this.personalInfo?.firstName;
});

// Virtual for lastName (flat access)
childSchema.virtual('lastName').get(function() {
  return this.personalInfo?.lastName;
});

// Virtual for dateOfBirth (flat access)
childSchema.virtual('dateOfBirth').get(function() {
  return this.personalInfo?.dateOfBirth;
});

// Virtual for gender (flat access)
childSchema.virtual('gender').get(function() {
  return this.personalInfo?.gender;
});

// Virtual for district (flat access)
childSchema.virtual('district').get(function() {
  return this.location?.district;
});

// Virtual for sector (flat access)
childSchema.virtual('sector').get(function() {
  return this.location?.sector;
});

// Virtual for cell (flat access)
childSchema.virtual('cell').get(function() {
  return this.guardian?.address?.cell;
});

// Virtual for village (flat access)
childSchema.virtual('village').get(function() {
  return this.guardian?.address?.village;
});

// Virtual for guardianName (flat access)
childSchema.virtual('guardianName').get(function() {
  return this.guardian?.name;
});

// Virtual for guardianContact (flat access)
childSchema.virtual('guardianContact').get(function() {
  return this.guardian?.phone;
});

childSchema.set('toJSON', { virtuals: true });
childSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Child', childSchema);
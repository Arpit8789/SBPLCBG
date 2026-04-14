const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  budget: {
    type: String,
    required: [true, 'Budget range is required'],
    enum: ['50L - 1Cr', '1Cr - 1.5Cr', '1.5Cr - 2Cr', '2Cr - 5Cr', '5Cr+']
  },
  landAvailability: {
    type: String,
    required: [true, 'Land availability is required'],
    enum: ['Yes - Own Land', 'Yes - Leased', 'No - Need Assistance', 'Under Negotiation']
  },
  message: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'negotiation', 'approved', 'rejected'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    default: 'website'
  }
}, {
  timestamps: true
});

// Index for search and filtering
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ location: 1 });
leadSchema.index({ budget: 1 });

module.exports = mongoose.model('Lead', leadSchema);

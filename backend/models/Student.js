const mongoose = require('mongoose');

/**
 * Student Schema Definition
 * Defines the structure and validation rules for student documents in MongoDB
 */
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
    max: [100, 'Age cannot exceed 100']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    minlength: [2, 'Course must be at least 2 characters long'],
    maxlength: [100, 'Course cannot exceed 100 characters']
  }
}, {
  // Automatically add createdAt and updatedAt fields
  timestamps: true
});

// Create indexes for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ name: 1 });

// Export the model
module.exports = mongoose.model('Student', studentSchema);
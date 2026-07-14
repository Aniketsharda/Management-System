const mongoose = require('mongoose');
const { MemoryDB } = require('../config/memoryDB');

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

// Create the Mongoose model
const MongooseStudent = mongoose.model('Student', studentSchema);

/**
 * Student Model Wrapper
 * Provides a unified interface for both MongoDB and in-memory database
 */
class StudentModel {
  static async find(query = {}) {
    if (global.useMemoryDB) {
      return MemoryDB.find(query);
    }
    return MongooseStudent.find(query);
  }

  static async findById(id) {
    if (global.useMemoryDB) {
      return MemoryDB.findById(id);
    }
    return MongooseStudent.findById(id);
  }

  static async findOne(query) {
    if (global.useMemoryDB) {
      return MemoryDB.findOne(query);
    }
    return MongooseStudent.findOne(query);
  }

  static async create(data) {
    if (global.useMemoryDB) {
      // Validate data before creation
      this.validateStudentData(data);
      return MemoryDB.create(data);
    }
    return MongooseStudent.create(data);
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    if (global.useMemoryDB) {
      // Validate data before update
      this.validateStudentData(data, true);
      return MemoryDB.findByIdAndUpdate(id, data, options);
    }
    return MongooseStudent.findByIdAndUpdate(id, data, { new: true, runValidators: true, ...options });
  }

  static async findByIdAndDelete(id) {
    if (global.useMemoryDB) {
      return MemoryDB.findByIdAndDelete(id);
    }
    return MongooseStudent.findByIdAndDelete(id);
  }

  /**
   * Validate student data (for in-memory database)
   */
  static validateStudentData(data, isUpdate = false) {
    const errors = [];

    // Name validation
    if (data.name !== undefined) {
      if (!data.name || typeof data.name !== 'string') {
        errors.push('Name is required');
      } else if (data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
      } else if (data.name.trim().length > 50) {
        errors.push('Name cannot exceed 50 characters');
      }
    }

    // Email validation
    if (data.email !== undefined) {
      if (!data.email || typeof data.email !== 'string') {
        errors.push('Email is required');
      } else {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(data.email)) {
          errors.push('Please enter a valid email address');
        }
      }
    }

    // Age validation
    if (data.age !== undefined) {
      if (typeof data.age !== 'number' || data.age < 16 || data.age > 100) {
        errors.push('Age must be between 16 and 100');
      }
    }

    // Course validation
    if (data.course !== undefined) {
      if (!data.course || typeof data.course !== 'string') {
        errors.push('Course is required');
      } else if (data.course.trim().length < 2) {
        errors.push('Course must be at least 2 characters long');
      } else if (data.course.trim().length > 100) {
        errors.push('Course cannot exceed 100 characters');
      }
    }

    if (errors.length > 0) {
      const error = new Error(errors.join(', '));
      error.name = 'ValidationError';
      throw error;
    }
  }
}

// Export the wrapper model
module.exports = StudentModel;
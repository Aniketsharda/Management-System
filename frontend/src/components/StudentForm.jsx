import React, { useState } from 'react';

/**
 * Student Form Component
 * Reusable form for creating and editing students
 * @param {Object} initialData - Initial form data (for editing)
 * @param {Function} onSubmit - Function to handle form submission
 * @param {boolean} isLoading - Loading state
 * @param {string} submitButtonText - Text for submit button
 */
const StudentForm = ({ 
  initialData = { name: '', email: '', age: '', course: '' }, 
  onSubmit, 
  isLoading = false,
  submitButtonText = 'Submit'
}) => {
  // Form state management
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Age validation
    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 16 || age > 100) {
      newErrors.age = 'Age must be between 16 and 100';
    }

    // Course validation
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    } else if (formData.course.trim().length < 2) {
      newErrors.course = 'Course must be at least 2 characters';
    } else if (formData.course.trim().length > 100) {
      newErrors.course = 'Course cannot exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Clean up data before submission
      const cleanedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        age: parseInt(formData.age),
        course: formData.course.trim()
      };
      
      onSubmit(cleanedData);
    }
  };

  return (
    <div className="student-form-container">
      <form onSubmit={handleSubmit} className="student-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter student name"
            disabled={isLoading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter email address"
            disabled={isLoading}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Age Field */}
        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Age <span className="required">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`form-input ${errors.age ? 'error' : ''}`}
            placeholder="Enter age"
            min="16"
            max="100"
            disabled={isLoading}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        {/* Course Field */}
        <div className="form-group">
          <label htmlFor="course" className="form-label">
            Course <span className="required">*</span>
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`form-input ${errors.course ? 'error' : ''}`}
            placeholder="Enter course name"
            disabled={isLoading}
          />
          {errors.course && <span className="error-message">{errors.course}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
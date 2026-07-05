import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../services/studentService';

/**
 * Add Student Page Component
 * Allows users to create new students
 */
const AddStudent = () => {
  const navigate = useNavigate();
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError('');

      // Create new student
      const response = await createStudent(formData);
      
      // Show success message and redirect
      alert(`Student "${response.data.name}" has been created successfully!`);
      navigate('/');
      
    } catch (err) {
      console.error('Error creating student:', err);
      setError(err.error || 'Failed to create student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (window.confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
      navigate('/');
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <button onClick={handleBack} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1 className="page-title">Add New Student</h1>
          <p className="page-subtitle">
            Fill in the information below to add a new student to the system
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">❌</span>
          {error}
        </div>
      )}

      {/* Form Section */}
      <div className="content-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Student Information</h2>
            <p>Please provide accurate information for the new student</p>
          </div>

          <StudentForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Create Student"
          />

          {/* Form Guidelines */}
          <div className="form-guidelines">
            <h3>Guidelines:</h3>
            <ul>
              <li>All fields marked with <span className="required">*</span> are required</li>
              <li>Email address must be unique and valid</li>
              <li>Age must be between 16 and 100 years</li>
              <li>Name and course should be descriptive and appropriate</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <div className="help-card">
          <h3>📋 Need Help?</h3>
          <p>
            If you're having trouble adding a student, make sure all required fields 
            are filled correctly and the email address is unique in the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
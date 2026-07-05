import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { getStudentById, updateStudent } from '../services/studentService';

/**
 * Edit Student Page Component
 * Allows users to edit existing student information
 */
const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await getStudentById(id);
        setStudent(response.data);
        
      } catch (err) {
        console.error('Error fetching student:', err);
        setError(err.error || 'Failed to load student data.');
        
        // Redirect to home if student not found
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError('');

      // Update student
      const response = await updateStudent(id, formData);
      
      // Show success message and redirect
      alert(`Student "${response.data.name}" has been updated successfully!`);
      navigate('/');
      
    } catch (err) {
      console.error('Error updating student:', err);
      setError(err.error || 'Failed to update student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (window.confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
      navigate('/');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner large"></div>
          <p>Loading student information...</p>
        </div>
      </div>
    );
  }

  // Error state (student not found)
  if (error && !student) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Student Not Found</h2>
          <p>{error}</p>
          <p>Redirecting to dashboard...</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <button onClick={handleBack} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1 className="page-title">Edit Student</h1>
          <p className="page-subtitle">
            Update the information for {student?.name}
          </p>
        </div>
      </div>

      {/* Student Info Summary */}
      {student && (
        <div className="student-summary">
          <div className="summary-card">
            <div className="student-avatar large">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div className="summary-info">
              <h3>{student.name}</h3>
              <p>📧 {student.email}</p>
              <p>📖 {student.course}</p>
              <p className="text-muted">
                Student ID: {student._id}
              </p>
            </div>
          </div>
        </div>
      )}

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
            <h2>Update Student Information</h2>
            <p>Modify the fields below to update the student's information</p>
          </div>

          {student && (
            <StudentForm
              initialData={{
                name: student.name,
                email: student.email,
                age: student.age.toString(),
                course: student.course
              }}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              submitButtonText="Update Student"
            />
          )}

          {/* Form Guidelines */}
          <div className="form-guidelines">
            <h3>Guidelines:</h3>
            <ul>
              <li>All fields marked with <span className="required">*</span> are required</li>
              <li>Email address must be unique (you can keep the current email)</li>
              <li>Age must be between 16 and 100 years</li>
              <li>Changes will be saved immediately upon submission</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Student History */}
      {student && (
        <div className="history-section">
          <div className="history-card">
            <h3>📅 Student Timeline</h3>
            <div className="timeline-item">
              <strong>Created:</strong> {new Date(student.createdAt).toLocaleString()}
            </div>
            <div className="timeline-item">
              <strong>Last Updated:</strong> {new Date(student.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
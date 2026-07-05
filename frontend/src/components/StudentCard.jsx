import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Student Card Component
 * Displays individual student information in a card format
 * @param {Object} student - Student data object
 * @param {Function} onDelete - Function to handle student deletion
 */
const StudentCard = ({ student, onDelete }) => {
  
  const handleDelete = () => {
    // Show confirmation dialog before deleting
    if (window.confirm(`Are you sure you want to delete ${student.name}? This action cannot be undone.`)) {
      onDelete(student._id);
    }
  };

  return (
    <div className="student-card">
      {/* Student Avatar */}
      <div className="student-avatar">
        {student.name.charAt(0).toUpperCase()}
      </div>

      {/* Student Information */}
      <div className="student-info">
        <h3 className="student-name">{student.name}</h3>
        <div className="student-details">
          <p className="student-email">
            <span className="label">📧 Email:</span> {student.email}
          </p>
          <p className="student-age">
            <span className="label">🎂 Age:</span> {student.age} years
          </p>
          <p className="student-course">
            <span className="label">📖 Course:</span> {student.course}
          </p>
          <p className="student-date">
            <span className="label">📅 Joined:</span> {new Date(student.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="student-actions">
        <Link
          to={`/edit-student/${student._id}`}
          className="btn btn-edit"
          title="Edit Student"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="btn btn-delete"
          title="Delete Student"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
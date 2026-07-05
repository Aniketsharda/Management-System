import React from 'react';
import StudentCard from './StudentCard';

/**
 * Student List Component
 * Displays a list of students using StudentCard components
 * @param {Array} students - Array of student objects
 * @param {Function} onDeleteStudent - Function to handle student deletion
 * @param {boolean} isLoading - Loading state
 */
const StudentList = ({ students, onDeleteStudent, isLoading }) => {
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner large"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>No Students Found</h3>
        <p>There are no students to display. Add some students to get started!</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="students-grid">
        {students.map((student) => (
          <StudentCard
            key={student._id}
            student={student}
            onDelete={onDeleteStudent}
          />
        ))}
      </div>
      
      {/* Students count */}
      <div className="students-count">
        {students.length === 1 
          ? '1 student found' 
          : `${students.length} students found`
        }
      </div>
    </div>
  );
};

export default StudentList;
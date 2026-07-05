import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import StudentList from '../components/StudentList';
import { getAllStudents, deleteStudent } from '../services/studentService';

/**
 * Home Page Component
 * Main dashboard showing all students with search functionality
 */
const Home = () => {
  // State management
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch students from API
  const fetchStudents = useCallback(async (search = '') => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await getAllStudents(search);
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.error || 'Failed to load students. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load students on component mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle search functionality
  const handleSearch = useCallback((search) => {
    setSearchTerm(search);
    fetchStudents(search);
  }, [fetchStudents]);

  // Handle student deletion
  const handleDeleteStudent = async (studentId) => {
    try {
      setError('');
      
      // Find student name for success message
      const studentToDelete = students.find(s => s._id === studentId);
      const studentName = studentToDelete ? studentToDelete.name : 'Student';
      
      await deleteStudent(studentId);
      
      // Remove student from local state immediately for better UX
      setStudents(prev => prev.filter(student => student._id !== studentId));
      
      // Show success message
      setSuccessMessage(`${studentName} has been deleted successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (err) {
      console.error('Error deleting student:', err);
      setError(err.error || 'Failed to delete student. Please try again.');
    }
  };

  // Clear messages after some time
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Student Management Dashboard</h1>
          <p className="page-subtitle">
            Manage your students efficiently with our comprehensive system
          </p>
        </div>
        
        {/* Quick Action Button */}
        <div className="header-actions">
          <Link to="/add-student" className="btn btn-primary">
            ➕ Add New Student
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>{new Set(students.map(s => s.course)).size}</h3>
            <p>Courses Offered</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.age, 0) / students.length) : 0}</h3>
            <p>Average Age</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success">
          <span className="alert-icon">✅</span>
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">❌</span>
          {error}
        </div>
      )}

      {/* Search Section */}
      <div className="search-section">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search by name, email, or course..."
        />
        {searchTerm && (
          <p className="search-info">
            {isLoading 
              ? 'Searching...' 
              : `Showing results for "${searchTerm}"`
            }
          </p>
        )}
      </div>

      {/* Students List */}
      <div className="content-section">
        <StudentList
          students={students}
          onDeleteStudent={handleDeleteStudent}
          isLoading={isLoading}
        />
      </div>

      {/* Refresh Button */}
      {!isLoading && (
        <div className="refresh-section">
          <button
            onClick={() => fetchStudents(searchTerm)}
            className="btn btn-secondary"
          >
            🔄 Refresh Data
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
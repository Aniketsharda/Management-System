import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';

/**
 * Main App Component
 * Sets up routing and layout structure for the entire application
 */
function App() {
  return (
    <div className="App">
      {/* Navigation Bar - appears on all pages */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          {/* Home route - displays all students */}
          <Route path="/" element={<Home />} />
          
          {/* Add Student route */}
          <Route path="/add-student" element={<AddStudent />} />
          
          {/* Edit Student route - requires student ID parameter */}
          <Route path="/edit-student/:id" element={<EditStudent />} />
          
          {/* 404 Not Found route */}
          <Route 
            path="*" 
            element={
              <div className="page-container">
                <div className="error-container">
                  <div className="error-icon">🚫</div>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn btn-primary">
                    Go to Dashboard
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Student Management System. Built with React & Express.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
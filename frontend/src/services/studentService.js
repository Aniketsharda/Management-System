import axios from 'axios';

/**
 * Student Service
 * Contains all API calls related to student operations
 * Uses axios for HTTP requests to the backend API
 */

// Create axios instance with default configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed in future)
API.interceptors.request.use(
  (config) => {
    // Add any authentication tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Get all students with optional search functionality
 * @param {string} searchTerm - Optional search term to filter students
 * @returns {Promise} - Promise containing students data
 */
export const getAllStudents = async (searchTerm = '') => {
  try {
    const response = await API.get(`/students${searchTerm ? `?search=${searchTerm}` : ''}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch students' };
  }
};

/**
 * Get a single student by ID
 * @param {string} id - Student ID
 * @returns {Promise} - Promise containing student data
 */
export const getStudentById = async (id) => {
  try {
    const response = await API.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch student' };
  }
};

/**
 * Create a new student
 * @param {Object} studentData - Student information
 * @returns {Promise} - Promise containing created student data
 */
export const createStudent = async (studentData) => {
  try {
    const response = await API.post('/students', studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create student' };
  }
};

/**
 * Update an existing student
 * @param {string} id - Student ID
 * @param {Object} studentData - Updated student information
 * @returns {Promise} - Promise containing updated student data
 */
export const updateStudent = async (id, studentData) => {
  try {
    const response = await API.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update student' };
  }
};

/**
 * Delete a student
 * @param {string} id - Student ID
 * @returns {Promise} - Promise containing success message
 */
export const deleteStudent = async (id) => {
  try {
    const response = await API.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete student' };
  }
};
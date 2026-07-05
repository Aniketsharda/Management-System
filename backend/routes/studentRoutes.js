const express = require('express');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

/**
 * Student Routes
 * Defines all the routes for student operations
 */
const router = express.Router();

/**
 * @route   GET /api/students
 * @desc    Get all students with optional search
 * @access  Public
 */
router.get('/', getAllStudents);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Public
 */
router.post('/', createStudent);

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID
 * @access  Public
 */
router.get('/:id', getStudentById);

/**
 * @route   PUT /api/students/:id
 * @desc    Update student by ID
 * @access  Public
 */
router.put('/:id', updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student by ID
 * @access  Public
 */
router.delete('/:id', deleteStudent);

module.exports = router;
/**
 * Student Controller
 * Contains all the business logic for student operations
 * Works with both MongoDB and in-memory database
 */

// Simple in-memory storage when MongoDB is not available
let memoryStudents = [
  {
    _id: 'mem_1_1234567890',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 22,
    course: 'Computer Science',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: 'mem_2_1234567891',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 20,
    course: 'Data Science',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: 'mem_3_1234567892',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    age: 24,
    course: 'Software Engineering',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

let nextId = 4;

/**
 * @desc    Get all students
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res, next) => {
  try {
    // Get search query from request
    const { search } = req.query;
    let students = [...memoryStudents];

    // If search query exists, filter students
    if (search) {
      students = memoryStudents.filter(student => {
        return (
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()) ||
          student.course.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // Sort by creation date (newest first)
    students.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Get all students error:', error);
    next(error);
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res, next) => {
  try {
    const student = memoryStudents.find(s => s._id === req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student by ID error:', error);
    next(error);
  }
};

/**
 * @desc    Create new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res, next) => {
  try {
    const { name, email, age, course } = req.body;

    // Validate required fields
    if (!name || !email || !age || !course) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Age must be between 16 and 100'
      });
    }

    // Check if student with email already exists
    const existingStudent = memoryStudents.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        error: 'Student with this email already exists'
      });
    }

    // Create new student
    const newStudent = {
      _id: `mem_${nextId++}_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      age: ageNum,
      course: course.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    memoryStudents.push(newStudent);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (error) {
    console.error('Create student error:', error);
    next(error);
  }
};

/**
 * @desc    Update student
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res, next) => {
  try {
    const { name, email, age, course } = req.body;

    // Validate required fields
    if (!name || !email || !age || !course) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Find student
    const studentIndex = memoryStudents.findIndex(s => s._id === req.params.id);
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const student = memoryStudents[studentIndex];

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Age must be between 16 and 100'
      });
    }

    // Check if email is being changed and if it already exists
    if (email.toLowerCase() !== student.email.toLowerCase()) {
      const existingStudent = memoryStudents.find(s => 
        s.email.toLowerCase() === email.toLowerCase() && s._id !== req.params.id
      );
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          error: 'Student with this email already exists'
        });
      }
    }

    // Update student
    memoryStudents[studentIndex] = {
      ...student,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      age: ageNum,
      course: course.trim(),
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: memoryStudents[studentIndex]
    });
  } catch (error) {
    console.error('Update student error:', error);
    next(error);
  }
};

/**
 * @desc    Delete student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res, next) => {
  try {
    const studentIndex = memoryStudents.findIndex(s => s._id === req.params.id);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Remove student from memory
    memoryStudents.splice(studentIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
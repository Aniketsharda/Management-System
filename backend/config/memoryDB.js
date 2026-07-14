/**
 * In-Memory Database Implementation
 * This is a simple fallback database for development/testing when MongoDB is not available
 */

let students = [];
let nextId = 1;

/**
 * Generate a simple ID (mimicking MongoDB ObjectId)
 */
const generateId = () => {
  return `mem_${nextId++}_${Date.now()}`;
};

/**
 * Memory Database Operations
 */
const MemoryDB = {
  // Find all students with optional search
  find: (query = {}) => {
    let result = [...students];
    
    if (query.$or) {
      const searchTerms = query.$or;
      result = students.filter(student => {
        return searchTerms.some(term => {
          const field = Object.keys(term)[0];
          const searchValue = term[field].$regex;
          return student[field] && student[field].toLowerCase().includes(searchValue.toLowerCase());
        });
      });
    }
    
    return {
      sort: (sortObj) => ({
        exec: async () => {
          // Simple sorting by createdAt desc
          if (sortObj && sortObj.createdAt === -1) {
            return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
          return result;
        }
      }),
      exec: async () => result
    };
  },

  // Find student by ID
  findById: async (id) => {
    return students.find(student => student._id === id) || null;
  },

  // Find one student by query
  findOne: async (query) => {
    if (query.email) {
      return students.find(student => student.email === query.email) || null;
    }
    return null;
  },

  // Create new student
  create: async (data) => {
    const newStudent = {
      _id: generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    students.push(newStudent);
    return newStudent;
  },

  // Update student
  findByIdAndUpdate: async (id, data, options = {}) => {
    const studentIndex = students.findIndex(student => student._id === id);
    if (studentIndex === -1) return null;

    students[studentIndex] = {
      ...students[studentIndex],
      ...data,
      updatedAt: new Date()
    };
    
    return students[studentIndex];
  },

  // Delete student
  findByIdAndDelete: async (id) => {
    const studentIndex = students.findIndex(student => student._id === id);
    if (studentIndex === -1) return null;

    const deletedStudent = students[studentIndex];
    students.splice(studentIndex, 1);
    return deletedStudent;
  }
};

// Add some sample data for testing
const addSampleData = () => {
  if (students.length === 0) {
    students = [
      {
        _id: generateId(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 22,
        course: 'Computer Science',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        _id: generateId(),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 20,
        course: 'Data Science',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        _id: generateId(),
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        age: 24,
        course: 'Software Engineering',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ];
    console.log('Added sample students to in-memory database');
  }
};

module.exports = { MemoryDB, addSampleData };
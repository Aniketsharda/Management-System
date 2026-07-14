const mongoose = require('mongoose');
const { MemoryDB, addSampleData } = require('./memoryDB');

/**
 * Database connection configuration
 * This function establishes connection to MongoDB using Mongoose
 * Falls back to in-memory database if MongoDB is not available
 */
const connectDB = async () => {
  try {
    // Check if we should use memory database
    if (process.env.USE_MEMORY_DB === 'true') {
      console.log('Using in-memory database for development');
      addSampleData();
      global.useMemoryDB = true;
      return;
    }

    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.useMemoryDB = false;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    
    // Fallback to in-memory database
    console.log('Falling back to in-memory database...');
    addSampleData();
    global.useMemoryDB = true;
    
    console.log('✅ In-memory database initialized successfully');
    console.log('📝 Note: Data will not persist between server restarts');
  }
};

module.exports = connectDB;
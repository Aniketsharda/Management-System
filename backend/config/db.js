const mongoose = require('mongoose');

/**
 * Database connection configuration
 * This function establishes connection to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB with recommended options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
// Load Mongoose library for MongoDB object modeling.
const mongoose = require('mongoose');

// Connection options passed to mongoose.connect.
const clientOptions = {
    dbName: 'Port_Russell'
};
console.log(process.env.DB_URL);
// Initialize and export an async connection.
exports.initClientDbConnection = async () => {
  try {
    // Connect to MongoDB using DB_URL from environment variables.
    await mongoose.connect(process.env.DB_URL, clientOptions);
    console.log('Connected');
  } catch (error) {
    // Log and rethrow connection errors.
    console.error(error);
    throw error;
  }
};
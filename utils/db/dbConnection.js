const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db is connected successfully');
  } catch (error) {
    console.log('db is not connected', error.message);
  }
};

module.exports = dbConnection;

const mongoose = require('mongoose');
const { mongo_uri } = require('../allSecretExpt/allSecretExpt');

const dbConnection = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log('db is connected successfully');
  } catch (error) {
    console.log('db is not connected', error.message);
  }
};

module.exports = dbConnection;

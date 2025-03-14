const jwt = require('jsonwebtoken');
require('dotenv').config();
const { jwt_secret } = require('./allSecretExpt/allSecretExpt');

const generateToken = (user) => {
  return jwt.sign(
    { uid: user.uid, email: user.email, role: user.role }, // Payload
    process.env.jwt_secret, // Secret key
    { expiresIn: '1d' } // Token expires in 7 days
  );
};

module.exports = generateToken;

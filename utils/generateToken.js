const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (user) => {
  return jwt.sign(
    { uid: user.uid, email: user.email, role: user.role }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '1d' } // Token expires in 7 days
  );
};

module.exports = generateToken;

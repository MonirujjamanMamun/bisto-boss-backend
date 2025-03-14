const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../utils/allSecretExpt/allSecretExpt');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Access Denied',
    });

  try {
    const verified = jwt.verify(token, jwt_secret);
    req.user = verified; // Attach user info to the request
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};

module.exports = { verifyToken };

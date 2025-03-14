const User = require('../models/user.model');

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = checkAdmin;

const express = require('express');
const {
  getAllUser,
  registerUser,
  makeAdmin,
} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');
const router = express.Router();

router.get('/alluser', verifyToken, checkAdmin, getAllUser);
router.post('/register', registerUser);
router.patch('/makeadmin/:id', verifyToken, checkAdmin, makeAdmin);

module.exports = router;

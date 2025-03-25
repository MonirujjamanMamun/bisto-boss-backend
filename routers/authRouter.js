const express = require('express');
const {
  tokenResponse,
  getAllUser,
  registerUser,
  loginUser,
  makeAdmin,
  deleteUser,
  getUserRole,
} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');
const checkAdmin = require('../middlewares/checkAdmin');
const router = express.Router();

router.post('/jwt', verifyToken, tokenResponse);
router.get('/userrole', verifyToken, getUserRole);
router.get('/alluser', verifyToken, checkAdmin, getAllUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/makeadmin/:id', verifyToken, checkAdmin, makeAdmin);
router.delete('/deleteuser/:id', verifyToken, checkAdmin, deleteUser);

module.exports = router;

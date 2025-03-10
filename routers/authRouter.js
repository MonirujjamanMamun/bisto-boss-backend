const express = require('express');
const {
  getAllUser,
  registerUser,
  makeAdmin,
} = require('../controllers/authController');
const router = express.Router();

router.get('/allUser', getAllUser);
router.post('/register', registerUser);
router.patch('/makeadmin/:id', makeAdmin);

module.exports = router;

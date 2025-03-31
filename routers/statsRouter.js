const express = require('express');
const {
  getAdminStats,
  getOrderStats,
} = require('../controllers/statsController');
const checkAdmin = require('../middlewares/checkAdmin');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/admin-stats', verifyToken, checkAdmin, getAdminStats);
router.get('/order-stats', verifyToken, checkAdmin, getOrderStats);

module.exports = router;

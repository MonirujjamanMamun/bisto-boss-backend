const express = require('express');
const { allCart, addCart } = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/cart', verifyToken, allCart);
router.post('/cart', verifyToken, addCart);

module.exports = router;

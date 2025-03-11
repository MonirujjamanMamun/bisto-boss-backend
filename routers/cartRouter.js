const express = require('express');
const { allCart, addCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/cart', allCart);
router.post('/cart', addCart);

module.exports = router;

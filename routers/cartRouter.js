const express = require('express');
const {
  allCart,
  addCart,
  deleteCartItem,
  resetCart,
} = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/cart', verifyToken, allCart);
router.post('/cart', verifyToken, addCart);
router.delete('/deletecart/:id', verifyToken, deleteCartItem);
router.delete('/resetcart', verifyToken, resetCart);

module.exports = router;

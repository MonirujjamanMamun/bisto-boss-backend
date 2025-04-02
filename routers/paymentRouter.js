const express = require('express');
const {
  payments,
  createPaymentIntent,
  getPaymentHistory,
} = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/payments', verifyToken, payments);
router.post('/create-payment-intent', verifyToken, createPaymentIntent);
router.get('/paymenthistory', verifyToken, getPaymentHistory);

module.exports = router;

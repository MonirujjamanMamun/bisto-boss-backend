const Cart = require('../models/cart.Model');
const Payment = require('../models/payment.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//payment intriget
const createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('error accrued create payment intent', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const payments = async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from verifyToken middleware
    const { email, totalPrice, transactionId, menuItemIds, status } = req.body;

    const paymentData = new Payment({
      userId,
      email,
      totalPrice,
      transactionId,
      menuItemIds,
      status,
    });

    await paymentData.save();
    const deleteCard = await Cart.findOneAndDelete({ userId });
    res.status(201).json({
      success: true,
      message: 'Payment added successfully',
      paymentData,
      deleteCard,
    });
  } catch (error) {
    console.log('error accrued payment controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const getPaymentHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const paymentList = await Payment.find({ userId });

    if (!paymentList) {
      return res.status(400).json({
        success: false,
        message: 'No history found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'All payment list',
      paymentList,
    });
  } catch (error) {
    console.log('error accrued get Payment History', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

module.exports = { payments, createPaymentIntent, getPaymentHistory };

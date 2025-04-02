const Cart = require('../models/cart.Model');
const Payment = require('../models/payment.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * The function `createPaymentIntent` takes a price from the request body, converts it to the required
 * amount, creates a payment intent using Stripe API, and returns the client secret for the payment.
 * @param req - The `req` parameter in the `createPaymentIntent` function typically represents the HTTP
 * request object that contains information sent by the client to the server. This object includes data
 * such as request headers, parameters, body, and more. In this specific function, `req.body` is used
 * to extract the
 * @param res - The `res` parameter in the `createPaymentIntent` function is the response object that
 * will be sent back to the client making the request. It is used to send the response back to the
 * client with the payment intent details or any error messages in case of an exception.
 * secret from the payment intent. If an error occurs, it returns a JSON response with a status code of
 * 500, containing `success` set to `false`, a message indicating that something went wrong
 */
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

/**
 * The function `payments` handles the process of adding a payment record to the database and deleting
 * the user's cart after successful payment.
 * @param req - The `req` parameter in the `payments` function is the request object that contains
 * information sent by the client to the server. It includes data such as user details, payment
 * information, and other necessary details needed to process a payment transaction. In this function,
 * `req` is used to extract the
 * @param res - The `res` parameter in the `payments` function is the response object that will be used
 * to send a response back to the client making the request. It is typically used to send HTTP
 
 * @returns The response includes a success message, the payment data object, and the
 * deleted card object. If an error occurs during the process, it returns a JSON response with status
 * code 500, indicating that something went wrong, and includes the error message in the response.
 */
const payments = async (req, res) => {
  try {
    const userId = req.user._id;
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

/**
 * The function `getPaymentHistory` retrieves payment history for a specific user and handles errors
 * appropriately.
 * @param req - The `req` parameter in the `getPaymentHistory` function stands for the request object.
 * It contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body, and user information. In this case, `req.user._id` is used to retrieve the user's
 * @param res - The `res` parameter in the `getPaymentHistory` function is the response object that
 * will be used to send a response back to the client making the request. It is typically used to send
 * HTTP responses with status codes, headers, and data back to the client. In the provided code
 * snippet,
 * @returns The `getPaymentHistory` function returns a list of payment history for a specific user. If
 * the payment history is found, it will return a success response with the payment list. If no history
 * is found, it will return a failure response with a message indicating that no history was found. If
 * an error occurs during the process, it will log the error and return a failure response with an
 * error message
 */
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

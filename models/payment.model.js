const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true, // Fixed typo (require → required)
    },
    email: String,
    totalPrice: Number,
    transactionId: String,
    date: {
      type: Date,
      default: Date.now, // Default to current date
    },
    menuItemIds: [mongoose.Schema.Types.ObjectId], // Changed to array of ObjectIds
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'], // Defined allowed values
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payments', paymentSchema);
module.exports = Payment;

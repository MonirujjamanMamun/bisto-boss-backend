const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
        require: true,
      },

      quantity: {
        type: Number,
        min: 1,
        require: true,
      },
    },
  ],
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;

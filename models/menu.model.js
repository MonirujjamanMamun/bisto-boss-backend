const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    recipe: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;

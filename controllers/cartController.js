const Cart = require('../models/cart.Model');
const Menu = require('../models/menu.model');

const allCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne(userId).populate('items.menuItemId');
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Your cart is empty!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'cart items',
      cartItems: cart.items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;
    if (!menuItemId || !quantity || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
      });
    }
    const existMenu = await Menu.findById(menuItemId);
    if (!existMenu) {
      return res.status(400).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    const cart = await Cart.findOne(userId);
    if (!cart) {
      cart = new Cart({ userId, items: [{ menuItemId, quantity }] });
    } else {
      const existingItem = cart.items.find(
        (item) => item.menuItemId.toString() === menuItemId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ menuItemId, quantity });
      }
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cart,
    });
  } catch (error) {
    console.log('error accrued addCart', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

module.exports = { allCart, addCart };

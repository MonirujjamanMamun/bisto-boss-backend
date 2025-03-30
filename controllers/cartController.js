const Cart = require('../models/cart.Model');
const Menu = require('../models/menu.model');

const allCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.menuItemId');

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Your cart is empty!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'cart items',
      // cartItems: cart.items,
      cart,
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
    const userId = req.user._id;
    const { menuItemId, quantity } = req.body;
    if (!menuItemId) {
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

    let cart = await Cart.findOne({ userId });
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

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { menuItemId } = req.params;
    // console.log('delete cart menuItem id', menuItemId);

    if (!menuItemId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Filter out the item to be deleted
    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== menuItemId
    );

    // If the cart is empty after deletion, remove the cart document
    if (cart.items.length === 0) {
      await Cart.findOneAndDelete({ userId });
      return res.status(200).json({
        success: true,
        message: 'Cart is now empty',
      });
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      cart,
    });
  } catch (error) {
    console.log('Error in deleteCartItem:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const resetCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const resetCart = await Cart.deleteMany({ userId });
    if (!resetCart) {
      return res.status(400).json({
        success: false,
        message: "Cart can't reset",
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Cart has been reset successfully',
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

module.exports = {
  allCart,
  addCart,
  deleteCartItem,
  resetCart,
};

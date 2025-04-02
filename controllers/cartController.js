const Cart = require('../models/cart.Model');
const Menu = require('../models/menu.model');

/**
 * The function `allCart` retrieves a user's cart items and returns them in a JSON response, handling
 * cases where the cart is empty or an error occurs.
 * @param req - The `req` parameter in the `allCart` function is the request object, which contains
 * information about the HTTP request that triggered the function. This object typically includes
 * details such as the request headers, parameters, body, URL, and user authentication information. In
 * this specific function, `req.user._
 * @param res - The `res` parameter in the `allCart` function is the response object that will be used
 * to send the response back to the client making the request. It is typically used to set the status
 * code of the response and send JSON data back to the client.
 * @returns If the cart is found and not empty, the function will return a 200 status with a JSON
 * response containing the cart items. If the cart is not found or empty, it will return a 404 status
 * with a message indicating that the cart is empty. If an error occurs during the process, it will
 * return a 500 status with an error message.
 */
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

/**
 * The `addCart` function in JavaScript handles adding menu items to a user's cart with error handling
 * and response messages.
 * @param req - The `req` parameter in the `addCart` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, including headers,
 * parameters, body, and more. In this case, it is used to extract the user ID and the menu item ID and
 * quantity from
 * @param res - The `res` parameter in the `addCart` function is the response object that will be used
 * to send a response back to the client making the request. It is typically used to set the status
 * code, send JSON data, or render a view in response to the client's request. In the
 * @returns The `addCart` function returns a JSON response with the following structure:
 */
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

/**
 * The function `deleteCartItem` handles the removal of a specific item from a user's cart, updating
 * the cart contents accordingly.
 * @param req - The `req` parameter in the `deleteCartItem` function stands for the request object. It
 * contains information about the HTTP request made to the server, including headers, parameters, body,
 * etc. In this function, `req` is used to access the user ID and the menu item ID that are
 * @param res - The `res` parameter in the `deleteCartItem` function is the response object that will
 * be used to send back the response to the client making the request. It is typically used to send
 * HTTP responses with status codes, JSON data, or error messages back to the client.
 * @returns The `deleteCartItem` function returns a JSON response with status code and message based on
 * the outcome of the deletion operation.
 */
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

/**
 * The function `resetCart` resets the cart for a specific user and returns a success message if the
 * reset is successful.
 * @param req - The `req` parameter in the `resetCart` function is an object representing the HTTP
 * request. It contains information about the request made to the server, such as headers, body,
 * parameters, and user information. In this case, `req.user._id` is used to retrieve the user's
 * @param res - The `res` parameter in the `resetCart` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes, headers, and data back to the client. In this function, the `res
 * @returns The `resetCart` function returns a JSON response with a success status and a message
 * indicating whether the cart reset was successful or not. If the cart reset is successful, it returns
 * a status of 200 with a success message "Cart has been reset successfully". If there is an error
 * during the reset process, it returns a status of 500 with a message "Something went wrong" along
 * with the
 */
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

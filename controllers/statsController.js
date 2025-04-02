const User = require('../models/user.model');
const Menu = require('../models/menu.model');
const Payment = require('../models/payment.model');

/**
 * The `getAdminStats` function retrieves statistics related to users, menu items, payments, and total
 * revenue, and returns them in a JSON response.
 * @returns The `getAdminStats` function is returning a JSON response with the following properties:
 * - success: true/false
 * - message: 'admin stats get successfully' or 'Something went wrong'
 * - users: number of users in the database
 * - menuItems: number of menu items in the database
 * - payments: number of payments in the database
 * - revenue: total revenue calculated from the payments in
 */
const getAdminStats = async (req, res) => {
  try {
    const users = await User.estimatedDocumentCount();
    const menuItems = await Menu.estimatedDocumentCount();
    const payments = await Payment.estimatedDocumentCount();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$totalPrice',
          },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.status(200).json({
      success: true,
      message: 'admin stats get successfully',
      users,
      menuItems,
      payments,
      revenue,
    });
  } catch (error) {
    console.log('error occurred get admin stats controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

/**
 * The function `getOrderStats` retrieves order statistics by aggregating payment data with menu items
 * based on category.
 * @param res - The `res` parameter in the `getOrderStats` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with data or error messages. In this function, `res` is used to send a JSON
 * @returns The `getOrderStats` function returns order statistics including the category, quantity, and
 * revenue of menu items based on the payments made. The result is an aggregation of data from the
 * `Payment` collection with menu item details from the `menus` collection. The response includes a
 * success message along with the order statistics data in JSON format. If an error occurs during the
 * process, an error message is logged
 */
const getOrderStats = async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $lookup: {
          from: 'menus',
          localField: 'menuItemIds',
          foreignField: '_id',
          as: 'menuItems',
        },
      },
      {
        $unwind: '$menuItems',
      },
      {
        $group: {
          _id: '$menuItems.category',
          quantity: { $sum: 1 },
          revenue: { $sum: '$menuItems.price' }, // Ensure 'price' exists in menu
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          quantity: '$quantity',
          revenue: '$revenue',
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'order stats get successfully',
      result,
    });
  } catch (error) {
    console.log('error occurred get order stats controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
module.exports = { getAdminStats, getOrderStats };

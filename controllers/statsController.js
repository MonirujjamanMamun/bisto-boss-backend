const User = require('../models/user.model');
const Menu = require('../models/menu.model');
const Payment = require('../models/payment.model');

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

const getOrderStats = async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $lookup: {
          from: 'menus', // Ensure the collection name is correct (menus, not menu)
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

const Menu = require('../models/menu.model');

const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    if (menu.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No menu found',
      });
    }
    return res.status(200).json({
      success: true,
      message: `All menu ${menu.length}`,
      menus: menu,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

module.exports = { getAllMenu };

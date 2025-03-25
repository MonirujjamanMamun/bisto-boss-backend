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

const addMenuItem = async (req, res) => {
  const { name, recipe, image, category, price } = req.body;
  if (!name || !recipe || !image || !category || !price) {
    return res.status(400).json({
      success: false,
      message: 'All field needed',
    });
  }
  try {
    const newMenu = Menu({ name, recipe, image, category, price });
    await newMenu.save();
    return res.status(201).json({
      success: true,
      message: 'menu item added successfully',
      menus: newMenu,
    });
  } catch (error) {
    console.log('add menu error', error.message);
    return res.status(400).json({
      success: false,
      message: "Something is wrong, can't added menu",
      error: error.message,
    });
  }
};

const editMenuItemById = async (req, res) => {
  const { id } = req.params;
  const { name, recipe, image, category, price } = req.body;

  try {
    // Find menu item by ID
    const existingMenu = await Menu.findById(id);

    if (!existingMenu) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found, provide a valid ID',
      });
    }

    // Update the menu item fields
    existingMenu.name = name || existingMenu.name;
    existingMenu.recipe = recipe || existingMenu.recipe;
    existingMenu.image = image || existingMenu.image;
    existingMenu.category = category || existingMenu.category;
    existingMenu.price = price || existingMenu.price;

    // Save the updated menu item
    const updatedMenu = await existingMenu.save();

    return res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      updatedMenu,
    });
  } catch (error) {
    console.error('Edit menu error:', error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, couldn't update menu",
      error: error.message,
    });
  }
};

const getMenuById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: 'Need Id for find',
    });
  }
  try {
    const findMenu = await Menu.findById(id);
    if (!findMenu) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'menu item find successfully',
      menus: findMenu,
    });
  } catch (error) {
    console.log('find by id error', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something is wrong',
      error: error.message,
    });
  }
};

const deleteMenuById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Id is missing',
    });
  }
  try {
    const findMenu = await Menu.findById(id);
    if (!findMenu) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }
    const deleteMenu = await Menu.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: 'Deleted successfully',
      menu: deleteMenu,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
module.exports = {
  getAllMenu,
  addMenuItem,
  getMenuById,
  editMenuItemById,
  deleteMenuById,
};

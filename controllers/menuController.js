const Menu = require('../models/menu.model');

/**
 * The function `getAllMenu` retrieves all menu items from the database and returns them in a JSON
 * response, handling potential errors along the way.
 * @param req - `req` is the request object representing the HTTP request made by the client to the
 * server. It contains information about the request such as the URL, headers, parameters, body
 * content, etc. In the provided code snippet, `req` is likely used to handle the incoming request and
 * extract any necessary
 * @param res - The `res` parameter in the `getAllMenu` function is the response object that will be
 * used to send the response back to the client making the request. It is typically used to set the
 * status code of the response (e.g., 200 for success, 400 for bad request), send
 * @returns The `getAllMenu` function is returning a JSON response with status code 200 if menus are
 * found, and status code 400 if no menu is found or if an error occurs. The response includes a
 * success status, a message indicating the outcome, and either the menu data or an error message.
 */
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

/**
 * The function `addMenuItem` is an asynchronous function that adds a new menu item to a database and
 * returns a success message or an error message accordingly.
 * @param req - The `req` parameter in the `addMenuItem` function represents the request object, which
 * contains information about the HTTP request made to the server. It includes data such as request
 * headers, parameters, body, and more. In this case, the function is expecting the request body to
 * contain properties like `
 * @param res - The `res` parameter in the `addMenuItem` function is the response object that will be
 * sent back to the client making the request. It is used to send a response back to the client with
 * the status code, success message, and any data related to the menu item that was added.
 * @returns If all required fields are provided in the request body, a new menu item will be added to
 * the database and a success response will be returned with status code 201. The response will include
 * a message indicating that the menu item was added successfully, along with the details of the newly
 * added menu item.
 */
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

/**
 * The function `editMenuItemById` updates a menu item in a database based on the provided ID and
 * request body data.
 * @param req - The `req` parameter in the `editMenuItemById` function represents the request object,
 * which contains information about the HTTP request made to the server. It includes data such as
 * request headers, parameters, body, query parameters, and more. In this function, `req` is used to
 * extract the
 * @param res - The `res` parameter in the `editMenuItemById` function is the response object that will
 * be used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes, JSON data, or error messages.
 */
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

/**
 * The function `deleteMenuById` is an asynchronous function that deletes a menu item by its ID and
 * returns a success message or error message accordingly.
 * @param req - The `req` parameter in the `deleteMenuById` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this case, `req.params` is used to extract the `id` parameter
 * @param res - The `res` parameter in the `deleteMenuById` function is the response object that is
 * used to send a response back to the client making the request. It is typically used to set the
 * status code, send JSON data, or render a view in response to the client's request. In the
 * @returns The `deleteMenuById` function returns a JSON response with status code and message based on
 * the outcome of the operation.
 */
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

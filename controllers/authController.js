const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

const tokenResponse = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Valid token`,
  });
};

/**
 * The function `getUserRole` retrieves the role of a user based on their user ID and returns it in a
 * JSON response.
 * @param req - The `req` parameter in the `getUserRole` function typically represents the HTTP request
 * object, which contains information about the incoming request from the client, such as headers,
 * parameters, body, etc. It is commonly used to extract data sent by the client to the server.
 * @param res - The `res` parameter in the `getUserRole` function is typically used to send a response
 * back to the client making the request. It is an object that represents the HTTP response that an
 * Express.js route handler function sends when it receives an HTTP request. The response object
 * (`res`) has methods like
 * @returns If the user is found successfully, the function will return a JSON response with a status
 * code of 200, containing the user's role under the key "user" and a success message. If no user is
 * found, it will return a JSON response with a status code of 400, indicating that no user was found.
 * If an error occurs during the process, it will return a JSON response with
 */
const getUserRole = async (req, res) => {
  const userId = req.user._id;
  try {
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: 'No user found',
      });
    }
    const user = findUser.role;
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something is wrong',
      error: error.message,
    });
  }
};

/**
 * The function `getAllUser` retrieves all users from a database and returns them in a JSON response
 * with appropriate status codes and messages.
 * @param req - The `req` parameter in the `getAllUser` function typically represents the request
 * object, which contains information about the HTTP request that is being made, such as the request
 * headers, parameters, body, and other details. It is commonly used to access data sent from the
 * client to the server.
 * @param res - The `res` parameter in the `getAllUser` function is the response object that is used to
 * send a response back to the client making the request. It is typically an instance of the Express
 * response object in Node.js applications. The response object allows you to send HTTP responses with
 * status codes, headers
 * @returns The `getAllUser` function returns a JSON response with status code 200 if users are found,
 * and status code 400 if no users are found. If an error occurs during the process, it returns a JSON
 * response with status code 500.
 */
const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    if (allUser.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No user found',
      });
    }
    return res.status(200).json({
      success: true,
      message: `All user ${allUser.length}`,
      users: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something is wrong',
      error: error.message,
    });
  }
};

/**
 * The function `registerUser` is an asynchronous function that registers a new user by checking if the
 * user already exists and creating a new user if not, returning appropriate responses based on the
 * outcome.
 * @param req - The `req` parameter in the `registerUser` function is the request object that contains
 * information sent by the client to the server. It typically includes data such as parameters, body,
 * headers, and other information related to the HTTP request being made to the server. In this case,
 * the function is
 * @param res - The `res` parameter in the `registerUser` function is the response object that will be
 * used to send back the response to the client making the request. It is typically used to set the
 * status code, send JSON data, or render a view in response to the client's request.
 * @returns The `registerUser` function returns a response based on the conditions met during user
 * registration. If all required fields are provided and a new user is successfully created, it returns
 * a success response with status code 201, along with the newly created user object and a generated
 * token. If a user with the same UID or email already exists, it returns a response with status code
 * 400 indicating that the user
 */
const registerUser = async (req, res) => {
  const { uid, name, email } = req.body;

  if (!uid || !name || !email) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  try {
    // Find an existing user by UID or email
    const existUser = await User.findOne({
      $or: [{ uid }, { email }],
    });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists, please log in.',
      });
    }

    // Create a new user
    const newUser = new User({ uid, name, email, last_login: Date.now() });
    await newUser.save();

    const token = await generateToken(newUser);
    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      error: error.message,
    });
  }
};

/**
 * The function `loginUser` is an asynchronous function that handles user login by checking for
 * existing user by UID or email, updating last login time, generating a token, and returning a
 * response with success status and user data.
 * @param req - The `req` parameter in the `loginUser` function is typically an object representing the
 * HTTP request. It contains information about the request made to the server, such as request headers,
 * parameters, body, and more. In this specific function, `req.body` is used to extract the `uid
 * @param res - The `res` parameter in the `loginUser` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to set the HTTP status
 * code, send JSON data, or render a view in response to the client's request. In the
 * @returns The `loginUser` function returns a JSON response with different properties based on the
 * outcome of the login process. Here are the possible return scenarios:
 */
const loginUser = async (req, res) => {
  const { uid, email } = req.body;

  if (!uid || !email) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  try {
    // Find an existing user by UID or email
    const findUser = await User.findOne({
      $or: [{ uid }, { email }],
    });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: 'No user found, please register.',
      });
    }
    findUser.last_login = Date.now();
    await findUser.save();
    const token = await generateToken(findUser);
    return res.status(200).json({
      success: true,
      message: 'User login successfully.',
      findUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      error: error.message,
    });
  }
};

/**
 * The function `makeAdmin` is an asynchronous function that updates a user's role to 'admin' based on
 * the provided id and returns a success message with the updated user details or an error message if
 * something goes wrong.
 * @param req - The `req` parameter in the `makeAdmin` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this case, the function is expecting to receive a parameter `id` from
 * the request
 * @param res - The `res` parameter in the `makeAdmin` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to set the
 * status code, send JSON data, or render a view in response to the client's request.
 * @returns The `makeAdmin` function is returning a JSON response with status code and data based on
 * the conditions:
 */
const makeAdmin = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Id is required',
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User is not exists',
      });
    }
    user.role = 'admin';
    await user.save();
    return res.status(201).json({
      success: true,
      message: `${user.name} is now admin`,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      error: error.message,
    });
  }
};

/**
 * The function `deleteUser` is an asynchronous function that deletes a user by their ID and returns a
 * success message if the user is deleted successfully, otherwise it returns an error message.
 * @param req - The `req` parameter in the `deleteUser` function is an object that represents the HTTP
 * request. It contains information about the request made to the server, such as the request
 * parameters, headers, body, and other details. In this function, `req.params` is used to extract the
 * `
 * @param res - The `res` parameter in the `deleteUser` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to set the status code,
 * send JSON data, or render a view in response to the client's request.
 * @returns The `deleteUser` function is returning a JSON response with different status codes and
 * messages based on the outcome of the operation. Here is a summary of the possible return scenarios:
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Id is required',
    });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User is not exists',
      });
    }
    return res.status(200).json({
      success: true,
      message: `${user.name} was deleted`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      error: error.message,
    });
  }
};
module.exports = {
  tokenResponse,
  getAllUser,
  registerUser,
  makeAdmin,
  loginUser,
  deleteUser,
  getUserRole,
};

const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

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
module.exports = { getAllUser, registerUser, makeAdmin, loginUser, deleteUser };

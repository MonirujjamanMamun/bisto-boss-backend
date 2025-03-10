const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      enm: ['user', 'admin'],
      default: 'user',
    },
    last_login: Date,
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;

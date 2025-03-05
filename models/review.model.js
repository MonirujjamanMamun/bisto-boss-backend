const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name is require'],
    },
    details: {
      type: String,
      require: [true, 'Details is require'],
    },
    rating: {
      type: Number,
      min: [1, 'Must be at list 1, got {VALUE}'],
      max: [5, 'Not more than 5'],
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model('reviews', reviewSchema);

module.exports = Reviews;

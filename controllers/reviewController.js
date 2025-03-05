const Reviews = require('../models/review.model');

const getAllReview = async (req, res) => {
  try {
    const review = await Reviews.find();
    if (review.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No review found',
      });
    }
    return res.status(200).json({
      success: true,
      message: `All reviews ${review.length}`,
      reviews: review,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

module.exports = { getAllReview };

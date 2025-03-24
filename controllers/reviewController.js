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
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Id is missing',
    });
  }
  try {
    const getReview = await Reviews.findById(id);
    if (!getReview) {
      return res.status(404).json({
        success: false,
        message: 'No review found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'review found',
      review: getReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const addReview = async (req, res) => {
  const { name, details, rating } = req.body;
  if (!name || !details || !rating) {
    return res.status(400).json({
      success: false,
      message: 'All field needed',
    });
  }
  try {
    const newReview = await Reviews({ name, details, rating });
    await newReview.save();
    return res.status(201).json({
      success: true,
      message: 'Review create successfully',
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const editReviewById = async (req, res) => {
  const { id } = req.params;
  const { name, details, rating } = req.body;

  try {
    const updateReview = await Reviews.findByIdAndUpdate(id, {
      name,
      details,
      rating,
    });
    if (!updateReview) {
      return res.status(400).json({
        success: false,
        message: 'Review not found, Provide a valid Id',
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Review update successfully',
      updateReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Id is missing',
    });
  }
  try {
    const review = await Reviews.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'No review found',
      });
    }
    const deletedReview = await Reviews.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: 'Deleted successfully',
      review: deletedReview,
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
  getAllReview,
  addReview,
  editReviewById,
  getReviewById,
  deleteReview,
};

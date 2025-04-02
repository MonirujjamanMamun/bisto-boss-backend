const Reviews = require('../models/review.model');

/**
 * The function `getAllReview` retrieves all reviews from a database and returns them in a JSON
 * response with appropriate status codes.
 * @param req - The `req` parameter in the `getAllReview` function typically represents the HTTP
 * request object, which contains information about the incoming request from the client, such as
 * headers, parameters, body content, etc. This parameter is used to access data sent by the client to
 * the server. In this function,
 * @param res - The `res` parameter in the `getAllReview` function is the response object that will be
 * used to send the response back to the client making the request. It is typically provided by the
 * Express.js framework and contains methods for sending HTTP responses, such as `res.status()` and
 * `res.json()
 * @returns The `getAllReview` function returns a JSON response with the success status, a message, and
 * either the reviews found or an error message. If reviews are found, it returns a success status of
 * true, a message indicating the number of reviews found, and the reviews themselves. If no reviews
 * are found, it returns a success status of false and a message indicating that no reviews were found.
 * If an
 */
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

/**
 * The function `getReviewById` retrieves a review by its ID and returns it in a JSON response with
 * appropriate status codes and messages.
 * @param req - The `req` parameter in the `getReviewById` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as the request
 * parameters, headers, body, and other details. In this function, `req.params` is used to extract the
 * `id
 * @param res - The `res` parameter in the `getReviewById` function is the response object that is used
 * to send a response back to the client making the request. It is typically provided by the Express.js
 * framework when handling HTTP requests. The response object has methods like `res.status()` to set
 * the HTTP
 * @returns The `getReviewById` function returns a JSON response with a success status, message, and
 * either the review data if found or an error message if an issue occurred.
 */
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

/**
 * The function `addReview` is an asynchronous function that creates a new review with name, details,
 * and rating, and returns a success message or error message accordingly.
 * @param req - The `req` parameter in the `addReview` function represents the request object, which
 * contains information about the HTTP request that was made. This object includes properties such as
 * `req.body` (containing the parsed request body), `req.params` (containing route parameters),
 * `req.query`
 * @param res - The `res` parameter in the `addReview` function is the response object that will be
 * sent back to the client making the request. It is used to send the HTTP response with the
 * appropriate status code, message, and data.
 * @returns The `addReview` function returns a response with status code and JSON data. If the required
 * fields (name, details, rating) are missing in the request body, it returns a 400 status with a
 * message indicating that all fields are needed. If there is an error during the process of creating
 * and saving a new review, it returns a 500 status with a message indicating that something went wrong
 */
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

/**
 * The function `editReviewById` updates a review in a database based on the provided ID and returns a
 * success message or an error message.
 * @param req - The `req` parameter in the `editReviewById` function represents the request object in
 * Express.js. It contains information about the HTTP request such as the parameters, body, headers,
 * and other details sent by the client to the server.
 * @param res - The `res` parameter in the `editReviewById` function is the response object that will
 * be used to send a response back to the client making the request. It is typically used to send
 * status codes, JSON data, or other types of responses to the client. In the provided code snippet,
 * @returns The `editReviewById` function returns a JSON response with a success status, message, and
 * either the updated review data or an error message.
 */
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

/**
 * The function `deleteReview` is an asynchronous function that deletes a review based on the provided
 * ID and returns a success message or an error message if something goes wrong.
 * @param req - The `req` parameter in the `deleteReview` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this case, `req.params` is used to extract the `id` parameter from
 * @param res - The `res` parameter in the `deleteReview` function is the response object that is used
 * to send a response back to the client making the request. It is typically used to set the status
 * code, send JSON data, and handle errors in the response.
 * @returns The `deleteReview` function returns a JSON response with a success status, message, and
 * either the deleted review or an error message. The possible return values are:
 * 1. If the `id` is missing in the request parameters, it returns a 400 status with a message 'Id is
 * missing'.
 * 2. If no review is found with the provided `id`, it returns a 404 status
 */
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

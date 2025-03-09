const express = require('express');
const {
  getAllReview,
  addReview,
  getReviewById,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.get('/review', getAllReview);
router.get('/review/:id', getReviewById);
router.post('/review', addReview);
router.delete('/review/:id', deleteReview);

module.exports = router;

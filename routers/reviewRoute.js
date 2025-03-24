const express = require('express');
const {
  getAllReview,
  addReview,
  getReviewById,
  deleteReview,
  editReviewById,
} = require('../controllers/reviewController');
const checkAdmin = require('../middlewares/checkAdmin');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/review', getAllReview);
router.get('/review/:id', getReviewById);
router.post('/review', addReview);
router.patch('/editreview/:id', editReviewById);
router.delete('/review/:id', verifyToken, checkAdmin, deleteReview);

module.exports = router;

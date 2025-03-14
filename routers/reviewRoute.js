const express = require('express');
const {
  getAllReview,
  addReview,
  getReviewById,
  deleteReview,
} = require('../controllers/reviewController');
const checkAdmin = require('../middlewares/checkAdmin');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/review', getAllReview);
router.get('/review/:id', getReviewById);
router.post('/review', verifyToken, addReview);
router.delete('/review/:id', verifyToken, checkAdmin, deleteReview);

module.exports = router;

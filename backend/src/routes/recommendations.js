const express = require('express');
const {
  getProductRecommendations,
  getTrending
} = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/trending', getTrending);
router.get('/personalized', authMiddleware, getProductRecommendations);

module.exports = router;

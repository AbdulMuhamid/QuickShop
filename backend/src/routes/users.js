const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  getUserOrders
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', getUserProfile);
router.patch('/profile', updateUserProfile);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist', removeFromWishlist);
router.get('/orders', getUserOrders);

module.exports = router;

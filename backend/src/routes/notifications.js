const express = require('express');
const {
  sendOffer,
  getAllNotifications,
  markAsRead,
  removeNotification
} = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/offer', authMiddleware, sendOffer);
router.get('/', authMiddleware, getAllNotifications);
router.patch('/:notificationId', authMiddleware, markAsRead);
router.delete('/:notificationId', authMiddleware, removeNotification);

module.exports = router;

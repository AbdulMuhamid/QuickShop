const {
  createNotification,
  sendPersonalizedOffer,
  notifyRestockedProducts,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
} = require('../services/notificationService');

const sendOffer = async (req, res) => {
  try {
    const { discount, productIds } = req.body;

    if (!discount || !productIds || productIds.length === 0) {
      return res.status(400).json({ message: 'Please provide discount and productIds' });
    }

    const notification = await sendPersonalizedOffer(req.userId, discount, productIds);

    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const { unreadOnly } = req.query;
    const notifications = await getUserNotifications(req.userId, unreadOnly === 'true');

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await markNotificationAsRead(notificationId);

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await deleteNotification(notificationId);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendOffer,
  getAllNotifications,
  markAsRead,
  removeNotification
};

const Notification = require('../models/Notification');
const User = require('../models/User');
const Product = require('../models/Product');
const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const createNotification = async (userId, notificationData) => {
  try {
    const notification = await Notification.create({
      userId,
      ...notificationData
    });

    return notification;
  } catch (error) {
    console.error('Create notification error:', error);
    throw error;
  }
};

const sendEmailNotification = async (userId, subject, message, productIds = []) => {
  try {
    const user = await User.findById(userId);

    if (!user || !user.notificationPreferences.email) {
      return null;
    }

    const products = productIds.length > 0 ? await Product.find({ _id: { $in: productIds } }) : [];

    let htmlContent = `<h2>${subject}</h2><p>${message}</p>`;

    if (products.length > 0) {
      htmlContent += '<h3>Recommended Products:</h3><ul>';
      products.forEach(product => {
        htmlContent += `
          <li>
            <strong>${product.name}</strong><br/>
            Price: $${product.price}<br/>
            Category: ${product.category}
          </li>
        `;
      });
      htmlContent += '</ul>';
    }

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject,
      html: htmlContent
    });

    return true;
  } catch (error) {
    console.error('Send email notification error:', error);
    return false;
  }
};

const sendPersonalizedOffer = async (userId, discount, productIds) => {
  try {
    const notification = await createNotification(userId, {
      type: 'personalized_offer',
      title: `${discount}% Discount on Your Favorite Products!`,
      message: `Check out these exclusive deals tailored just for you`,
      discount,
      productIds,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    // Send email if enabled
    const user = await User.findById(userId);
    if (user && user.notificationPreferences.email) {
      await sendEmailNotification(
        userId,
        `${discount}% Exclusive Discount for You!`,
        `We've selected these products with you in mind. Use code SAVE${discount} at checkout!`,
        productIds
      );
    }

    return notification;
  } catch (error) {
    console.error('Send personalized offer error:', error);
    throw error;
  }
};

const notifyRestockedProducts = async (userId, productIds) => {
  try {
    const notification = await createNotification(userId, {
      type: 'restock',
      title: 'Items Back in Stock!',
      message: 'We found items you wanted that are now available',
      productIds
    });

    const user = await User.findById(userId);
    if (user && user.notificationPreferences.email) {
      await sendEmailNotification(
        userId,
        'Items You Wanted Are Back in Stock!',
        'Hurry! These items are available for a limited time.',
        productIds
      );
    }

    return notification;
  } catch (error) {
    console.error('Notify restocked products error:', error);
    throw error;
  }
};

const getUserNotifications = async (userId, unreadOnly = false) => {
  try {
    const filter = { userId };
    if (unreadOnly) {
      filter.read = false;
    }

    const notifications = await Notification.find(filter)
      .populate('productIds')
      .sort({ createdAt: -1 });

    return notifications;
  } catch (error) {
    console.error('Get user notifications error:', error);
    throw error;
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    return notification;
  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
};

const deleteNotification = async (notificationId) => {
  try {
    await Notification.findByIdAndDelete(notificationId);
    return { success: true };
  } catch (error) {
    console.error('Delete notification error:', error);
    throw error;
  }
};

module.exports = {
  createNotification,
  sendEmailNotification,
  sendPersonalizedOffer,
  notifyRestockedProducts,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
};

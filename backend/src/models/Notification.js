const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['personalized_offer', 'restock', 'recommendation', 'order_update', 'promotion'],
    required: true
  },
  title: String,
  message: {
    type: String,
    required: true
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  expiresAt: Date,
  read: {
    type: Boolean,
    default: false
  },
  sent: {
    type: Boolean,
    default: false
  },
  channel: {
    type: String,
    enum: ['email', 'push', 'sms', 'in-app'],
    default: 'email'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sentAt: Date
});

module.exports = mongoose.model('Notification', notificationSchema);

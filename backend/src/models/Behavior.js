const mongoose = require('mongoose');

const behaviorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionType: {
    type: String,
    enum: ['view', 'click', 'add_to_cart', 'remove_from_cart', 'purchase', 'search', 'filter'],
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  searchQuery: String,
  filters: {
    category: String,
    priceRange: {
      min: Number,
      max: Number
    },
    brand: String
  },
  duration: Number, // in seconds - how long user spent on product
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: String,
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  }
});

// Create index for efficient querying
behaviorSchema.index({ userId: 1, timestamp: -1 });
behaviorSchema.index({ productId: 1 });

module.exports = mongoose.model('Behavior', behaviorSchema);

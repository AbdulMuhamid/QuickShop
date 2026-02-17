const Behavior = require('../models/Behavior');
const Product = require('../models/Product');

const trackBehavior = async (req, res) => {
  try {
    const { actionType, productId, searchQuery, filters, duration } = req.body;

    const behavior = await Behavior.create({
      userId: req.userId,
      actionType,
      productId,
      searchQuery,
      filters,
      duration,
      sessionId: req.headers['x-session-id']
    });

    res.status(201).json({
      success: true,
      data: behavior
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBehavior = async (req, res) => {
  try {
    const { startDate, endDate, actionType } = req.query;

    const filter = { userId: req.userId };

    if (actionType) filter.actionType = actionType;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const behaviors = await Behavior.find(filter)
      .sort({ timestamp: -1 })
      .populate('productId', 'name price category');

    res.status(200).json({
      success: true,
      count: behaviors.length,
      data: behaviors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  trackBehavior,
  getUserBehavior
};

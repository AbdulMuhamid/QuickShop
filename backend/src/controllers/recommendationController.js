const { getRecommendations, getTrendingProducts, getPersonalizedRecommendations } = require('../services/recommendationService');

const getProductRecommendations = async (req, res) => {
  try {
    const recommendations = await getPersonalizedRecommendations(req.userId);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrending = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const trendingProducts = await getTrendingProducts(Number(limit));

    res.status(200).json({
      success: true,
      count: trendingProducts.length,
      data: trendingProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductRecommendations,
  getTrending
};

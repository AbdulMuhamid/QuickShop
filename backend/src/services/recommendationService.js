const User = require('../models/User');
const Product = require('../models/Product');
const Behavior = require('../models/Behavior');

/**
 * Collaborative Filtering - Recommends products based on similar users' behavior
 */
const collaborativeFiltering = async (userId, limit = 5) => {
  try {
    // Get user's behavior
    const userBehaviors = await Behavior.find({ userId })
      .select('productId actionType -_id')
      .limit(50);

    const userViewedProducts = userBehaviors.map(b => b.productId);

    // Find similar users (users who viewed similar products)
    const similarUsers = await Behavior.aggregate([
      {
        $match: {
          productId: { $in: userViewedProducts },
          userId: { $ne: userId }
        }
      },
      {
        $group: {
          _id: '$userId',
          commonProducts: { $push: '$productId' },
          count: { $sum: 1 }
        }
      },
      { $match: { count: { $gte: 2 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get products viewed by similar users but not by current user
    const similarUserIds = similarUsers.map(u => u._id);
    const recommendedProducts = await Behavior.aggregate([
      {
        $match: {
          userId: { $in: similarUserIds },
          productId: { $nin: userViewedProducts }
        }
      },
      {
        $group: {
          _id: '$productId',
          score: { $sum: 1 }
        }
      },
      { $sort: { score: -1 } },
      { $limit: limit }
    ]);

    const productIds = recommendedProducts.map(p => p._id);
    const products = await Product.find({ _id: { $in: productIds } });

    return products;
  } catch (error) {
    console.error('Collaborative filtering error:', error);
    return [];
  }
};

/**
 * Content-Based Filtering - Recommends similar products based on attributes
 */
const contentBasedFiltering = async (userId, limit = 5) => {
  try {
    // Get user's purchased and viewed products
    const behaviors = await Behavior.find({
      userId,
      actionType: { $in: ['view', 'click', 'purchase'] }
    })
      .select('productId')
      .limit(20);

    const viewedProductIds = behaviors.map(b => b.productId);

    // Get details of viewed products
    const viewedProducts = await Product.find({ _id: { $in: viewedProductIds } });

    if (viewedProducts.length === 0) {
      return [];
    }

    // Build user profile from viewed products
    const categories = {};
    const brands = {};
    let avgPrice = 0;

    viewedProducts.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
      if (product.brand) {
        brands[product.brand] = (brands[product.brand] || 0) + 1;
      }
      avgPrice += product.price;
    });

    avgPrice = avgPrice / viewedProducts.length;

    // Find similar products
    const similarProducts = await Product.find({
      _id: { $nin: viewedProductIds },
      category: { $in: Object.keys(categories) }
    })
      .limit(limit * 2)
      .lean();

    // Score and sort similar products
    const scoredProducts = similarProducts.map(product => {
      let score = 0;

      // Category match
      if (categories[product.category]) {
        score += categories[product.category] * 2;
      }

      // Brand match
      if (brands[product.brand]) {
        score += brands[product.brand];
      }

      // Price range match
      const priceDistance = Math.abs(product.price - avgPrice);
      score -= Math.min(priceDistance / 100, 5);

      // Rating bonus
      score += product.rating * 0.5;

      return { ...product, score };
    });

    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ score, ...product }) => product);
  } catch (error) {
    console.error('Content-based filtering error:', error);
    return [];
  }
};

/**
 * Hybrid Recommendation Engine - Combines collaborative and content-based filtering
 */
const getRecommendations = async (userId, limit = 10) => {
  try {
    // Get both types of recommendations
    const [collaborativeRecs, contentRecs] = await Promise.all([
      collaborativeFiltering(userId, limit),
      contentBasedFiltering(userId, limit)
    ]);

    // Merge and deduplicate
    const recommendationMap = new Map();

    // Add collaborative filtering recommendations (higher weight)
    collaborativeRecs.forEach((product, index) => {
      const score = (limit - index) * 2;
      if (!recommendationMap.has(product._id.toString())) {
        recommendationMap.set(product._id.toString(), { product, score });
      } else {
        const existing = recommendationMap.get(product._id.toString());
        existing.score += score;
      }
    });

    // Add content-based recommendations
    contentRecs.forEach((product, index) => {
      const score = (limit - index);
      const key = product._id.toString();
      if (!recommendationMap.has(key)) {
        recommendationMap.set(key, { product, score });
      } else {
        const existing = recommendationMap.get(key);
        existing.score += score;
      }
    });

    // Sort by score and return top recommendations
    const recommendations = Array.from(recommendationMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);

    return recommendations;
  } catch (error) {
    console.error('Recommendation engine error:', error);
    return [];
  }
};

/**
 * Get trending products based on view and purchase counts
 */
const getTrendingProducts = async (limit = 10) => {
  try {
    const trendingProducts = await Product.find()
      .sort({ viewCount: -1, purchaseCount: -1, rating: -1 })
      .limit(limit);

    return trendingProducts;
  } catch (error) {
    console.error('Trending products error:', error);
    return [];
  }
};

/**
 * Get personalized recommendations based on user preferences
 */
const getPersonalizedRecommendations = async (userId, limit = 10) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return getTrendingProducts(limit);
    }

    let recommendations = [];

    // If user has preferences, use them
    if (user.preferences && user.preferences.categories && user.preferences.categories.length > 0) {
      const categoryRecs = await Product.find({
        category: { $in: user.preferences.categories }
      })
        .sort({ rating: -1, purchaseCount: -1 })
        .limit(Math.ceil(limit / 2));

      recommendations.push(...categoryRecs);
    }

    // Get behavior-based recommendations
    const behaviorRecs = await getRecommendations(userId, Math.ceil(limit / 2));
    recommendations.push(...behaviorRecs);

    // Remove duplicates and limit
    const seen = new Set();
    const finalRecs = [];
    for (const product of recommendations) {
      const id = product._id.toString();
      if (!seen.has(id)) {
        seen.add(id);
        finalRecs.push(product);
        if (finalRecs.length === limit) break;
      }
    }

    return finalRecs;
  } catch (error) {
    console.error('Personalized recommendations error:', error);
    return getTrendingProducts(limit);
  }
};

module.exports = {
  getRecommendations,
  getTrendingProducts,
  getPersonalizedRecommendations,
  collaborativeFiltering,
  contentBasedFiltering
};

const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/Product');

const seedProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life',
    price: 4999,
    originalPrice: 7999,
    category: 'Electronics',
    brand: 'SoundPro',
    rating: 4.5,
    reviews: [],
    inventory: { stock: 50, lastRestocked: new Date() },
    features: ['Noise Cancellation', 'Bluetooth 5.0', '30-hour battery', 'Foldable design'],
    images: ['https://via.placeholder.com/300?text=Headphones'],
    tags: ['audio', 'wireless', 'headphones'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking, GPS, and 7-day battery',
    price: 8999,
    originalPrice: 14999,
    category: 'Electronics',
    brand: 'TechWear',
    rating: 4.7,
    reviews: [],
    inventory: { stock: 30, lastRestocked: new Date() },
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'AMOLED Display'],
    images: ['https://via.placeholder.com/300?text=SmartWatch'],
    tags: ['smartwatch', 'fitness', 'wearable'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip eco-friendly yoga mat 6mm thick with carrying strap',
    price: 1499,
    originalPrice: 2499,
    category: 'Sports',
    brand: 'FitLife',
    rating: 4.6,
    reviews: [],
    inventory: { stock: 100, lastRestocked: new Date() },
    features: ['6mm Thickness', 'Non-slip', 'Eco-friendly', 'Carrying Strap'],
    images: ['https://via.placeholder.com/300?text=YogaMat'],
    tags: ['yoga', 'fitness', 'mat'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight breathable running shoes with cushioned sole and ankle support',
    price: 3999,
    originalPrice: 6999,
    category: 'Sports',
    brand: 'SpeedFit',
    rating: 4.4,
    reviews: [],
    inventory: { stock: 60, lastRestocked: new Date() },
    features: ['Lightweight', 'Breathable', 'Cushioned Sole', 'Ankle Support'],
    images: ['https://via.placeholder.com/300?text=RunningShoes'],
    tags: ['shoes', 'running', 'sports'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Fiction Novel - The Last Journey',
    description: 'Bestselling fiction novel with gripping storyline and award-winning writing',
    price: 399,
    originalPrice: 599,
    category: 'Books',
    brand: 'BookWorks',
    rating: 4.8,
    reviews: [],
    inventory: { stock: 200, lastRestocked: new Date() },
    features: ['Hardcover', '480 Pages', 'Award Winner', 'Bestseller'],
    images: ['https://via.placeholder.com/300?text=Novel'],
    tags: ['book', 'fiction', 'novel'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Automatic coffee maker with programmable timer and thermal carafe',
    price: 2499,
    originalPrice: 3999,
    category: 'Home & Garden',
    brand: 'BrewMaster',
    rating: 4.5,
    reviews: [],
    inventory: { stock: 40, lastRestocked: new Date() },
    features: ['Programmable Timer', 'Thermal Carafe', 'Auto Shut-off', 'Brew Strength Control'],
    images: ['https://via.placeholder.com/300?text=CoffeeMaker'],
    tags: ['coffee', 'appliance', 'home'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Casual Denim Jeans',
    description: 'Premium blue denim jeans with comfortable fit and stylish design',
    price: 1799,
    originalPrice: 3499,
    category: 'Fashion',
    brand: 'DenimPro',
    rating: 4.3,
    reviews: [],
    inventory: { stock: 120, lastRestocked: new Date() },
    features: ['Premium Denim', 'Comfortable Fit', 'Stylish Design', 'Durable'],
    images: ['https://via.placeholder.com/300?text=Jeans'],
    tags: ['jeans', 'fashion', 'clothing'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Kids Building Blocks Set',
    description: 'Educational LEGO-style building blocks with 1000+ pieces for creative play',
    price: 1299,
    originalPrice: 1999,
    category: 'Toys',
    brand: 'BuildWorld',
    rating: 4.9,
    reviews: [],
    inventory: { stock: 80, lastRestocked: new Date() },
    features: ['1000+ Pieces', 'Educational', 'Safe Materials', 'Creative Building'],
    images: ['https://via.placeholder.com/300?text=Blocks'],
    tags: ['toys', 'kids', 'building'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Organic Face Moisturizer',
    description: 'Natural organic face moisturizer with jojoba oil and vitamin E',
    price: 899,
    originalPrice: 1499,
    category: 'Beauty',
    brand: 'SkinCare+',
    rating: 4.6,
    reviews: [],
    inventory: { stock: 150, lastRestocked: new Date() },
    features: ['Organic', 'Jojoba Oil', 'Vitamin E', 'Non-greasy'],
    images: ['https://via.placeholder.com/300?text=Moisturizer'],
    tags: ['skincare', 'beauty', 'moisturizer'],
    viewCount: 0,
    purchaseCount: 0
  },
  {
    name: 'Organic Energy Bars',
    description: 'Pack of 12 organic energy bars with nuts and dried fruits, no artificial sweeteners',
    price: 599,
    originalPrice: 899,
    category: 'Food',
    brand: 'HealthyEats',
    rating: 4.4,
    reviews: [],
    inventory: { stock: 200, lastRestocked: new Date() },
    features: ['Organic', 'No Artificial Sweeteners', 'High Protein', 'Pack of 12'],
    images: ['https://via.placeholder.com/300?text=EnergyBars'],
    tags: ['food', 'snacks', 'energy'],
    viewCount: 0,
    purchaseCount: 0
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quickshop', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');

    // Delete existing products
    await Product.deleteMany({});
    console.log('Cleaned existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(seedProducts);
    console.log(`✅ Successfully added ${insertedProducts.length} products to the database!`);
    console.log('\n📦 Products added:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

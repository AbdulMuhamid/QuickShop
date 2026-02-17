// Sample data seeding script - save as backend/scripts/seedData.js
// Run with: node scripts/seedData.js

const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const User = require('../src/models/User');

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality sound with noise cancellation",
    price: 199.99,
    originalPrice: 299.99,
    category: "Electronics",
    brand: "TechSound",
    rating: 4.5,
    features: ["Noise Cancellation", "30-hour Battery", "Bluetooth 5.0"],
    images: ["https://via.placeholder.com/500?text=Headphones"],
    tags: ["wireless", "bluetooth", "audio"],
    stock: 50
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip eco-friendly yoga mat",
    price: 49.99,
    originalPrice: 79.99,
    category: "Sports",
    brand: "FitLife",
    rating: 4.8,
    features: ["Eco-friendly", "Non-slip", "Portable"],
    images: ["https://via.placeholder.com/500?text=YogaMat"],
    tags: ["yoga", "sports", "fitness"],
    stock: 100
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Keep drinks hot for 24 hours or cold for 48 hours",
    price: 34.99,
    originalPrice: 49.99,
    category: "Home & Garden",
    brand: "HydroKeep",
    rating: 4.3,
    features: ["Double-walled", "Eco-friendly", "Leak-proof"],
    images: ["https://via.placeholder.com/500?text=WaterBottle"],
    tags: ["bottle", "water", "eco"],
    stock: 200
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable clothing",
    price: 29.99,
    category: "Fashion",
    brand: "EcoWear",
    rating: 4.6,
    features: ["Organic Cotton", "Sustainable", "Soft"],
    images: ["https://via.placeholder.com/500?text=TShirt"],
    tags: ["clothing", "organic", "fashion"],
    stock: 150
  },
  {
    name: "Python Programming Book",
    description: "Learn Python from basics to advanced",
    price: 39.99,
    originalPrice: 59.99,
    category: "Books",
    brand: "TechPublishers",
    rating: 4.7,
    features: ["500+ pages", "Code examples", "Exercises"],
    images: ["https://via.placeholder.com/500?text=Book"],
    tags: ["python", "programming", "learning"],
    stock: 75
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable brightness desk lamp with USB charging",
    price: 44.99,
    category: "Electronics",
    brand: "LightWorks",
    rating: 4.4,
    features: ["USB Charging", "Adjustable", "LED"],
    images: ["https://via.placeholder.com/500?text=Lamp"],
    tags: ["lamp", "light", "desk"],
    stock: 60
  },
  {
    name: "Digital Kitchen Scale",
    description: "Accurate food scale for cooking and baking",
    price: 24.99,
    originalPrice: 39.99,
    category: "Home & Garden",
    brand: "PrecisionKitchen",
    rating: 4.5,
    features: ["Accurate", "Digital display", "Tare function"],
    images: ["https://via.placeholder.com/500?text=Scale"],
    tags: ["kitchen", "scale", "cooking"],
    stock: 80
  },
  {
    name: "Phone Stand",
    description: "Adjustable phone stand for all devices",
    price: 14.99,
    category: "Electronics",
    brand: "PhonePro",
    rating: 4.2,
    features: ["Adjustable", "Stable", "Universal"],
    images: ["https://via.placeholder.com/500?text=PhoneStand"],
    tags: ["phone", "stand", "accessories"],
    stock: 200
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker for perfect brew",
    price: 89.99,
    originalPrice: 129.99,
    category: "Home & Garden",
    brand: "BrewMaster",
    rating: 4.6,
    features: ["Programmable", "Auto-shutoff", "12-cup capacity"],
    images: ["https://via.placeholder.com/500?text=CoffeeMaker"],
    tags: ["coffee", "kitchen", "appliance"],
    stock: 40
  },
  {
    name: "Fitness Tracker Watch",
    description: "Monitor your health and fitness with this smartwatch",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    brand: "FitTech",
    rating: 4.7,
    features: ["Heart Rate Monitor", "Sleep Tracking", "Water Resistant"],
    images: ["https://via.placeholder.com/500?text=FitnessTracker"],
    tags: ["fitness", "watch", "health"],
    stock: 45
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quickshop');
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`✓ Created ${createdProducts.length} products`);
    
    // Create sample users
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123"
      }
    ];
    
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);
    
    console.log('\n✓ Database seeding complete!');
    console.log('\nTest credentials:');
    console.log('Email: john@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

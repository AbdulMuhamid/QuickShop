# QuickShop - AI-Powered E-Commerce Recommendation System

## Project Overview

QuickShop is a full-stack e-commerce application that leverages AI and machine learning to provide personalized product recommendations. The platform uses collaborative filtering and content-based filtering algorithms to suggest products based on user behavior, preferences, and browsing history.

### Key Features

- **Personalized Product Recommendations**: AI-driven suggestions based on user behavior
- **Smart Search & Filtering**: Advanced search with price range, category, and brand filters
- **User Behavior Tracking**: Continuous monitoring of user interactions for improved recommendations
- **Wishlist Management**: Save favorite products for later
- **Email Notifications**: Personalized offers and product alerts
- **User Authentication**: Secure registration and login system
- **Trending Products**: View trending and popular items

## Technology Stack

### Backend
- **Node.js & Express.js**: REST API server
- **MongoDB**: Document database for storing user data and products
- **JWT**: Authentication and authorization
- **Nodemailer**: Email notifications

### Frontend
- **React.js**: Dynamic user interface
- **React Router**: Client-side navigation
- **Axios**: HTTP client for API communication
- **CSS Modules**: Scoped styling

### AI/ML Features
- **Collaborative Filtering**: Recommends products based on similar users
- **Content-Based Filtering**: Suggests products based on attributes
- **Hybrid Approach**: Combines both algorithms for better recommendations

## Project Structure

```
QuickShop/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic & AI algorithms
│   │   └── utils/           # Utility functions
│   ├── package.json
│   ├── server.js            # Entry point
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── docs/
    ├── README.md
    ├── ARCHITECTURE.md
    ├── API_DOCUMENTATION.md
    └── SETUP_GUIDE.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd QuickShop/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configurations:
```
MONGODB_URI=mongodb://localhost:27017/quickshop
JWT_SECRET=your_secret_key_here
PORT=5000
MAIL_SERVICE=gmail
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

5. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd QuickShop/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - List all products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Recommendations
- `GET /api/recommendations/personalized` - Get personalized recommendations
- `GET /api/recommendations/trending` - Get trending products

### User Profile
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `POST /api/users/wishlist` - Add to wishlist
- `DELETE /api/users/wishlist` - Remove from wishlist
- `GET /api/users/orders` - Get user orders

### Behavior Tracking
- `POST /api/behavior` - Track user action
- `GET /api/behavior` - Get user behavior history

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications/offer` - Send personalized offer
- `PATCH /api/notifications/:notificationId` - Mark as read
- `DELETE /api/notifications/:notificationId` - Delete notification

## AI Recommendation Algorithm

### Collaborative Filtering
Analyzes user behavior patterns to find similar users and recommend products they liked:
1. Find users with similar browsing/purchase history
2. Identify products viewed by similar users
3. Recommend those products to the current user

### Content-Based Filtering
Suggests similar products based on product attributes:
1. Analyze user's viewed/purchased products
2. Build user preference profile (categories, price range, brands)
3. Find products matching user preferences
4. Score products based on similarity

### Hybrid Approach
Combines both algorithms with weighted scoring:
- Collaborative recommendations: Higher weight
- Content-based recommendations: Supporting weight
- Final ranking based on combined scores

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (customer/admin),
  preferences: {
    categories: [String],
    priceRange: { min, max },
    brands: [String]
  },
  purchases: [OrderId],
  wishlist: [ProductId],
  notificationPreferences: {
    email: Boolean,
    push: Boolean,
    sms: Boolean
  }
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  brand: String,
  rating: Number,
  reviews: [{ userId, comment, rating }],
  inventory: { stock, lastRestocked },
  viewCount: Number,
  purchaseCount: Number
}
```

### Behavior Model
```javascript
{
  userId: ObjectId,
  actionType: String (view/click/add_to_cart/purchase/search),
  productId: ObjectId,
  timestamp: Date,
  sessionId: String,
  duration: Number
}
```

## Success Metrics

The application tracks success through:
- **Conversion Rate**: ≥15% increase in sales from recommendations
- **Customer Retention**: ≥20% increase in repeat visits
- **User Satisfaction**: ≥4.5/5 rating score
- **recommendation Accuracy**: CTR improvement on recommended products

## Development Workflow

1. Create a new branch for features
2. Make changes and test locally
3. Commit with clear messages
4. Open pull request for review
5. Merge to main after approval

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify firewall settings

### Authentication Errors
- Verify JWT_SECRET is set
- Check token expiration
- Clear browser localStorage if needed

### API Not Responding
- Verify backend server is running on correct port
- Check CORS configuration
- Verify API URL in frontend .env

## Future Enhancements

- [ ] Social features (reviews, ratings)
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
- [ ] Payment gateway integration
- [ ] Mobile app development
- [ ] Real-time notifications with WebSockets
- [ ] Advanced ML models (TensorFlow.js)
- [ ] Multi-language support

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@quickshop.com or open an issue on GitHub.

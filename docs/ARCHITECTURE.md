# ARCHITECTURE.md - System Design & Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React Frontend (Port 3000)                              │   │
│  │  - Components, Pages, Authentication                    │   │
│  │  - State Management (Context API)                       │   │
│  │  - API Client (Axios)                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬──────────────────────────────────────────┘
                         │
                    HTTP/REST
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                      Server Layer                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Node.js/Express Server (Port 5000)                      │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Middleware Layer                                   │ │   │
│  │  │  - Authentication (JWT)                            │ │   │
│  │  │  - Request Logging                                 │ │   │
│  │  │  - CORS                                            │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Router Layer                                       │ │   │
│  │  │  - /auth, /products, /users, /recommendations      │ │   │
│  │  │  - /behavior, /notifications                       │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Controller Layer                                   │ │   │
│  │  │  - Request handling & validation                   │ │   │
│  │  │  - Response formatting                             │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Service Layer                                      │ │   │
│  │  │  - Business logic                                   │ │   │
│  │  │  - AI/ML algorithms                                │ │   │
│  │  │  - Email notifications                             │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Model Layer (Mongoose)                            │ │   │
│  │  │  - User, Product, Order, Behavior, Notification   │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬──────────────────────────────────────────┘
                         │
                    MongoDB Protocol
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                     Data Layer                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  MongoDB Database (NoSQL)                                │   │
│  │  - Users Collection                                      │   │
│  │  - Products Collection                                   │   │
│  │  - Orders Collection                                     │   │
│  │  - Behavior Collection (User Actions)                   │   │
│  │  - Notifications Collection                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Structure

```
frontend/
├── components/              # Reusable React components
│   ├── Navigation.js       # Navbar component
│   ├── ProductCard.js      # Individual product card
│   ├── ProductGrid.js      # Product grid layout
│   ├── SearchBar.js        # Search and filtering
│   ├── AuthForm.js         # Login/Register form
│   └── Toast.js            # Notification toast
├── context/                # React Context for state
│   └── AuthContext.js      # Authentication state
├── pages/                  # Page-level components
│   ├── Home.js
│   ├── Products.js
│   ├── Recommendations.js
│   ├── Login.js
│   ├── Register.js
│   ├── Profile.js
│   ├── Wishlist.js
│   ├── Cart.js
│   └── Notifications.js
├── services/               # API communication
│   └── api.js             # Axios instance & endpoints
└── App.js                 # Main app component
```

### Backend Structure

```
backend/
├── src/
│   ├── config/            # Configuration
│   ├── controllers/       # Route handlers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── behaviorController.js
│   │   ├── recommendationController.js
│   │   └── notificationController.js
│   ├── middleware/        # Express middleware
│   │   ├── auth.js       # JWT authentication
│   │   └── logger.js     # Request logging
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Behavior.js
│   │   └── Notification.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── behavior.js
│   │   ├── recommendations.js
│   │   └── notifications.js
│   ├── services/          # Business logic
│   │   ├── recommendationService.js  # AI algorithms
│   │   └── notificationService.js    # Email & alerts
│   └── utils/             # Utilities
└── server.js             # Entry point
```

## Data Flow Diagrams

### User Registration Flow
```
1. User fills registration form
   ↓
2. Frontend sends POST to /auth/register
   ↓
3. Backend validates input
   ↓
4. Password is hashed with bcrypt
   ↓
5. User record created in MongoDB
   ↓
6. JWT token generated
   ↓
7. Response sent with token to frontend
   ↓
8. Frontend stores token in localStorage
   ↓
9. User redirected to dashboard
```

### Product Recommendation Flow
```
1. User browses products
   ↓
2. Frontend sends behavior tracking event
   ↓
3. Backend stores in Behavior collection
   ↓
4. User requests recommendations
   ↓
5. Backend executes:
   a) Collaborative filtering algorithm
   b) Content-based filtering algorithm
   ↓
6. Algorithms analyze:
   - User behavior history
   - Similar users' actions
   - Product attributes
   ↓
7. Results combined & scored
   ↓
8. Top recommendations returned to frontend
   ↓
9. Frontend displays in UI
```

### Notification Flow
```
1. System identifies eligible user
   ↓
2. Recommendation/Offer criteria met
   ↓
3. Notification service creates record
   ↓
4. Email template generated
   ↓
5. Nodemailer sends email
   ↓
6. Notification marked as sent
   ↓
7. User receives in inbox
   ↓
8. Frontend displays in notifications page
```

## AI/ML Algorithm Details

### Collaborative Filtering

**Algorithm:**
```
1. Get user's viewed/purchased products
2. Find users who viewed similar products
3. Calculate similarity score
   - More products in common = higher score
4. Get products viewed by similar users
   - But NOT by current user
5. Rank by frequency among similar users
6. Return top N recommendations
```

**Time Complexity:** O(n²) where n = number of users
**Space Complexity:** O(n*m) where m = products viewed per user

### Content-Based Filtering

**Algorithm:**
```
1. Build user preference profile:
   - Categories of viewed products
   - Average price point
   - Popular brands
   - Rating preferences
2. Find products matching profile
3. Score each product:
   - Category match: +2 points
   - Brand match: +1 point
   - Price range: scoring based on distance
   - Rating: +0.5 × rating
4. Filter out already viewed products
5. Return top N scored products
```

**Time Complexity:** O(m log m) where m = number of products
**Space Complexity:** O(m)

### Hybrid Recommendation

**Algorithm:**
```
1. Get collaborative filtering results (score × 2)
2. Get content-based results (score × 1)
3. Merge results (remove duplicates)
4. Combine scores: final_score = collab_score × 2 + content_score × 1
5. Sort by combined score
6. Return top N results
```

## Authentication Flow

```
1. User logs in with email/password
   ↓
2. Backend validates against hashed password
   ↓
3. JWT generated with user ID as payload
   ↓
4. Token sent to frontend
   ↓
5. Frontend stores in localStorage
   ↓
6. For protected routes: Token sent in Authorization header
   ↓
7. Backend middleware verifies token
   ↓
8. User ID extracted from token
   ↓
9. Request processed with user context
```

## Database Indexing Strategy

```javascript
// User Collection
db.users.createIndex({ "email": 1 })  // For login queries
db.users.createIndex({ "role": 1 })   // For admin filtering

// Product Collection
db.products.createIndex({ "category": 1 })
db.products.createIndex({ "price": 1 })
db.products.createIndex(
  { "name": "text", "description": "text" }
)  // For full-text search

// Behavior Collection
db.behavior.createIndex({ "userId": 1, "timestamp": -1 })
db.behavior.createIndex({ "productId": 1 })
db.behavior.createIndex({ "actionType": 1 })
```

## Scalability Considerations

### Current MVP Limitations
- In-memory recommendation calculations
- No distributed caching
- Single MongoDB instance
- Synchronous email sending

### Future Improvements
1. **Caching Layer**
   - Redis for frequently accessed data
   - Cache recommendation results
   
2. **Message Queue**
   - Bull/RabbitMQ for email sending
   - Async notification processing

3. **Distributed System**
   - Load balancer for multiple servers
   - Microservices architecture

4. **Advanced ML**
   - Pre-compute recommendations periodically
   - Use TensorFlow for neural networks
   - Train models on historical data

## Security Measures

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Never store plaintext passwords

2. **API Security**
   - JWT token authentication
   - Protected endpoints require valid token
   - Token expiration (7 days default)

3. **Data Validation**
   - Input validation on all endpoints
   - Email format validation
   - Type checking

4. **CORS**
   - Only allow requests from frontend URL
   - Protect against cross-origin attacks

## Performance Optimization

1. **Database Queries**
   - Indexed lookups for fast retrieval
   - Pagination to limit data transfer

2. **API Responses**
   - Only return necessary fields
   - Implement response compression

3. **Frontend Optimization**
   - Component memoization
   - Lazy loading for images
   - Code splitting with React Router

## Deployment Considerations

- **Backend**: Node.js server with PM2 process manager
- **Frontend**: Static hosting (Vercel, Netlify)
- **Database**: MongoDB Atlas cloud service
- **Email**: Gmail SMTP or SendGrid
- **Monitoring**: Application logging and error tracking

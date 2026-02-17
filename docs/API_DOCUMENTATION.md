# API DOCUMENTATION

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## Product Endpoints

### Get All Products
```http
GET /api/products?category=Electronics&minPrice=50&maxPrice=500&page=1&limit=20
```

**Query Parameters:**
- `category`: Filter by category
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `search`: Search query
- `page`: Page number
- `limit`: Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "count": 12,
  "total": 150,
  "page": 1,
  "pages": 13,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "price": 199.99,
      "category": "Electronics",
      "rating": 4.5,
      "viewCount": 250,
      "purchaseCount": 45
    }
  ]
}
```

### Get Product Details
```http
GET /api/products/507f1f77bcf86cd799439011
Authorization: Bearer <token>
```

## Recommendation Endpoints

### Get Personalized Recommendations
```http
GET /api/recommendations/personalized
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "USB-C Cable",
      "price": 29.99,
      "category": "Electronics",
      "rating": 4.8
    }
  ]
}
```

### Get Trending Products
```http
GET /api/recommendations/trending?limit=10
```

## User Endpoints

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "categories": ["Electronics", "Books"],
      "priceRange": { "min": 0, "max": 1000 }
    },
    "wishlist": [...],
    "purchases": [...]
  }
}
```

### Update User Profile
```http
PATCH /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "preferences": {
    "categories": ["Electronics", "Fashion"],
    "priceRange": { "min": 50, "max": 500 }
  }
}
```

### Add to Wishlist
```http
POST /api/users/wishlist
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439012"
}
```

### Remove from Wishlist
```http
DELETE /api/users/wishlist
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439012"
}
```

## Behavior Tracking Endpoints

### Track User Action
```http
POST /api/behavior
Authorization: Bearer <token>
Content-Type: application/json

{
  "actionType": "view",
  "productId": "507f1f77bcf86cd799439012",
  "duration": 45
}
```

**actionType Values:**
- `view`: Product viewed
- `click`: Product clicked
- `add_to_cart`: Added to shopping cart
- `remove_from_cart`: Removed from cart
- `purchase`: Product purchased
- `search`: Search performed
- `filter`: Filters applied

### Get User Behavior History
```http
GET /api/behavior?actionType=view&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

**Query Parameters:**
- `actionType`: Filter by action type
- `startDate`: Start date for range
- `endDate`: End date for range

## Notification Endpoints

### Get Notifications
```http
GET /api/notifications?unreadOnly=false
Authorization: Bearer <token>
```

### Send Personalized Offer
```http
POST /api/notifications/offer
Authorization: Bearer <token>
Content-Type: application/json

{
  "discount": 20,
  "productIds": ["507f1f77bcf86cd799439012"]
}
```

### Mark Notification as Read
```http
PATCH /api/notifications/507f1f77bcf86cd799439012
Authorization: Bearer <token>
```

### Delete Notification
```http
DELETE /api/notifications/507f1f77bcf86cd799439012
Authorization: Bearer <token>
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error",
  "error": "Detailed error message"
}
```

## Authentication Headers

All protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

Obtain token from registration or login endpoint.

## Rate Limiting

No strict rate limiting implemented in MVP version. Implement in production.

## Response Codes

- `200 OK`: Request successful
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication required
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

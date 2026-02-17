# QUICKSTART.md - QuickShop Setup Guide

## 🚀 Quick Start (5 minutes)

### Option 1: Using npm scripts

#### Start Backend
```bash
cd backend
npm install
npm start
# Backend will run on http://localhost:5000
```

#### Start Frontend (new terminal)
```bash
cd frontend
npm install
npm start
# Frontend will run on http://localhost:3000
```

### Option 2: Development with Auto-reload

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

## 📋 Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] npm or yarn available
- [ ] Git installed

## 🔧 Configuration

### Backend (.env)
Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/quickshop
JWT_SECRET=your_secret_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Test the Application

### Create Test User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

### Create Sample Products
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Premium noise-canceling headphones",
    "price": 199.99,
    "category": "Electronics",
    "brand": "SoundMax",
    "stock": 50
  }'
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📱 Key Features to Try

1. **Register/Login**: Create account and login
2. **Browse Products**: Explore product catalog
3. **Get Recommendations**: View personalized recommendations
4. **Add to Wishlist**: Save favorite products
5. **View Notifications**: Check personalized offers

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Ensure MongoDB is running: `mongod` |
| Port 5000 in use | Change PORT in .env |
| CORS errors | Check FRONTEND_URL in backend .env |
| Import errors | Run `npm install` in relevant folder |

## 📚 Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Check [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for API reference
- View [DEVELOPMENT.md](DEVELOPMENT.md) for development guidelines

## ✨ Pro Tips

- Use dev tools to monitor API calls in browser
- Check browser console for frontend errors
- Check terminal for backend logs
- Use Postman for API testing
- Use MongoDB Compass for database visualization

## 🆘 Need Help?

1. Check logs for error messages
2. Verify all prerequisites are installed
3. Ensure .env files are properly configured
4. Check that ports 3000 and 5000 are available

---

**Happy coding! 🎉**

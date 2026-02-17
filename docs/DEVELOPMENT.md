# DEVELOPMENT.md - Development Guidelines

## Development Setup

### Tools Required
- **IDE**: VS Code recommended
- **Database**: MongoDB Community/Atlas
- **API Testing**: Postman or Insomnia
- **Version Control**: Git

### Environment Variables

**Backend (.env)**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/quickshop

# JWT
JWT_SECRET=dev_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email (Gmail)
MAIL_SERVICE=gmail
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_specific_password

# External Services
AI_SERVICE_URL=http://localhost:5001
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEBUG=true
```

## Code Standards

### JavaScript/Node.js

**Naming Conventions**
- Variables/functions: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private variables: _privateVar

**Code Style**
- Use 2-space indentation
- Use const/let, avoid var
- Use template literals for strings
- Use arrow functions for callbacks

**Example:**
```javascript
// Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Good
class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserById(id) {
    return this.userModel.findById(id);
  }
}
```

### React

**Component Structure**
```javascript
// Functional component with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  const handleAction = () => {
    // Handler logic
  };

  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

**File Structure**
- One component per file
- Component name matches file name
- CSS modules for styling
- Props validation/documentation

### MongoDB & Mongoose

**Schema Definition**
```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  // ... more fields
}, {
  timestamps: true
});

// Add methods and middleware
userSchema.pre('save', async function(next) {
  // Pre-save hook
});
```

## Testing

### Backend Testing

**Unit Tests Example:**
```javascript
// test/userService.test.js
const UserService = require('../src/services/userService');

describe('UserService', () => {
  test('should hash password before saving', async () => {
    const user = { password: 'plaintext' };
    const hashed = await UserService.hashPassword(user.password);
    expect(hashed).not.toEqual(user.password);
  });
});
```

**Run Tests**
```bash
npm test
```

### Frontend Testing

**Component Tests Example:**
```javascript
// test/ProductCard.test.js
import { render, screen } from '@testing-library/react';
import ProductCard from '../src/components/ProductCard';

describe('ProductCard', () => {
  test('should render product name', () => {
    const product = { name: 'Test', price: 99 };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Git Workflow

### Branch Naming
- Feature: `feature/feature-name`
- Fix: `fix/issue-name`
- Docs: `docs/doc-name`

### Commit Messages
```
Format: <type>: <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Code refactoring
- test: Adding tests
- chore: Build/dependency updates

Example:
feat: add collaborative filtering algorithm
fix: resolve JWT token expiration issue
docs: update API documentation
```

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes and commit regularly
3. Push to branch
4. Create pull request with description
5. Request review from team members
6. Address review comments
7. Merge after approval

## Debugging Tips

### Backend Debugging

**Using console.log**
```javascript
console.log('Debug info:', { userId, timestamp });
```

**Using Node debugger**
```bash
node --inspect server.js
# Open chrome://inspect
```

**Using VS Code Debugger**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/server.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

### Frontend Debugging

**React DevTools**
- Install React DevTools extension
- Inspect component props and state
- Track component re-renders

**Network Tab**
- Monitor API requests
- Check request/response payloads
- Verify status codes

**Browser Console**
- Check for JavaScript errors
- Log debug information
- Test API calls with fetch

## Performance Optimization

### Backend
1. **Database Queries**
   ```javascript
   // Good - uses indexes
   const user = await User.findOne({ email });
   
   // Avoid - full collection scan
   const user = await User.find({ name: 'John' });
   ```

2. **Pagination**
   ```javascript
   const page = req.query.page || 1;
   const limit = 20;
   const skip = (page - 1) * limit;
   const products = await Product.find().skip(skip).limit(limit);
   ```

3. **Select specific fields**
   ```javascript
   // Good - fetch only needed fields
   const user = await User.findById(id).select('name email');
   ```

### Frontend
1. **Memoization**
   ```javascript
   const MemoComponent = React.memo(({ data }) => {
     return <div>{data}</div>;
   });
   ```

2. **Lazy Loading**
   ```javascript
   import { lazy, Suspense } from 'react';
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   <Suspense fallback={<Spinner />}>
     <HeavyComponent />
   </Suspense>
   ```

## Logging and Monitoring

### Backend Logging
```javascript
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
};

app.use(logger);
```

### Error Tracking
```javascript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date()
  });
}
```

## CI/CD Pipeline (Future)

```yaml
# .github/workflows/ci.yml
name: CI/CD

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npm run lint
```

## Documentation Standards

### JSDoc Comments
```javascript
/**
 * Calculates product recommendations for a user
 * @param {string} userId - User ID
 * @param {number} limit - Number of recommendations
 * @returns {Promise<Array>} Array of recommended products
 * @throws {Error} If user not found
 */
async function getRecommendations(userId, limit = 10) {
  // Implementation
}
```

### README Files
Each major component should have a README:
```
# ProductService

## Overview
Handles all product-related business logic

## Methods
- `getAll()` - Get all products
- `getById(id)` - Get product by ID
- `create(data)` - Create new product

## Example
```

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS errors | Frontend URL not in whitelist | Add to FRONTEND_URL in .env |
| MongoDB connection fails | MongoDB not running | Start MongoDB: `mongod` |
| Cannot find module | Dependencies not installed | Run `npm install` |
| Token expired errors | Old token in localStorage | Clear localStorage and re-login |
| Port already in use | Another app using port | Change PORT in .env |

## Best Practices

✅ **Do**
- Write self-documenting code
- Test before pushing
- Use meaningful variable names
- Keep functions small and focused
- Handle errors gracefully
- Use environment variables for configs

❌ **Don't**
- Commit secrets or API keys
- Push to main without testing
- Use console.log for production logging
- Ignore error handling
- Create functions with many parameters
- Use any-type in TypeScript (if added)

## Resources

- **Express.js Docs**: https://expressjs.com
- **Mongoose Docs**: https://mongoosejs.com
- **React Docs**: https://react.dev
- **MongoDB Docs**: https://docs.mongodb.com
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

## Getting Help

1. Check existing issues on GitHub
2. Search documentation first
3. Ask in team Slack channel
4. Create detailed issue with logs
5. Pair program with team member

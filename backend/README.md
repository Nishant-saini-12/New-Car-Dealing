# CarDealing Backend API

Express.js REST API with MongoDB and JWT authentication.

## Quick Start

```bash
# Install dependencies
npm install

# Start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community

# Start server
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user

### User (Protected)
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile

## Environment Variables

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cardealing
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## Tech Stack

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests

## Project Structure

```
backend/
├── server.js           # Entry point
├── config/
│   └── database.js     # MongoDB connection
├── models/
│   └── User.js         # User schema
├── controllers/
│   └── authController.js  # Auth logic
├── middleware/
│   └── auth.js         # JWT verification
└── routes/
    └── authRoutes.js   # API routes
```

## License

ISC

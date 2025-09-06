# Backend API

A simple Express.js backend API with user management and authentication endpoints.

## Features

- ✅ Express.js server with middleware
- ✅ User CRUD operations
- ✅ Authentication endpoints (mock implementation)
- ✅ CORS enabled
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan
- ✅ Environment configuration
- ✅ Error handling
- ✅ Health check endpoint

## Project Structure

```
backend/
├── routes/
│   ├── users.js          # User management endpoints
│   └── auth.js           # Authentication endpoints
├── server.js             # Main server file
├── package.json          # Project dependencies
├── .env                  # Environment variables
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   copy .env.example .env
   ```

3. Update `.env` file with your configuration

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Health Check
- `GET /` - Welcome message
- `GET /health` - Server health status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

## Example API Requests

### Create a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## Development Notes

- This is a basic implementation with mock data
- In production, replace mock authentication with proper JWT implementation
- Add a real database (MongoDB, PostgreSQL, etc.)
- Implement proper password hashing (bcrypt)
- Add input validation middleware
- Add rate limiting
- Add API documentation (Swagger)
- Add unit tests

## Security Considerations

- Environment variables for sensitive data
- Helmet.js for security headers
- CORS configuration
- Input validation needed for production
- Password hashing needed for production
- JWT token verification needed for production

## License

MIT

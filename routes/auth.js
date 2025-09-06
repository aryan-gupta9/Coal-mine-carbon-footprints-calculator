const express = require('express');
const router = express.Router();

// Sample authentication endpoints
// In a real app, you'd use proper password hashing and JWT tokens

// POST /api/auth/login - User login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Simple mock authentication (replace with real auth logic)
    if (email === 'admin@example.com' && password === 'password123') {
      res.json({
        success: true,
        data: {
          user: {
            id: 1,
            email: email,
            name: 'Admin User'
          },
          token: 'mock-jwt-token-' + Date.now()
        },
        message: 'Login successful'
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// POST /api/auth/register - User registration
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }
    
    // Mock user creation (replace with real database logic)
    const newUser = {
      id: Date.now(),
      name,
      email,
      created_at: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now()
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
});

// POST /api/auth/logout - User logout
router.post('/logout', (req, res) => {
  try {
    // In a real app, you'd invalidate the token
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});

// GET /api/auth/me - Get current user profile
router.get('/me', (req, res) => {
  try {
    // In a real app, you'd verify the JWT token and get user from database
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }
    
    // Mock user profile (replace with real token verification)
    res.json({
      success: true,
      data: {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile'
    });
  }
});

module.exports = router;

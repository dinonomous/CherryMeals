const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserSchema");
const { secretOrKey } = require('../config/keys');

// Middleware for extracting the token from cookies
const cookieExtractor = (req) => {
    console.log(req.cookies)
  return req && req.cookies ? req.cookies['token'] : null;
};

// Custom JWT authentication middleware
const jwtAuthMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the request cookies
    const token = cookieExtractor(req);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretOrKey);

    // Check if the user is an "external" user
    if (decoded.userType === "external") {
      return next(); // Skip user lookup for external users
    }

    // Lookup the user in the database using the id from the JWT
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not found',
      });
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware/route handler

  } catch (error) {
    console.error('JWT Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token',
      error: error.message,
    });
  }
};

module.exports = {
  jwtAuthMiddleware,
};

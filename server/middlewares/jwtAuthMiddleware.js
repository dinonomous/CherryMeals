const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserSchema");
const RestaurantModel = require("../models/RestaurantSchema"); // Add restaurant model
const { secretOrKey } = require('../config/keys');

// Middleware for extracting the token from cookies
const cookieExtractor = (req) => {
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

    // Check userType (either 'user' or 'restaurant')
    if (decoded.userType === 'user') {
      // Lookup the user in the database
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User not found',
        });
      }
      // Attach user object to request
      req.user = user;
    } else if (decoded.userType === 'restaurant') {
      // Lookup the restaurant in the database
      const restaurant = await RestaurantModel.findById(decoded.id);
      if (!restaurant) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Restaurant not found',
        });
      }
      // Attach restaurant object to request
      req.restaurant = restaurant;
    } else {
      // Invalid userType in token
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid user type',
      });
    }

    // Proceed to the next middleware/route handler
    next();

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

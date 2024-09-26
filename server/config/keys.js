// config/keys.js
require('dotenv').config(); // Load environment variables from .env

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  AWSACCESSKEYID: process.env.AWS_ACCESS_KEY_ID,
  AWSSECRETACCESSKEY: process.env.AWS_SECRET_ACCESS_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};

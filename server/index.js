const express = require("express");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const restautantAuth = require('./routes/restaurantAuth')
const RestaurantRoutes = require('./routes/RestaurantRoutes')
const HomepageRoutes = require('./routes/HomepageRoutes')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const session = require('express-session');
require("dotenv").config();

const PORT = 2560;

// Connect to the database
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration - Allow credentials and specify origin
app.use(cors({
  origin: ['http://localhost:3000', 'https://cherrymeals.vercel.app'],
  credentials: true
}));

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Routes
app.use("/api/v1/homepage", HomepageRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/auth/restaurant", restautantAuth);
app.use("/api/v1/restaurant", RestaurantRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

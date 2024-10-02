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

connectDB();

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.APP_FE_URL || 'http://localhost:3000',
  credentials: true
}));

connectDB();

// Use routes
app.use("/api/v1/homepage", HomepageRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/auth/restaurant", restautantAuth);
app.use("/api/v1/restaurant", RestaurantRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const HomepageRoutes = require('./routes/HomepageRoutes')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const PORT = 2560;

// Connect to the database
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration - Allow credentials and specify origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Routes
app.use("/api/v1/homepage", HomepageRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes); // Make sure the route name is consistent (lowercase `auth`)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const PORT = 2560;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    credentials: true, // Enable credentials
}));

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/Auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const RestaurantModel = require("../models/RestaurantSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { secretOrKey } = require("../config/keys");
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least 6 characters long",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
});

router.options("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
  });

router.post("/login", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");

    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const restaurant = await RestaurantModel.findOne({ email });
    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "No restaurant found with this email",
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password, try again",
      });
    }

    // Generate JWT token
    const payload = {
      email: restaurant.email,
      id: restaurant._id,
      userType: "restaurant", // Indicate that this is a restaurant login
    };

    const token = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV !== "development",
    };

    res.cookie("restaurantId", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Restaurant logged in successfully",
      restaurantId: restaurant._id,
      email: restaurant.email,
    });
  } catch (error) {
    console.error("Error during restaurant login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");

    const { name, email, password, phoneNumber, address } = req.body;

    const errors = [];
    if (!name || typeof name !== "string" || name.length < 3) {
      errors.push("Name must be at least 3 characters long.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push("Please provide a valid email address.");
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (
      !phoneNumber ||
      typeof phoneNumber !== "string" ||
      phoneNumber.length < 10
    ) {
      errors.push("Phone number must be at least 10 digits long.");
    }

    if (!address || typeof address !== "string" || address.length < 5) {
      errors.push("Address must be at least 5 characters long.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(" "),
      });
    }

    // Check if restaurant already exists
    const existingRestaurant = await RestaurantModel.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new restaurant
    const newRestaurant = new RestaurantModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    const savedRestaurant = await newRestaurant.save();

    return res.status(201).json({
      success: true,
      message: "Restaurant registered successfully",
      restaurant: {
        id: savedRestaurant._id,
        name: savedRestaurant.name,
        email: savedRestaurant.email,
        address: savedRestaurant.address, // Include address in response
      },
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// Restaurant logout route (unchanged)
router.post("/logout", (req, res) => {
  try {
    res.setHeader("Set-Cookie", [
      `restaurantId=; Path=/; HttpOnly; Max-Age=0; SameSite=None; Secure=true;`,
    ]);

    res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error during logout",
    });
  }
});

router.get("/checkAuth", (req, res) => {
    const token = req.cookies.restaurantId; // Get the token from cookies
  
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "User not authenticated",
      });
    }
  
    // Verify the JWT token
    jwt.verify(token, secretOrKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Token is invalid",
        });
      }
  
      // Assuming the user ID is stored in the token's payload (e.g., `decoded.userId`)
      const userId = decoded.id || decoded.userId; // Adjust according to how the token was created
  
      return res.status(200).send({
        success: true,
        message: "User is authenticated",
        userId,
        user: decoded,
      });
    });
  });

  

module.exports = router;

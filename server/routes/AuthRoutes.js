const express = require("express");
const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { secretOrKey } = require("../config/keys");
const { connectDB } = require("../config/db");
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

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phonenumber: Joi.string().min(10).required(),
  address: Joi.string().optional(),
});

router.get("/", (req, res) => {
  res.send("welcome to auth");
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
        message: error.details[0].message, // Get error message from Joi validation
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password, try again",
      });
    }

    // Generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      userType: "internal",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV !== "development",
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      email: user.email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.options("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_API_URL);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_API_URL);
    res.header("Access-Control-Allow-Credentials", "true");

    const { name, email, password, phonenumber, address } = req.body;

    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone: phonenumber,
      address,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(200).json({ exists: true });
  } else {
    return res.status(200).json({ exists: false });
  }
});

router.get("/checkAuth", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "User not authenticated",
    });
  }

  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Token is invalid",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User is authenticated",
      user: decoded,
    });
  });
});

router.post("/logout", (req, res) => {
  try {
    if (process.env.NODE_ENV === "development") {
      res.setHeader("Set-Cookie", [
        `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax;`,
      ]);
    } else {
      res.setHeader("Set-Cookie", [
        `token=; Path=/; HttpOnly; Max-Age=0; SameSite=None; Secure=true;`,
      ]);
    }

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

module.exports = router;

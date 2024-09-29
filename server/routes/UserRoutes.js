const express = require("express");
const { jwtAuthMiddleware } = require("../middlewares/jwtAuthMiddleware");
const {
  getCart,
  addIntoCart,
  updateCart,
  deleteFromCart,
} = require("../controllers/UserCart");
const { initiatePayment, validatePayment } = require("../controllers/paymentController");  // Ensure all functions are imported
const {
  createOrder,
  getUserOrders,
  getOrderById,
  deleteOrder,
} = require("../controllers/Orders.js");
const router = express.Router();

// Cart routes
router.get("/:id/cart", jwtAuthMiddleware, getCart);
router.post("/:id/cart/:foodId", jwtAuthMiddleware, addIntoCart);
router.delete("/:id/cart/:foodId", jwtAuthMiddleware, deleteFromCart);
router.put("/:id/cart", jwtAuthMiddleware, updateCart);

// Order routes
router.post("/:id/orders", createOrder);
router.get("/:id/orders", getUserOrders);
router.get("/:id/orders/:orderId", getOrderById);
router.delete("/:id/orders/:orderId", deleteOrder);

router.get("/proceed/:orderId", initiatePayment);

// Route to validate the payment after the user is redirected back
// This will validate the payment and complete the order using both orderId and merchantTransactionId
router.get("/validate/:orderId/:merchantTransactionId", validatePayment);

module.exports = router;

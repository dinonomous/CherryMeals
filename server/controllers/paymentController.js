const axios = require("axios");
const sha256 = require("sha256");
const uniqid = require("uniqid");
require("dotenv").config();
const Order = require("../models/OrderSchema");
const User = require("../models/UserSchema");

// UAT environment variables
const MERCHANT_ID = process.env.MERCHANT_ID || "PGTESTPAYUAT86";
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const APP_BE_URL = 'http://localhost:2560';
const APP_FE_URL = 'http://localhost:3000';

// Proceed to payment route (initiate payment and redirect)
const initiatePayment = async (req, res) => {
  const { orderId } = req.params;
  const { amount } = req.query;
  
  // Find order by ID
  const order = await Order.findById(orderId);
  if (!order) {
    console.error("Order not found for ID:", orderId);
    return res.status(404).json({ message: "Order not found" });
  }
  
  const userId = order.userId;

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Generate unique merchant transaction ID
    const merchantTransactionId = uniqid();

    // Payload for PhonePe API
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${APP_BE_URL}/api/v1/users/validate/${orderId}/${merchantTransactionId}`, // Redirect with both orderId and merchantTransactionId
      redirectMode: "REDIRECT",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Call PhonePe API to create payment request
    const response = await createPaymentRequest(payload);

    // Redirect user to PhonePe payment page
    res.redirect(response.data.data.instrumentResponse.redirectInfo.url);

  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ message: "Server error during payment initiation" });
  }
};


// Create payment request function
const createPaymentRequest = async (payload) => {
  const base64EncodedPayload = Buffer.from(
    JSON.stringify(payload),
    "utf8"
  ).toString("base64");

  const string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
  const sha256_val = sha256(string).toString();
  const xVerifyChecksum = `${sha256_val}###${SALT_INDEX}`;

  try {
    const response = await axios.post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      { request: base64EncodedPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Payment request error:", error);
    throw new Error("Error creating payment request");
  }
};

// Validate payment route (complete payment and order)
const validatePayment = async (req, res) => {
  const { orderId, merchantTransactionId } = req.params;

  try {
    // Check payment status using merchantTransactionId
    const paymentStatus = await checkStatusPayment(merchantTransactionId);

    if (paymentStatus.code === "PAYMENT_SUCCESS") {
      // Find the order by orderId
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      order.merchantTransactionId = merchantTransactionId;
      order.status = "Completed";
      await order.save();
      console.log(order);
      const user = await User.findById(order.userId);
      if (user) {
        user.cart = [];
        await user.save();
      } else {
        console.error("User not found for the order:", orderId);
      }
      res.redirect(`${APP_FE_URL}/user/${order.userId}/orders`);
    } else {
      res.redirect(`${APP_FE_URL}/payment/failure`);
    }
  } catch (error) {
    console.error("Payment validation error:", error);
    res.status(500).json({ message: "Error validating payment" });
  }
};



// Check payment status function
const checkStatusPayment = async (merchantTransactionId) => {
  const statusUrl = `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;

  const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}${SALT_KEY}`;
  const sha256_val = sha256(string).toString();
  const xVerifyChecksum = `${sha256_val}###${SALT_INDEX}`;

  try {
    const response = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Payment status check error:", error);
    throw new Error("Error checking payment status");
  }
};

// Complete order function (update order status)
const completeOrder = async (merchantTransactionId, order) => {
  if (!order) throw new Error("Order not found");

  order.merchantTransactionId = merchantTransactionId;
  order.status = "Completed";
  await order.save();
};

// Export routes
module.exports = {
  initiatePayment,
  validatePayment,
};

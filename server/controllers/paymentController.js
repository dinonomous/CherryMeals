const axios = require("axios");
const sha256 = require("sha256");
const uniqid = require("uniqid");
require("dotenv").config();
const Order = require('../models/OrderSchema');

const MERCHANT_ID = process.env.MERCHANT_ID;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const APP_BE_URL = process.env.APP_BE_URL;

exports.paymentApiTest = (req, res) => {
    res.send("PhonePe Integration APIs!");
};

exports.initiatePayment = async (req, res) => {
  const amount = +req.query.amount; // Amount from query
  const userId = req.query.userId; // Get user ID from query
  const restaurantId = req.query.restaurantId; // Get restaurant ID from query
  let merchantTransactionId = uniqid();

  let normalPayLoad = {
    merchantId: "PGTESTPAYUAT86", //* PHONEPE_MERCHANT_ID . Unique for each account (private)
    merchantTransactionId: "7dw88v8lepm1muuqwb",
    merchantUserId: "66f58c56dba2e5b5e04fb367",
    amount: "3248.00000000000000000000", // converting to paise
    redirectUrl: "http://localhost:3000/payment/validate/7dw88v8lepm1muuqwb",
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
  let base64EncodedPayload = bufferObj.toString("base64");

  let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
  let sha256_val = sha256(string);
  let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

  axios
    .post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      {
        request: base64EncodedPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    )
    .then(function (response) {
      console.log("response->", JSON.stringify(response.data));
      res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
    })
    .catch(function (error) {
      res.send(error);
    });
}



exports.checkStatusPayment = async (req, res) => {
  const { merchantTransactionId } = req.params;

  if (merchantTransactionId) {
    let statusUrl =
      `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId;

    let string =
      `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    try {
      const response = await axios.get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      });

      console.log("response->", response.data);
      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        // Update the order status in the database
        await Order.updateOne(
          { merchantTransactionId: merchantTransactionId },
          { status: "COMPLETED" } // Update status accordingly
        );

        res.status(200).json({ message: "Payment successful", details: response.data });
      } else {
        res.status(400).json({ message: "Payment not successful", details: response.data });
      }
    } catch (error) {
      console.error("Payment status check error:", error);
      res.status(500).json({ message: "Server error while checking payment status" });
    }
  } else {
    res.status(400).json({ message: "Missing merchant transaction ID" });
  }
}

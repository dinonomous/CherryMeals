const express = require('express');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuthMiddleware');
const { getCart, addIntoCart, updateCart, deleteFromCart } = require('../controllers/UserCart');
const { paymentApiTest,initiatePayment, checkStatusPayment } = require("../controllers/paymentController.js");
const { createOrder, getUserOrders, getOrderById, deleteOrder } = require('../controllers/Orders.js');

const router = express.Router();

router.get("/:id",  );

// for users cart 

router.get("/:id/cart", jwtAuthMiddleware , getCart);
router.post("/:id/cart/:foodId" ,jwtAuthMiddleware, addIntoCart);
router.delete("/:id/cart/:foodId", jwtAuthMiddleware, deleteFromCart);
router.put("/:id/cart", jwtAuthMiddleware, updateCart);

router.post('/:id/orders' , createOrder);
router.get('/:id/orders' , getUserOrders);
router.get('/:id/orders/:orderId' , getOrderById);
router.delete('/:id/orders/:orderId', deleteOrder);

router.get('/payment', paymentApiTest);
router.get('/pay', initiatePayment);
router.get('/validate/:merchantTransactionId', checkStatusPayment);
router.get('/payment/status', async (req, res) => {
    const { transactionId } = req.query;
  
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is missing' });
    }
  
    // Call the payment provider's API to verify payment status
    const paymentStatus = await checkStatusPayment(transactionId);
  
    if (paymentStatus === 'SUCCESS') {
      // Complete the order process and store in database
      const orderData = req.session.orderData;
      if (orderData) {
        const newOrder = await Order.create(orderData);
        res.status(200).json({ message: 'Order created successfully', order: newOrder });
      } else {
        res.status(400).json({ message: 'Order data missing' });
      }
    } else {
      res.status(400).json({ message: 'Payment failed or pending' });
    }
  });
  

module.exports = router;
const User = require("../models/UserSchema");
const Order = require("../models/OrderSchema");
const Restaurant = require("../models/RestaurantSchema");
const Food = require("../models/FoodSchema");
const { initiatePayment, checkStatusPayment } = require('./paymentController');


const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const createOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure user has address and phone number
    if (!user.address || !user.phone) {
      return res.status(400).json({
        message: "Address and phone number are required before placing an order",
      });
    }

    // Get the user's cart
    const cart = user.cart;
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Group items by restaurant
    const ordersByRestaurant = {};
    const foodIds = cart.map((item) => item.foodId);
    const foodItems = await Food.find({ _id: { $in: foodIds } });

    // Create a mapping of food items for quick access
    const foodMap = {};
    foodItems.forEach((food) => {
      foodMap[food._id] = food;
    });

    // Organize items into orders by restaurant
    for (const cartItem of cart) {
      const foodId = cartItem.foodId;
      const food = foodMap[foodId];

      if (!food) {
        console.error("Cart item missing food data:", cartItem);
        return res.status(400).json({ message: "Missing food data in cart items" });
      }

      const restaurantId = food.restaurantId;
      if (!ordersByRestaurant[restaurantId]) {
        ordersByRestaurant[restaurantId] = [];
      }

      ordersByRestaurant[restaurantId].push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity: cartItem.quantity,
      });
    }

    // Create orders for each restaurant
    const orderPromises = Object.keys(ordersByRestaurant).map(async (restaurantId) => {
      const orderItems = ordersByRestaurant[restaurantId];
      const totalAmount = calculateTotalAmount(orderItems); // Function to calculate total amount

      // Initiate payment and get the payment validation link
      const paymentValidationLink = await initiatePayment(user, totalAmount);
      if (!paymentValidationLink) {
        return res.status(500).json({ message: "Payment initiation failed" });
      }

      // Save the order data temporarily in session until payment is verified
      req.session.orderData = {
        userId: user._id,
        restaurantId,
        items: orderItems,
        totalAmount,
        paymentLink: paymentValidationLink, // Store the payment link
      };

      // Update the restaurant's order queue (optional, only after payment success)
      return {
        restaurantId,
        paymentValidationLink
      };
    });

    // Wait for all orders to be prepared for payment
    const preparedOrders = await Promise.all(orderPromises);

    // Redirect user to the payment gateway
    const { paymentValidationLink } = preparedOrders[0]; // Assuming all restaurants have same payment gateway link
    res.redirect(paymentValidationLink);  // Redirect to PhonePe or payment provider
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error during order creation" });
  }
};




const getUserOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ userId: id }).populate("items.foodId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Fetching user orders error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

const getOrderById = async (req, res) => {
  const { id, orderId } = req.params;
  try {
    const order = await Order.findOne({ userId: id, _id: orderId }).populate(
      "items.foodId"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Fetching order error:", error);
    res.status(500).json({ message: "Server error while fetching the order" });
  }
};

const deleteOrder = async (req, res) => {
  const { id, orderId } = req.params;
  try {
    const order = await Order.findOneAndDelete({ userId: id, _id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Restaurant.findByIdAndUpdate(order.restaurantId, {
      $pull: { ordersQueue: orderId },
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Deleting order error:", error);
    res.status(500).json({ message: "Server error while deleting the order" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  deleteOrder,
};

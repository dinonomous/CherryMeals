const User = require("../models/UserSchema");
const Order = require("../models/OrderSchema");
const Restaurant = require("../models/RestaurantSchema");
const Food = require("../models/FoodSchema");
const { initiatePayment, checkStatusPayment } = require('./paymentController');

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const createOrder = async (req, res) => {
  
  const { id } = req.params; // user ID
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user has a valid address and phone number
    if (!user.address || !user.phone) {
      return res.status(400).json({
        message: "Address and phone number are required before placing an order",
      });
    }

    const cart = user.cart;
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Group items by restaurant, map food items, and calculate the total amount
    const foodIds = cart.map((item) => item.foodId);
    const foodItems = await Food.find({ _id: { $in: foodIds } });
    const foodMap = foodItems.reduce((map, food) => {
      map[food._id] = food;
      return map;
    }, {});

    const ordersByRestaurant = {};
    cart.forEach((item) => {
      const food = foodMap[item.foodId];
      if (!food) return res.status(400).json({ message: "Invalid cart items" });

      if (!ordersByRestaurant[food.restaurantId]) {
        ordersByRestaurant[food.restaurantId] = [];
      }
      ordersByRestaurant[food.restaurantId].push({
        foodId: item.foodId,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
      });
    });

    const orderPromises = Object.keys(ordersByRestaurant).map((restaurantId) => {
      const items = ordersByRestaurant[restaurantId];
      const totalAmount = calculateTotalAmount(items);

      // Create an order in the database with paymentId as null
      const newOrder = new Order({
        userId: user._id,
        restaurantId,
        items,
        totalAmount,
        paymentId: null,
      });
      return newOrder.save();
    });

    const orders = await Promise.all(orderPromises);
    res.status(201).json({ orders });
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

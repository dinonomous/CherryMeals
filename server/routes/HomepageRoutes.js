const express = require('express');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuthMiddleware');
const router = express.Router();
const { getRestaurants, getRestaurantsWithOutFoodItems, TopFood } = require('../controllers/HomePage')

router.get("/", getRestaurants);

router.get("/nofooditems", getRestaurantsWithOutFoodItems);

router.get("/topfood", TopFood)

module.exports = router;
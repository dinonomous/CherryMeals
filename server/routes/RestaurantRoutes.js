// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const { generateSignedUrl } = require('../controllers/imageController');
const { getRestaurantsWithOutFoodItemsId } = require('../controllers/HomePage')
const { menue } = require('../controllers/RestaurantMenue')

// Define the route for generating signed URLs

router.get("/nofooditems/:id", getRestaurantsWithOutFoodItemsId);

router.get("/nofooditems/:id/menue", menue);

router.get('/image/:restaurantId/:foodId', generateSignedUrl);

module.exports = router;

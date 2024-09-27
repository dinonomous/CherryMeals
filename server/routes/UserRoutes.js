const express = require('express');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuthMiddleware');
const { getCart, addIntoCart, updateCart, deleteFromCart } = require('../controllers/UserCart')
const router = express.Router();

router.get("/:id",  );

// for users cart 

router.get("/:id/cart", jwtAuthMiddleware , getCart);
router.post("/:id/cart/:foodId" ,jwtAuthMiddleware, addIntoCart);
router.delete("/:id/cart/:foodId", jwtAuthMiddleware, deleteFromCart);
router.put("/:id/cart", jwtAuthMiddleware, updateCart);

// for usrs Orders 

router.get('/:id/orders', );
router.post('/:id/orders', );
router.get('/:id/orders/:orderId', );
router.delete('/:id/orders/:orderId', );

module.exports = router;
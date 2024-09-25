const express = require('express');
const { jwtAuthMiddleware } = require('../middlewares/jwtAuthMiddleware');
const router = express.Router();
const { getCart } = require('../controllers/UserCart')

router.get("/:id",  );

// for users cart 

router.get("/:id/cart", jwtAuthMiddleware , getCart);
router.post("/:id/cart/:foodId", )
router.delete("/:id/cart/:foodId", )

// for usrs Orders 

router.get('/:id/orders', );
router.post('/:id/orders', );
router.get('/:id/orders/:orderId', );
router.delete('/:id/orders/:orderId', );

module.exports = router;
const express = require('express');
// this is routes folder 
const router = express.Router();

router.get("/:id",  );

// for users cart 

router.get("/:id/cart",  );
router.post("/:id/cart/:foodId", )
router.delete("/:id/cart/:foodId", )

// for usrs Orders 

router.get('/:id/orders', );
router.post('/:id/orders', );
router.get('/:id/orders/:orderId', );
router.delete('/:id/orders/:orderId', );

module.exports = router;
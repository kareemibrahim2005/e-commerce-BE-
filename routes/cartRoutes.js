const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.delete("/remove", cartController.removeCartItemFromCart);
router.put("/update", cartController.updateCartItem);

module.exports = router;

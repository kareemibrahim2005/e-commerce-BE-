const pool = require("../db");
const queries = require("../queries/cartQueries");

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await pool.query(queries.getCart, [userId]);

    if (cart.rows.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartId = cart.rows[0].id;

    const cartItems = await pool.query(queries.getCartAndCartItem, [cartId]);

    res.json(cartItems.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await pool.query(queries.getCarts, [userId]);

    if (cart.rows.length === 0) {
      cart = await pool.query(queries.addCart, [userId]);
    }

    const cartId = cart.rows[0].id;

    const existingCartItem = await pool.query(queries.getCartItems, [
      cartId,
      productId,
    ]);

    if (existingCartItem.rows.length > 0) {
      const updatedItem = await pool.query(queries.updateCartItemQuantity, [
        quantity,
        existingCartItem.rows[0].id,
      ]);
      return res.json(updatedItem.rows[0]);
    }

    const newItem = await pool.query(queries.addCartItem, [
      cartId,
      productId,
      quantity,
    ]);

    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const removeCartItemFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const cart = await pool.query(queries.getCart, [userId]);

    if (cart.rows.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartId = cart.rows[0].id;

    await pool.query(queries.deleteCartItem, [cartId, productId]);

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    t;
    const cart = await pool.query("SELECT * FROM carts WHERE user_id = $1", [
      userId,
    ]);

    if (cart.rows.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartId = cart.rows[0].id;

    const updatedItem = await pool.query(queries.setCartItemQuantity, [
      quantity,
      cartId,
      productId,
    ]);

    if (updatedItem.rows.length === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json(updatedItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCart,
  addToCart,
  removeCartItemFromCart,
  updateCartItem,
};

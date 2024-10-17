const getCart = "SELECT * FROM carts WHERE user_id = $1";
const addCart = "INSERT INTO carts (user_id) VALUES ($1) RETURNING *";
const addCartItem =
  "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
const getCartAndCartItem =
  "SELECT cart_items.id, products.name, products.price, cart_items.quantity " +
  "FROM cart_items " +
  "JOIN products ON cart_items.product_id = products.id " +
  "WHERE cart_items.cart_id = $1";

const getCartItems =
  "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2";

const updateCartItemQuantity =
  "UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2 RETURNING *";

const setCartItemQuantity =
  "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *";

const deleteCartItem =
  "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2";

module.exports = {
  addCart,
  getCart,
  getCartAndCartItem,
  addCartItem,
  getCartItems,
  updateCartItemQuantity,
  setCartItemQuantity,
  deleteCartItem,
};

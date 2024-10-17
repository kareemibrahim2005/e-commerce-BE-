const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products WHERE id = $1";
const addProduct =
  "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *";

const getProductsByCategoryId = "SELECT * FROM products WHERE category_id = $1";
const updateProduct =
  "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *";

const deleteProduct = "DELETE FROM products WHERE id = $1";

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  getProductsByCategoryId,
  updateProduct,
  deleteProduct,
};

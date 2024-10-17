const pool = require("../db");
const queries = require("../queries/productQueries");

const getProducts = async (req, res) => {
  try {
    const products = await pool.query(queries.getProducts);
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Products not Found");
  }
};

const addProduct = async (req, res) => {
  const { name, price, category_id } = req.body;
  try {
    const newProduct = await pool.query(queries.addProduct, [
      name,
      price,
      category_id,
    ]);
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error creating products");
  }
};

const getProductsByCategory = async (req, res) => {
  const { category_id } = req.params;

  try {
    const products = await pool.query(queries.getProductsByCategoryId, [
      category_id,
    ]);

    if (products.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;

  try {
    if (!name || !price || !category_id) {
      return res.status(400).json({
        message: "All fields (name, price, category_id) are required",
      });
    }

    const product = await pool.query(queries.getProductById, [id]);
    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await pool.query(queries.updateProduct, [
      name,
      price,
      category_id,
      id,
    ]);

    res.status(200).json(updatedProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await pool.query(queries.getProductById, [id]);
    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await pool.query(queries.addProduct, [id]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct
};

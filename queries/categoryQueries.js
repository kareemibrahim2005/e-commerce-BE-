const getCategories = "SELECT * FROM categories";
const getCategoriesById = "SELECT * FROM categories WHERE id = $1";
const addCategory = "INSERT INTO categories (name) VALUES ($1) RETURNING *";
const deleteCategory = "DELETE FROM categories WHERE id = $1";

module.exports = {
  getCategories,
  addCategory,
  getCategoriesById,
  deleteCategory
};

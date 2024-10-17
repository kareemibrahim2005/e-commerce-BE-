const pool = require("../db");
const queries = require("../queries/categoryQueries");

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query(queries.getCategories);
    res.json(categories.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error Fetching categories");
  }
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await pool.query(queries.addCategory, [name]);
    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error adding category");
  }
};



const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {

    const category = await pool.query(queries.getCategoriesById, [id]);
    if (category.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }


    await pool.query(queries.deleteCategory, [id]);


    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  getCategories,
  addCategory,
  deleteCategory
};

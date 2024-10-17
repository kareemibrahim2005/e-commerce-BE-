require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const queries = require("../queries/userQueries");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const registerUSER = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userExists = await pool.query(queries.checkEmailExist, [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(queries.addUser, [
      email,
      hashedPassword,
      username,
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering User");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(queries.checkEmailExist, [email]);

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Login with your email and password" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email and password" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server invalid token");
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.getUserId, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching User" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await pool.query(queries.getUsers);

    res.status(200).json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.deleteUser, [id]);
    if (result.rowCount > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting User" });
  }
};

module.exports = {
  deleteUser,
  registerUSER,
  login,
  getUserById,
  getUsers,
};

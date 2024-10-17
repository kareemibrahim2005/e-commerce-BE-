const pool = require("../db");
const queries = require("../queries/adminQueries");

const signUpAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.signUp, [
      username,
      email,
      hashedPassword,
    ]);
    res
      .status(201)
      .json({ message: "admin created successfully", user: result.rows[0] });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error creating user" });
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

const getAdmins = async (req, res) => {
  try {
    const result = await pool.query(queries.getAdmins);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Admins" });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.getAdminById, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching User" });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.deleteAdmin, [id]);
    if (result.rowCount > 0) {
      res.json({ message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting admin" });
  }
};


module.exports = {
  signUpAdmin,
  login,
  getAdmins,
  getAdminById,
  deleteAdmin

}
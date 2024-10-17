const checkEmailExist = "SELECT * FROM admin WHERE email = $1";
const addAdmin =
  "INSERT INTO admin (email, password, username) VALUES ($1, $2, $3) RETURNING *";
const getAdmins = "SELECT * FROM admin";
const getAdminById = "SELECT * FROM admin WHERE id = $1"
const deleteAdmin = "DELETE FROM admin WHERE id = $1";

module.exports = {
  addAdmin,
  getAdmins,
  getAdminById,
  deleteAdmin,
  checkEmailExist
};

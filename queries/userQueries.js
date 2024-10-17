const checkEmailExist = "SELECT * FROM users WHERE email = $1";
const addUser =
  "INSERT INTO admins (email, password, username) VALUES ($1, $2, $3) RETURNING *";

const deleteUser = "DELETE FROM users WHERE id = $1";
const getUserId = "SELECT * FROM users where id = $1";
const getUsers = 'SELECT * FROM users';

module.exports = {
  checkEmailExist,
  addUser,
  deleteUser,
  getUserId,
  getUsers
};

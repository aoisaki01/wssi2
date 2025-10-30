const getUsers = require('./getUsers');
const register = require('./register');
const updateUser = require('./update');
const deleteUser = require('./deleteUser');
const login = require('./login');

module.exports = {
  getUsers,
  register,
  updateUser,
  deleteUser,
  login
};
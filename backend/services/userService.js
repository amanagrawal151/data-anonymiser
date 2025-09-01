const User = require('../models/User');


exports.createUser = async (data) => {
  // Default role to 'user' if not provided
  if (!data.role) data.role = 'user';
  console.log('[userService] Creating user with data:', data);
  const user = new User(data);
  const result = await user.save();
  console.log('[userService] User created:', result._id);
  return result;
};

exports.getAllUsers = async () => {
  console.log('[userService] Fetching all users');
  return await User.find();
};

exports.getUserById = async (id) => {
  console.log('[userService] Fetching user by id:', id);
  return await User.findById(id);
};

exports.updateUser = async (id, data) => {
  console.log('[userService] Updating user:', id, 'with data:', data);
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  console.log('[userService] Deleting user:', id);
  return await User.findByIdAndDelete(id);
};

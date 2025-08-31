const User = require('../models/User');


exports.createUser = async (data) => {
  // Default role to 'user' if not provided
  if (!data.role) data.role = 'user';
  const user = new User(data);
  return await user.save();
};

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

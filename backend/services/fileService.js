const File = require('../models/File');

exports.createFile = async (data) => {
  const file = new File(data);
  return await file.save();
};

exports.getAllFiles = async () => {
  return await File.find();
};

exports.getFileById = async (id) => {
  return await File.findById(id);
};

exports.updateFile = async (id, data) => {
  return await File.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteFile = async (id) => {
  return await File.findByIdAndDelete(id);
};

exports.getFilesByUser = async (userId) => {
  return await File.find({ user: userId });
};

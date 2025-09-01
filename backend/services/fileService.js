const File = require('../models/File');

exports.createFile = async (data) => {
  console.log('[fileService] Creating file with data:', data);
  const file = new File(data);
  const result = await file.save();
  console.log('[fileService] File created:', result._id);
  return result;
};

exports.getAllFiles = async () => {
  console.log('[fileService] Fetching all files');
  return await File.find();
};

exports.getFileById = async (id) => {
  console.log('[fileService] Fetching file by id:', id);
  return await File.findById(id);
};

exports.updateFile = async (id, data) => {
  console.log('[fileService] Updating file:', id, 'with data:', data);
  return await File.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteFile = async (id) => {
  console.log('[fileService] Deleting file:', id);
  return await File.findByIdAndDelete(id);
};

exports.getFilesByUser = async (userId) => {
  console.log('[fileService] Fetching files for user:', userId);
  return await File.find({ user: userId });
};

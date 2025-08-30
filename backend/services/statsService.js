const Stats = require('../models/Stats');

const createStats = async (data) => {
  const stats = new Stats(data);
  return await stats.save();
};

const getAllStats = async () => {
  return await Stats.find();
};

const getStatsById = async (id) => {
  return await Stats.findById(id);
};


const updateStats = async (id, data) => {
  return await Stats.findByIdAndUpdate(id, data, { new: true });
};

const getStatsByUser = async (userId) => {
  return await Stats.findOne({ user: userId });
};

const deleteStats = async (id) => {
  return await Stats.findByIdAndDelete(id);
};

module.exports = {
  createStats,
  getAllStats,
  getStatsById,
  updateStats,
  deleteStats,
  getStatsByUser
};

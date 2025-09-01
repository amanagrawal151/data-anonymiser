const Stats = require('../models/Stats');

const createStats = async (data) => {
  console.log('[statsService] Creating stats with data:', data);
  const stats = new Stats(data);
  const result = await stats.save();
  console.log('[statsService] Stats created:', result._id);
  return result;
};

const getAllStats = async () => {
  console.log('[statsService] Fetching all stats');
  return await Stats.find();
};

const getStatsById = async (id) => {
  console.log('[statsService] Fetching stats by id:', id);
  return await Stats.findById(id);
};


const updateStats = async (id, data) => {
  console.log('[statsService] Updating stats:', id, 'with data:', data);
  return await Stats.findByIdAndUpdate(id, data, { new: true });
};

const getStatsByUser = async (userId) => {
  console.log('[statsService] Fetching stats for user:', userId);
  return await Stats.findOne({ user: userId });
};

const deleteStats = async (id) => {
  console.log('[statsService] Deleting stats:', id);
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

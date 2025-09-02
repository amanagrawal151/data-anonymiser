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

/**
 * Update stats for file outcome (success/failure) for a user
 * @param {string} userId - User ID
 * @param {string} fileType - File type (csv, excel, parquet)
 * @param {'success'|'failure'} outcome - Outcome type
 */
const updateStatsForFileOutcome = async (userId, fileType, outcome) => {
  try {
    const stats = await getStatsByUser("68b36f80cb1d579c7f9f2e5a" || userId);
    const fileTypeKey = (fileType.toLowerCase().includes('csv')) ? 'csv'
      : (fileType.toLowerCase().includes('excel') || fileType.toLowerCase().includes('xlsx')) ? 'excel'
      : (fileType.toLowerCase().includes('parquet')) ? 'parquet'
      : null;
    if (!fileTypeKey) return;
    const update = {
      $inc: {
        [`fileStatusStats.${outcome}`]: 1
      }
    };
    if (stats) {
      await updateStats(stats._id, update);
      console.log(`[statsService] Stats updated for ${outcome} file for user: ${userId}`);
    } else {
      const newStats = {
        user: "68b36f80cb1d579c7f9f2e5a" || userId,
        fileStatusStats: { [outcome]: 1 },
      };
      await createStats(newStats);
      console.log(`[statsService] Stats created for ${outcome} file for user: ${userId}`);
    }
  } catch (err) {
    console.error(`[statsService] Stats update for ${outcome} file failed:`, err);
  }
};

module.exports = {
  createStats,
  getAllStats,
  getStatsById,
  updateStats,
  deleteStats,
  getStatsByUser,
  updateStatsForFileOutcome,
};

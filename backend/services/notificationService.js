const Notification = require('../models/Notification');

const createNotification = async (data) => {
  console.log('[notificationService] Creating notification with data:', data);
  const result = await Notification.create(data);
  console.log('[notificationService] Notification created:', result._id);
  return result;
};

const getNotifications = async (filter = {}) => {
  console.log('[notificationService] Fetching notifications with filter:', filter);
  return await Notification.find(filter).populate('user');
};

const getNotificationById = async (id) => {
  console.log('[notificationService] Fetching notification by id:', id);
  return await Notification.findById(id).populate('user');
};

const updateNotification = async (id, data) => {
  console.log('[notificationService] Updating notification:', id, 'with data:', data);
  return await Notification.findByIdAndUpdate(id, data, { new: true });
};

const deleteNotification = async (id) => {
  console.log('[notificationService] Deleting notification:', id);
  return await Notification.findByIdAndDelete(id);
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};

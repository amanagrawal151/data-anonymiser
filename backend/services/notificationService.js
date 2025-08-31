const Notification = require('../models/Notification');

const createNotification = async (data) => {
  return await Notification.create(data);
};

const getNotifications = async (filter = {}) => {
  return await Notification.find(filter).populate('user');
};

const getNotificationById = async (id) => {
  return await Notification.findById(id).populate('user');
};

const updateNotification = async (id, data) => {
  return await Notification.findByIdAndUpdate(id, data, { new: true });
};

const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};

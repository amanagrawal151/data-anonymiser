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

/**
 * Create a notification for crypt (encrypt/decrypt) operations
 * @param {Object} params - { user, fileType, cryptForm, success, fileName }
 */
const createCryptNotification = async ({ user, fileType, cryptForm, success, fileName }) => {
  let title, details, bg;
  if (success) {
    title = `${cryptForm === 'encryption' ? 'Encryption' : 'Decryption'} Success`;
    details = `${fileName} ${cryptForm === 'encryption' ? 'encrypted' : 'decrypted'} successfully.`;
    bg = 'bg-success';
  } else {
    title = `${cryptForm === 'encryption' ? 'Encryption' : 'Decryption'} Failed`;
    details = `Failed to ${cryptForm === 'encryption' ? 'encrypt' : 'decrypt'} ${fileName}.`;
    bg = 'bg-danger';
  }
  // Save time as ISO string for consistency
  const time = new Date().toISOString();
  const notification = {
    user,
    title,
    details,
    fileType,
    cryptForm,
    time,
    bg,
    priority: !success,
    unread: true,
  };
  return await createNotification(notification);
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  createCryptNotification,
};

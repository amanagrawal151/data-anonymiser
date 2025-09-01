const Notification = require('../models/Notification');

function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin === 1) return '1 minute ago';
  if (diffMin < 60) return `${diffMin} minutes ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr === 1) return 'an hour ago';
  if (diffHr < 24) return `${diffHr} hours ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return 'a day ago';
  return `${diffDay} days ago`;
}

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
  let title, details, bg , priority;
  if (success) {
    title = `${cryptForm === 'encryption' ? 'Encryption' : 'Decryption'} Success`;
    details = `${fileName} ${cryptForm === 'encryption' ? 'encrypted' : 'decrypted'} successfully.`;
    bg = 'bg-lvl1';
    priority = false
  } else {
    title = `${cryptForm === 'encryption' ? 'Encryption' : 'Decryption'} Failed`;
    details = `Failed to ${cryptForm === 'encryption' ? 'encrypt' : 'decrypt'} ${fileName}.`;
    bg = 'bg-lvl2';
    priority = true;
  }
  // Store timestamp and format as relative time
  const now = new Date();
  const time = getRelativeTime(now);
  const notification = {
    user : "68b36f80cb1d579c7f9f2e5a" || user,
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

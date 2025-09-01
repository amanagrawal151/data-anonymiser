const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  unread: { type: Boolean, default: true },
  priority: { type: Boolean, default: false },
  title: { type: String, required: true },
  details: { type: String, required: true },
  fileType: { type: String },
  cryptForm: { type: String },
  time: { type: String },
  bg: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  fileType: {
    type: String,
    required: true,
    trim: true
  },
  uploadTimestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  processingTimestamp: {
    type: Date
  },
  stage: {
    type: String,
    enum: ['uploaded', 'processed', 'failed', 'success'],
    required: true,
    default: 'uploaded'
  }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);

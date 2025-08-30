const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileTypeStats: {
    csv: { type: Number, default: 0 },
    excel: { type: Number, default: 0 },
    parquet: { type: Number, default: 0 }
  },
  fileStatusStats: {
    success: { type: Number, default: 0 },
    failure: { type: Number, default: 0 }
  },
  fileSizeStats: {
    csv: { type: Number, default: 0 }, // in GB
    excel: { type: Number, default: 0 },
    parquet: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

StatsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Stats', StatsSchema);

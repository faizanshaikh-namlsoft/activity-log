const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  activities: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userEmail: {
      type: String,
    },
    activity: {
      type: String,
      required: true
    },
    systemInfo: {
      type: String
    },
    ipAddress: {
      type: String
    },
    loginTime: {
      type: Date
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

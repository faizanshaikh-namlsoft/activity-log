const Log = require('../models/Log')
const logActivity = async (activityData) => {
    try {
      let log = await Log.findOne();
  
      if (!log) {
        log = new Log({ activities: [] });
      }
  
      log.activities.push(activityData);
      await log.save();
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  module.exports = logActivity;
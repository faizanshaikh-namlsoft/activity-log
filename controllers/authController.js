const User = require('../models/User');
const os = require('os');
const logActivity = require('../services/logActivity')
const sendEmail = require('../services/sendEmail')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    const activityData = {
      user: user._id,
      userEmail: user.email,
      activity: `User ${user.name} registered.`,
      systemInfo: `Hostname: ${os.hostname()}\nType: ${os.type()}\nPlatform: ${os.platform()}\nRelease: ${os.release()}\nArchitecture: ${os.arch()}`,
      ipAddress: req.ip,
      loginTime: new Date()
    };

    await logActivity(activityData);

    const emailSubject = 'User Registration';
    const emailText = `User ${user.name} registered.\n\nEmail: ${user.email}`;
    await sendEmail(emailSubject, emailText);

    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }
    user.loginCount += 1;
    user.lastLogin = new Date();
    await user.save();

    const activityData = {
      user: user._id,
      userEmail: user.email,
      activity: `User ${user.name} logged in.`,
      systemInfo: `Hostname: ${os.hostname()}\nType: ${os.type()}\nPlatform: ${os.platform()}\nRelease: ${os.release()}\nArchitecture: ${os.arch()}`,
      ipAddress: req.ip,
      loginTime: new Date()
    };

    await logActivity(activityData);

    const emailSubject = 'User Login Activity';
    const emailText = `User ${user.name} logged in. \n\nEmail: ${user.email}\nSystem Information:\nHostname: ${os.hostname()}\nType: ${os.type()}\nPlatform: ${os.platform()}\nRelease: ${os.release()}\nArchitecture: ${os.arch()}\n\nIP Address: ${req.ip}\nLogin Time: ${activityData.loginTime}`;
    await sendEmail(emailSubject, emailText);

    res.send({ user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  register,
  login
};

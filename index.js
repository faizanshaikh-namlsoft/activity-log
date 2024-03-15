const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

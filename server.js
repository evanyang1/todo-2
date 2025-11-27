const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskNotifier = require('./taskNotifier');
require('dotenv').config();

const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// 1. Enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend (running on a different port) to make requests to this backend.
app.use(cors());

// 2. Enable JSON body parsing
app.use(express.json());

// 3. Mount API routes under the /api prefix
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    // Start the task notifier cron job
    taskNotifier.startTaskNotifier();
    console.log('Task notifier started - checking every minute for upcoming tasks.');

    // Start the server only after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
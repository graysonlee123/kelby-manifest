const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

// Execute express process and set port
const app = express();
const PORT = process.env.PORT || 3000;

// Initiate middleware
app.use(express.json());

// Define base routes
app.use('/api/aircraft', require('./api/aircraft'));

// Connect to the database
mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database');

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database.', err);
  });

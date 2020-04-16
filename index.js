const express = require('express');
const path = require('path');

// Execute express process and set port
const app = express();
const PORT = process.env.PORT || 3000;

// Initiate middleware
app.use(express.json());

// Define base routes
app.use('/api', require('./api/api'));

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

// Listen for requests
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

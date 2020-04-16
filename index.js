const express = require('express');
const path = require('path');

// Execute express process and set port
const app = express();
const PORT = process.env.PORT || 3000;

// Initiate middleware
app.use(express.json());

// Define base routes
app.use('/api', require('./api/api'));

// Serve static files for React if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(__dirname, 'client', 'build', 'index.html')
  );
}

// Listen for requests
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

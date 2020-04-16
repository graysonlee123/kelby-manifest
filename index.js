const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Initiate middleware
app.use(express.json());

app.use('/api', require('./api/api'));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

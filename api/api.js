const express = require('express');
const router = express.Router();

// * @route   GET api/
// ? @desc    Test route
// ! @access  Public
router.get('/', (req, res) => {
  res.json('yep');
});

module.exports = router;

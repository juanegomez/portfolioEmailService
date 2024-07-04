const express = require('express');

const router = express.Router();

// Define a GET route for testing
router.get('/', (req, res) => {
  res.send('testing');
});

module.exports = router;

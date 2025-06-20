const express = require('express');
const router = express.Router();

// Example route that throws different errors
router.get('/api/test', (req, res, next) => {
  const errorType = req.query.type;
  if (errorType === 'notfound') {
    const err = new Error('Resource not found');
    err.status = 404;
    return next(err);
  } else if (errorType === 'forbidden') {
    const err = new Error('Access forbidden');
    err.status = 403;
    return next(err);
  } else {
    return res.json({ message: 'No error thrown' });
  }
});

module.exports = router; 
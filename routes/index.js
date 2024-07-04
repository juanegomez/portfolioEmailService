const express = require('express');
const sendEmailRouter = require('./sendEmailRouter');

// Define API routes
function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/email', sendEmailRouter);
}

module.exports = routerApi;

// src/routes/index.js

// Our authentication middleware
const { authenticate } = require('../authorization');
const hash = require('../hash');

const express = require('express');

// version and author from package.json
const { version } = require('../../package.json');

// Create a router that we can use to mount our API
const router = express.Router();

// Hashing Email Address
const hashEmail = async (req, res, next) => {
  req.user = hash(req.user);
  next();
};

const { createSuccessResponse } = require('../response');
const { hostname } = require('os');

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
router.use(`/v1`, authenticate(), hashEmail, require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(
    createSuccessResponse({
      author: 'Fatemeh Zahedi',
      githubUrl: 'https://github.com/neginzahedi/fragments',
      version,
      // Include the hostname in the response
      hostname: hostname(),
    })
  );
});

module.exports = router;

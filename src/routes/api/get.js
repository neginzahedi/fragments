// src/routes/api/get.js
const { createSuccessResponse } = require('../../response');
//const logger = require('../../logger');
//const Fragment = require('../../model/fragment');
const { listFragments } = require('../../model/data/memory');

/**
 * Get a list of fragments for the current user
 */

module.exports = async (req, res) => {
  const fragments = await listFragments(req.user);
  console.log("here is fragments!")
  console.log(fragments)
  res.status(200).json(createSuccessResponse({ fragments }));
};
// src/routes/api/get.js
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports = (req, res) => {
  const fragments = []; // Placeholder for the fragments data

  const responseData = {
    fragments: fragments,
  };
  const successResponse = createSuccessResponse(responseData);
  res.status(200).json(successResponse);
};

// Import necessary modules and dependencies
const express = require('express');

// Import the getToken function from the login controller
const { getToken } = require('../../controler/loginControler/getToken');


// Create a new router instance
const router = express.Router();

// Route to handle the login request and get the access token
router.post('/', getToken);

// Export the router to be used in other parts of the application
module.exports = router;


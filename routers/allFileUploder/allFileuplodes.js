// External Imports
const express = require("express");
const multer = require("multer");
const router = express.Router();

// Import controller functions for handling file operations
const { getAllFiledata } = require("../../controler/allFileControler/getAllFileData");
const { postJsonFiledata } = require("../../controler/allFileControler/postJsonFiledata");
const { postxlsxFiledata } = require("../../controler/allFileControler/postxlsxFiledata");

// Set up multer for file upload
const upload = multer({ dest: "" });

/**
 * Define the routes and corresponding controller functions for file operations.
 *
 * Using Express Router, this module sets up three routes:
 * 1. GET request for fetching all file data - handled by getAllFiledata controller function.
 * 2. POST request for uploading JSON files - handled by postJsonFiledata controller function.
 * 3. POST request for uploading Excel (xlsx) files - handled by postxlsxFiledata controller function.
 *
 * The routes are associated with their respective controller functions, which handle the business logic.
 * Multer middleware is used to handle file uploads and store them temporarily in a destination directory.
 * The file upload destination is set to an empty string for temporary storage.
 */
router.get("/", getAllFiledata); // Route for fetching all file data
router.post("/json_Uplode", upload.single('file'), postJsonFiledata); // Route for uploading JSON files
router.post("/xlsx_Uplode", upload.single('file'), postxlsxFiledata); // Route for uploading Excel (xlsx) files

// Export the router to use in the main Express application
module.exports = router;

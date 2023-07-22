// Import the TeamMember model schema
const TeamMember = require("../../modeles/allFileModele/fileModeleSchema");

/**
 * Controller function to handle the upload of JSON file data and save it to MongoDB.
 *
 * @param {Object} req - Express request object containing the uploaded file.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing a success message if the file is uploaded and saved successfully.
 *                    The response will be in the format: { message: 'File uploaded and saved to MongoDB' }.
 * @throws {Error} - Throws an error if there is any issue with parsing or saving the uploaded JSON data to MongoDB.
 */
const postJsonFiledata = async (req, res) => {
    try {
        // Log the uploaded file data
        console.log(req.file);

        // Read the uploaded file data and convert it to a JSON object
        const fileData = req.file.buffer.toString('utf-8');
        const jsonData = JSON.parse(fileData);
        console.log(jsonData);

        // Save the JSON data to MongoDB using the TeamMember model schema
        await TeamMember.create(jsonData);

        // No need to delete the uploaded file as it is not stored on the filesystem

        // Send a JSON response indicating successful file upload and save
        res.json({ message: 'File uploaded and saved to MongoDB' });
    } catch (error) {
        console.error('Error uploading and saving file:', error);
        // Send an error response if there is any issue with parsing or saving the uploaded JSON data
        res.status(500).json({ error: 'An error occurred while uploading and saving the file' });
    }
};

// Export the controller function
module.exports = {
    postJsonFiledata
};

// Import necessary modules and dependencies
const xlsx = require('xlsx');
const fs = require('fs');
const TeamMember = require('../../modeles/allFileModele/fileModeleSchema');

/**
 * Controller function to handle the upload of Excel (xlsx) file data and save it to MongoDB.
 *
 * @param {Object} req - Express request object containing the uploaded file.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing a success message if the file is uploaded and saved successfully.
 *                    The response will be in the format: { message: 'File uploaded and saved to MongoDB' }.
 * @throws {Error} - Throws an error if there is any issue with reading, converting, or saving the uploaded Excel data to MongoDB.
 */
const postxlsxFiledata = async (req, res) => {
    try {
        // Log the uploaded request data


        // Read the uploaded Excel file and extract data
        const workbook = xlsx.read(req.file.buffer);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        
        // Save the Excel data to MongoDB using the TeamMember model schema
        await TeamMember.create(jsonData);

        // No need to delete the uploaded file as it is not stored on the filesystem

        // Send a JSON response indicating successful file upload and save
        res.json({ message: 'File uploaded and saved to MongoDB' });
    } catch (error) {
        console.error('Error uploading and saving file:', error);
        // Send an error response if there is any issue with reading, converting, or saving the uploaded Excel data
        res.status(500).json({ error: 'An error occurred while uploading and saving the file' });
    }
};

// Export the controller function
module.exports = {
    postxlsxFiledata
};

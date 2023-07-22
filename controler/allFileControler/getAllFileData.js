// Import the TeamMember model schema
const TeamMember = require("../../modeles/allFileModele/fileModeleSchema");

/**
 * Controller function to get all team member data from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the status code and the retrieved team members data.
 *                    The response will be in the format: { status: 200, employees: [teamMembers] }.
 * @throws {Error} - Throws an error if there is any issue with retrieving team member data from the database.
 */
const getAllFiledata = async (req, res) => {
    try {
        // Retrieve all team member data from the database
        const teamMembers = await TeamMember.find();
        // Send a JSON response with the retrieved team members data
        res.json({
            status: 200,
            employees: teamMembers
        });
    } catch (error) {
        console.error('Error retrieving team members:', error);
        // Send an error response if there is any issue with retrieving data
        res.status(500).json({ error: 'An error occurred while retrieving team members' });
    }
}

// Export the controller function
module.exports = {
    getAllFiledata
}

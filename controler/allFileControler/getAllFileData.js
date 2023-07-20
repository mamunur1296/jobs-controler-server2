const TeamMember = require("../../modeles/allFileModele/fileModeleSchema");

const getAllFiledata= async (req, res) => {
    try {
      const teamMembers = await TeamMember.find();
      res.json({
        status:200,
        employees:teamMembers
      });
    } catch (error) {
      console.error('Error retrieving team members:', error);
      res.status(500).json({ error: 'An error occurred while retrieving team members' });
    }
  }


module.exports= {
    getAllFiledata
}
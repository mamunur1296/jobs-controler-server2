const xlsx = require('xlsx');
const fs = require('fs');
const TeamMember = require('../../modeles/allFileModele/fileModeleSchema');

const postxlsxFiledata = async (req, res) => {
  try {
    console.log(req);
    const workbook = xlsx.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
    // Save the Excel data to MongoDB
    await TeamMember.create(jsonData);

    // No need to delete the uploaded file as it is not stored on the filesystem

    res.json({ message: 'File uploaded and saved to MongoDB' });
  } catch (error) {
    console.error('Error uploading and saving file:', error);
    res.status(500).json({ error: 'An error occurred while uploading and saving the file' });
  }
};

module.exports = {
  postxlsxFiledata
};

const TeamMember = require("../../modeles/allFileModele/fileModeleSchema");

const postJsonFiledata = async (req, res) => {
  try {
    console.log(req.file);
    const fileData = req.file.buffer.toString('utf-8');
    const jsonData = JSON.parse(fileData);
    console.log(jsonData);
    // Save the JSON data to MongoDB

    await TeamMember.create(jsonData);

    // No need to delete the uploaded file as it is not stored on the filesystem

    res.json({ message: 'File uploaded and saved to MongoDB' });
  } catch (error) {
    console.error('Error uploading and saving file:', error);
    res.status(500).json({ error: 'An error occurred while uploading and saving the file' });
  }
};

module.exports = {
  postJsonFiledata
};

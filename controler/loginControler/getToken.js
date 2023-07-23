const { default: axios } = require("axios");

const getToken= async (req,res)=>{
    try {
        // Make the API request using axios
        const requestData = req.body;
        console.log(req.body);
        const response = await axios.post(process.env.TOKEN_GENARAT, requestData);
        // Handle the API response and send it back to the client
        res.json(response.data);
      } catch (error) {
        // Handle any errors that occurred during the API request
        res.status(500).json({ error: 'An error occurred while fetching the API data' });
      }
}

module.exports={
    getToken
}
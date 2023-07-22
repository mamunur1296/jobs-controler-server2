const axios = require('axios');
const express = require('express');
const router=express.Router();

router.post("/", async (req,res)=>{
    try {
        // Make the API request using axios
        const requestData = req.body;
        const apiUrl = 'https://account.uipath.com/oauth/token'; 
        const response = await axios.post(apiUrl, requestData);
        // Handle the API response and send it back to the client
        res.json(response.data);
      } catch (error) {
        // Handle any errors that occurred during the API request
        res.status(500).json({ error: 'An error occurred while fetching the API data' });
      }
})

module.exports=router;

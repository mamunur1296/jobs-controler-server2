const getAllfile=async (req, res) => {
    try {
        const response = await fetch("https://cloud.uipath.com/studeyzeqpsn/Prod/orchestrator_/odata/Releases?", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${req.body.token}`,
            'X-UIPATH-OrganizationUnitId': req.body.token,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const responseData = await response.json();
        res.json(responseData) ;
      } catch (error) {
        console.log(error);
      }    
  }
  

  module.exports={
    getAllfile
  }
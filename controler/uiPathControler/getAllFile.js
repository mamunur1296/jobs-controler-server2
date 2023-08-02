const getAllfile=async (req, res) => {
    try {
        const response = await fetch("https://cloud.uipath.com/studeyzeqpsn/Prod/orchestrator_/odata/Releases?", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${req.body.token}`,
            'X-UIPATH-OrganizationUnitId': req.body.importId,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const responseData = await response.json();

        if(responseData.value.length > 0){
          res.json(responseData) ;
        }
      } catch (error) {
        res.json({
          value:""
        }) ;
        console.log(error);
      }    
  }
  

  module.exports={
    getAllfile
  }
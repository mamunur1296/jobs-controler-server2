const getProcessSchedules= async (req,res)=>{
    try {
        console.log("this is processSchedules");
        const response = await fetch("https://cloud.uipath.com/studeyzeqpsn/Prod/orchestrator_/odata/ProcessSchedules", {
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
        res.json(responseData) ;
      } catch (error) {
        console.log(error);
      }  
}

module.exports={
    getProcessSchedules
}
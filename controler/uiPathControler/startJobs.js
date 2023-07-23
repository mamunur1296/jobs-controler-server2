const startJobs = async(req,res)=>{
    try {
        const response = await fetch("https://cloud.uipath.com/studeyzeqpsn/Prod/orchestrator_/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${req.body.token}`,
            'X-UIPATH-OrganizationUnitId': req.body.importId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body.bodyData)
        });
        if (!response.ok) {
            res.json({
                message: "this function can not work . it is serversite error"
            }) ;
        }
        const responseData = await response.json();
        res.json(responseData) ;
      } catch (error) {
        console.log(error);
      }  
}

module.exports={
    startJobs
}
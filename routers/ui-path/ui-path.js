// External Imports
const express = require("express");
const { getAllfile } = require("../../controler/uiPathControler/getAllFile");
const { getAllJobs } = require("../../controler/uiPathControler/getAlljobs");
const { getProcessSchedules } = require("../../controler/uiPathControler/getProcessSchedules");
const { startJobs } = require("../../controler/uiPathControler/startJobs");
const router = express.Router();


router.post("/all_File", getAllfile);
router.post("/all_jobs", getAllJobs);
router.post("/getProcessSchedules", getProcessSchedules);
router.post("/start/jobs", startJobs);
  


// Export the router to use in the main Express application
module.exports = router;
// External Imports
const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllFiledata } = require("../../controler/allFileControler/getAllFileData");
const { postJsonFiledata } = require("../../controler/allFileControler/postJsonFiledata");
const { postxlsxFiledata } = require("../../controler/allFileControler/postxlsxFiledata");
const upload = multer({ dest: "" });





router.get("/" , getAllFiledata)
router.post("/json_Uplode", upload.single('file') , postJsonFiledata)
router.post("/xlsx_Uplode", upload.single('file') , postxlsxFiledata)







// module export
module.exports = router;


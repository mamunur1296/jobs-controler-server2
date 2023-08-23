// External Imports
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

// Internal Imports
const dbconnect = require('./middleware/common/dbConnect/dbconnect');
const { notFoundHandler } = require('./middleware/common/errorHandelar/notfoundHandelar');
const { errorHandler } = require('./middleware/common/errorHandelar/defoultHandelar');
const allFileuplodes = require('./routers/allFileUploder/allFileuplodes');
const userLogin = require('./routers/login/userLogin');
const uiPath = require('./routers/ui-path/ui-path');
const loginRouter= require("./user-authentication-system/routes/loginRouter");
const corsConfig = require('./utillities/cors');
const { default: axios } = require('axios');




// Create an Express application
const app = express();
dotenv.config();

// Database Connector
dbconnect();

// Request parsers and middleware setup
app.use(cors(corsConfig))
app.use(bodyParser.json());
app.use(useragent.express());
app.use(express.json());
app.use(requestIp.mw());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKI_SECTAT));


app.get('/', (req, res) => {
    res.send(`Server is raning .`)
  })

// Mount the routers for specific paths
app.use("/files", allFileuplodes); // Router for file uploads and data handling
app.use("/login", userLogin); // Router for user login and authentication
app.use("/ui-path", uiPath); // Router for user login and authentication
app.use("/authentication", loginRouter); // Router for user login and authentication

// 404 Not Found Handler
app.use(notFoundHandler);

// Default Error Handler
app.use(errorHandler);

// Start the Express app and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`This app is running on port ${process.env.PORT}`);
});

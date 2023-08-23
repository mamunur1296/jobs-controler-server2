const { check, validationResult } = require("express-validator");
const People = require("../models/peopleSchema");
const si = require('systeminformation');

const validateLogin = [
    check('email').isEmail().withMessage('Invalid email address').trim(),
    check('password').notEmpty().withMessage('Password is required'),
  ];

  const idLoginValidatorError = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const errorResponse = {
        success: false,
        message: 'Validation failed',
        errors: errors.mapped(),
      };
      return res.status(422).json(errorResponse);
    }
  
    next();
  };
  const checkDeviceId = async (req, res, next) => {
    const { email } = req.body;
    const user = await People.findOne({ email });
    const { deviceId } = req.cookies;
    if (!deviceId) {
      return res.status(401).json({ message: 'Device ID not found. Please enable cookies.' });
    }
  
    if (user && user.deviceId !== deviceId) {
      return res.status(403).json({ message: 'Unauthorized: Device ID does not match user\'s recorded device ID.' });
    }
  
    // Device ID is valid or not required, proceed to the next middleware
    next();
  };

  const checkBrowserId = async (req, res, next) => {
    const { email } = req.body;
    const user = await People.findOne({ email });
    const { browserID } = req.cookies;
  
    if (!browserID) {
      return res.status(401).json({ message: 'Browser ID not found. Please enable cookies.' });
    }
  
    if (user && user.userAgent.browserID !== browserID) {
      return res.status(403).json({ message: 'Unauthorized: Browser ID does not match user\'s recorded Browser ID.' });
    }
  
    // Browser ID is valid or not required, proceed to the next middleware
    next();
  };


  const checkUserDevInfo = async (req, res, next) => {
    const { email } = req.body;
    const user = await People.findOne({ email });
    const motherboardData = await si.baseboard();
    console.log(user?.userDevInfo?.serial );
    console.log(motherboardData?.serial );
    if (user && user?.userDevInfo?.serial !== motherboardData?.serial) {
      return res.status(403).json({ message: 'Unauthorized: Browser ID does not match user\'s recorded Browser ID.' });
    }
    // Browser ID is valid or not required, proceed to the next middleware
    next();
  };
module.exports={
    validateLogin,
    idLoginValidatorError,
    checkDeviceId,
    checkBrowserId,
    checkUserDevInfo,
}
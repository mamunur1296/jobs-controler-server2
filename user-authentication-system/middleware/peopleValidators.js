const {  check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');
const People = require("../models/peopleSchema");


const validateRegister = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .trim()
    .custom(async (value) => {
      // Check if the name is already used by another user
      const user = await People.findOne({ name: value });
      if (user) {
        throw new Error('Name is already taken');
      }
      return true;
    }),

  check('email')
    .isEmail().withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      // Check if the email is already used by another user
      const user = await People.findOne({ email: value });
      if (user) {
        throw new Error('Email is already registered');
      }
      return true;
    }),

  check('mobile')
    .notEmpty().withMessage('Mobile is required')
    .trim()
    .custom(async (value) => {
      // Check if the mobile number is already used by another user
      const user = await People.findOne({ mobile: value });
      if (user) {
        throw new Error('Mobile number is already registered');
      }
      return true;
    }),

    check("password")
    .isStrongPassword()
    .withMessage(
      "Password mast be at least 8 characters long & must 1 lowercase , 1 Uppercase , 1 symbol"
    ),
  check("avatar"),
  check("role"),
];

  const isDeviseID = (req, res, next) => {
    if (!req.cookies.deviceId) {
      // Generate a unique device ID using UUID v4
      const deviceId = uuidv4();
      // Set the device ID as an HTTP-only cookie with a 30-day expiration (adjust as needed)
      const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        withCredentials: true
      };
  
      res.cookie('deviceId', deviceId, cookieOptions);
    }
  
    next();
  };
const isBrowserID=(req,res,next)=>{
  if (!req.cookies.browserID) {
    // Generate a unique device ID using UUID v4
    const browserID = uuidv4();
    // Set the device ID as an HTTP-only cookie with a 30-day expiration (adjust as needed)
    const cookieOptions = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      withCredentials: true
    };

    res.cookie('browserID', browserID, cookieOptions);
  }

  next();
}

const idRagesterValidatorError = (req, res, next) => {
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


module.exports={
    validateRegister,
    idRagesterValidatorError,
    isDeviseID,
    isBrowserID
}
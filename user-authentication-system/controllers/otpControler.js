const OTP = require("../models/otpSchema");
const People = require("../models/peopleSchema");
const { generateOTP } = require("../utils/otpGenarator");
const bcrypt = require('bcrypt');

 // Replace '../path/to/otpModel' with the correct path

const mobileLogin = async (req, res, next) => {
  const mobileNumber = req.body.number;
  const user = req.user;
  console.log(mobileNumber);
  if (!mobileNumber) {
    return res.status(401).json("Unauthorized");
  }
  console.log("is" ,user.mobile , mobileNumber );
  if( user.mobile !== mobileNumber ){
    return res.status(401).json("This phon number is Unauthorized");
  }

  const otp = generateOTP();
  const hashedOtp = await bcrypt.hash(otp, 10);

  try {
    // Check if an OTP document with the phoneNumber already exists
    let existingOTP = await OTP.findOne({ phoneNumber: mobileNumber });

    if (existingOTP) {
      // If an existing OTP document is found, update its otp field
      existingOTP.otp = hashedOtp;
      await existingOTP.save();
    } else {
      // If no existing OTP document is found, create a new OTP document and save it
      const otpObj = new OTP({
        phoneNumber: mobileNumber,
        otp: hashedOtp,
      });
      await otpObj.save();
    }
    console.log("OTP saved and/or updated successfully");

    // Send the OTP to the user (e.g., via SMS, email, etc.)
    // You can use your preferred method to send the OTP to the user.

    // For example, you can send the OTP as a response for testing purposes:
    res.json({ otp: otp  });
  } catch (error) {
    console.error('Error saving OTP:', error);
    res.status(500).json("Internal Server Error");
  }
};

  
 const mobileOTPVarify = async (req, res, next) => {
  const mobileNumber = req.user?.mobile;
  const userOTP = req.body.otp; // Assuming the OTP sent by the client is provided in the request body
  if (!mobileNumber || !userOTP) {
    return res.status(400).json("Bad Request");
  }

  try {
    // Find the OTP document based on the mobile number
    const existingOTP = await OTP.findOne({ phoneNumber: mobileNumber });

    if (!existingOTP) {
      return res.status(404).json("OTP not found");
    }

    // Compare the provided OTP with the one stored in the database
    const isOTPValid = await bcrypt.compare(userOTP, existingOTP.otp);

    if (!isOTPValid) {
      return res.status(401).json("Invalid OTP");
    }

    // If the OTP is valid, update the user's 'otpVerified' property to true
    // Assuming you have a User model and the 'otpVerified' field exists
    const user = await People.findOneAndUpdate(
      { mobile: mobileNumber },
      { otpVerified: true }
    );

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Delete the OTP document from the database as it is no longer needed
    await OTP.findOneAndDelete({ phoneNumber: mobileNumber });


    res.json("OTP verified successfully");
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json("Internal Server Error");
  }
  };
  


module.exports={
    mobileLogin,
    mobileOTPVarify
}
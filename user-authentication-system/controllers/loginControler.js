const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const People = require("../models/peopleSchema");
const jwt = require('jsonwebtoken');

const getUsers= async(req,res, next)=>{
  try {
    // Fetch all users from the database using the People model
    const users = await People.find();

    // If there are no users found, return a 404 (Not Found) response
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // If users are found, send them in the response
    res.json(users);
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getLoginUsers = (req, res) => {
  const user = req.user;
  
  if (!user) {
    // If the user object is not available in req, it means the user is not authenticated
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // User is authenticated, you can use the 'user' object for further operations
  // For example, you can return the user's information as a JSON response
  res.json({ user });
};


const DeleteUsers = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Find the user with the given ID in the database using the People model
    const user = await People.findById(userId);

    // If the user with the given ID is not found, return a 404 (Not Found) response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, delete the user from the database
    await People.findByIdAndDelete(userId);

    // Send a success message in the response
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Register route with validation middleware
  const addUsers = async (req, res, next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const deviceId = req.cookies.deviceId;
    const browserID = req.cookies.browserID;
    const userAgent = req.useragent;

    if (req.body) {
      newUser = new People({
        ...req.body,
        password: hashedPassword,
        deviceId: deviceId,
        userAgent:{
          browser: userAgent.browser,
          version: userAgent.version,
          platform: userAgent.platform,
          browserID:browserID
        }
      });
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: "measing data !",
          },
        },
      });
    }
    try {
      const result = await newUser.save();
      res.status(200).json({
        message: "user was successfully",
      });
    } catch (err) {

      res.status(500).json({

        errors: {
          common: {
            msg: "unknown error occured!",
          },
        },
      });
    }
  };

  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Step 1: Find the user by email in the database
      const user = await People.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Step 2: Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
        // Step 3: Verify email
      if (user.email !== email) {
        return res.status(400).json({ message: 'Unauthorized' });
      }
      userSign={
        email:user.email,
        name:user.name,
        role:user.role,
        mobile:user.mobile,
        id:user._id,
        phonVarify:user.otpVerified
      }
      // Step 6: Generate JWT token and set it in a cookie
      const token = jwt.sign(userSign, process.env.JWT_SECTAT, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true });
  
      // Step 7: Send success message
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
 const logout=  (req, res) => {
    res.clearCookie('jwt',{
      httpOnly: true,
      secure: true,
    });

    // Send a response indicating successful logout
    res.json({ message: 'Logged out successfully' });
  }

module.exports={
    getUsers ,
    addUsers ,
    DeleteUsers ,
    login,
    logout ,
    getLoginUsers
 
}
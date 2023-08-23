const jwt = require('jsonwebtoken');

const isLoginUser = (req, res, next) => {

    // Get the token from the request headers or cookies (based on how you send the token from the client)
    const token = req.headers.authorization || req.cookies.jwt;
    if (!token) {
      console.log(token);
      return res.status(401).json({ message: 'No token provided. Please log in.' });
    }
  
    try {
      // Verify the token using your secret key (the same key used for signing)
      const decoded = jwt.verify(token, process.env.JWT_SECTAT);

      // Attach the decoded user data to the request object for later use
      req.user = decoded;
  
      next(); // Token is valid, proceed to the next middleware or route handler
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token. Please log in again.' });
    }
  };


  module.exports={
    isLoginUser
  }
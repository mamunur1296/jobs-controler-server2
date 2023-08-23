const corsConfig = (req, callback) => {
  // Extract the referer from the request headers
  const url = req.headers.referer || '';
  const referer = url.endsWith('/') ? url.slice(0, -1) : url;

  // Define a list of allowed origins (you can customize this based on your requirements)
  const allowedOrigins = ['http://localhost:3000', 'https://jobs-controler2.vercel.app'];

  // Check if the referer matches any of the allowed origins
  const isOriginAllowed = allowedOrigins.some((origin) => referer.startsWith(origin));

  // Set CORS options based on the result
  const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: isOriginAllowed ? referer : false, // Set the origin to false if not allowed
  };

  callback(null, corsOptions);
};

module.exports = corsConfig;

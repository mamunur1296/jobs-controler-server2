// Default error handler
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json(res.locals.error);
  };
  
  module.exports={
    errorHandler
  };
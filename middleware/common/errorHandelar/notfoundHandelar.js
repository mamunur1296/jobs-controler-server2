//404 not found handelar 

const createHttpError = require("http-errors");


const notFoundHandler = (req, res, next) => {
    next(createHttpError(404, "The requested content was not found."));
  };

module.exports={
    notFoundHandler
};
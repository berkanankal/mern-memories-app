const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  console.log(err.name);
  console.log(err.code);

  let customErr = err;

  if (err.name === "ValidationError") {
    customErr = new CustomError(err.message, 400);
  }
  if (err.name === "CastError") {
    customErr = new CustomError("Invalid ID", 400);
  }

  res.status(customErr.statusCode || 500).json({
    success: false,
    message: customErr.message || "Internal Server Error",
  });
};

module.exports = customErrorHandler;

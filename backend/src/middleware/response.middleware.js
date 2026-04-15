module.exports = (req, res, next) => {
  res.success = (data, message = "Success") => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };

  res.fail = (message = "Failed", statusCode = 400) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

  next();
};

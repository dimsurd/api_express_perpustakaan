const logPath = (req, res, next) => {
  console.log(`API hit to ${req.path}`);
  next();
};

module.exports = logPath;

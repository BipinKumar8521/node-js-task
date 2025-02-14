const jwt = require("jsonwebtoken");
const HttpError = require("./models/Http-Error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer TOKEN'
    if (!token) {
      return next(new HttpError("Authentication failed", 403));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = {
      username: decodedToken.username,
    };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed", 403));
  }
};

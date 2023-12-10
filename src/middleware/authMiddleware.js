const jwt = require("jsonwebtoken");

const isAuthenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      success: false,
      message: "Token Requires",
    });
  } else {
    try {
      const token = authorization.split(" ")[1];
      const secret = process.env.JWT_SECRET;
      const jwtDecode = jwt.verify(token, secret);
      req.userData = jwtDecode;
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
};


module.exports = isAuthenticate;

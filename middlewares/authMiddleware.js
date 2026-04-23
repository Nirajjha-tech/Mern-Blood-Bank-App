const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel"); // 🔥 add this

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    
    const user = await userModel.findById(decode.userId);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.userId = user._id;
    req.user = user;

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth failed",
    });
  }
};
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

//middleware to authenticate user requests
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
      
    //if jwt missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      //verifying the jwt using the secret key stored in env
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      //********storing the decoded jwt payload in the request object for further use*********/
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    //if jwt is valid move to the next middleware or request handler
    next();
    console.log("middleware is passed");
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

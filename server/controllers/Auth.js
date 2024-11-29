const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../utils/passwordUpdate");
require("dotenv").config();

//send otp controller
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    //check if user already present
    const userPresent = await User.findOne({ email });

    if (userPresent) {
      return res.status(401).json({
        success: false,
        message: "User is Already Registered",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //Ensures the generated OTP is unique by querying the database (OTP.findOne({ otp: otp })) to check if it already exists.
    //If the OTP exists, it regenerates a new one until a unique OTP is created.
    const result = await OTP.findOne({ otp: otp });
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: "OTP sent sucessfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error sending otp",
      error: error.message,
    });
  }
};

//signup controller
exports.signup = async (req, res) => {
  try {
    //destructure fields from request body
    const { name, email, password, confirmPassword, otp } = req.body;

    //check if all details are not empty
    if (!name || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if password and confirm pass same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password must be same",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //find the most recent otp for email
    //otp-> reqbody recentOtp -> db
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOTP);
    if (recentOTP.length === 0 || otp !== recentOTP[0].otp) {
      //otp not found
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user in db
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //return res
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered.Please try again.",
    });
  }
};

//login controller
exports.login = async (req, res) => {
  try {
    //get email and password from requet body
    const { email, password } = req.body;

    //check if email password is present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //find user with provided email
    const user = await User.findOne({ email });

    //if user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered signup first",
      });
    }

    //generate jwt token
    //compare password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      //save token to user document in database
      user.token = token;
      user.password = undefined;
      //set cookie for token
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User login success",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failure try again!",
    });
  }
};

//change password controller
exports.changePassword = async (req, res) => {
  try {
    //get user data from req.user
    const userDetails = await User.findById(req.user.id);

    //get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    //validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }
    //update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    //send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.name}`
        )
      );
      console.log("Email sent success", emailResponse.response);
    } catch (error) {
      console.log("Error sending email: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Error occured while sending email",
        error: error.message,
      });
    }

    //return res
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating password",
      error: error.message,
    });
  }
};

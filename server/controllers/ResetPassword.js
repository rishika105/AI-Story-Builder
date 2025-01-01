const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    //from req body
    const email = req.body.email;

    //find user from db and check if exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not registered with us`,
      });
    }

    //generate token
    const token = crypto.randomBytes(20).toString("hex");

    //update reset token and expires in db
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true } // Return the updated document
    );
    // console.log("Details", updatedDetails);

    //frontend url and send email
    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your link for email verification is ${url}. Please click this url to reset your password.`
    );
    //send res
    return res.status(200).json({
      success: true,
      message: "Email sent successfully, please check your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending email reset message",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //from req body
    const { password, confirmPassword, resetToken } = req.body;

    if (confirmPassword !== password) {
      return res.status(403).json({
        success: false,
        message: "Password and Confirm Password must be same",
      });
    }
    //find user details basis of token
    const userDetails = await User.findOne({ resetPasswordToken: resetToken });

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status.json(403).json({
        success: false,
        message: "Token is expired. Regenerate it",
      });
    }

    //hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //update in db
    await User.findOneAndUpdate(
      { resetPasswordToken: resetToken },
      { password: encryptedPassword },
      { new: true }
    );
     
    //return res
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while resetting the password",
    });
  }
};

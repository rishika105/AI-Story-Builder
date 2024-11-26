const bcrypt = require("bcryptjs")
const User = require("../models/User")
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender")
const {passwordUpdated} = require("../utils/passwordUpdate");
require("dotenv").config()


//signup controller 
exports.signup = async (req, res) => {
    try{
        //destructure fields from request body
        const {
            name,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body

        //check if all details are not empty
        if (!name || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            })
        }

        //check if password and confirm pass same
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password must be same"
            })
        }

        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //find the most recent otp for email
        //otp-> reqbody recentOtp -> db
        const recentOTP = await OTP.find({email}).sort({ createdAt: -1}).limit(1)
        console.log(recentOTP)
        if(recentOTP.length === 0 || otp !== recentOTP[0].otp){
            //otp not found
            return res.status(400).json({
                success: false,
                message: "OTP is not valid"
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create the user in db
        const user = await User.create({
            name,
            email,
            password: hashedPassword,     
        })
          
    //return res
    return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
    })      
    }
    catch(error){
     console.log(error)
     return res.status(500).json({
        success: false,
        message: "User cannot be registered.Please try again.",
     })
    }
}

//login controller

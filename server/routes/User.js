const express = require("express")
const router = express.Router()

//import required controllers and middlewares
const {login, signup, sendotp, changePassword} = require("../controllers/Auth")
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword")

const {auth} = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************
router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router
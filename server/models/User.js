const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
        },
        active: {
			type: Boolean,
			default: true,
		},
        password: {
            type: String,
            required: true,
        },
        token: {
            type:String,

        },
        resetPasswordToken: {
            type: String, // For password reset process
          },
        resetPasswordExpires: {
            type: Date,
        }
    },
    {timestamps: true}
)


module.exports = mongoose.model("user", userSchema);
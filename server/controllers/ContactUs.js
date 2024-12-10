const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require("../mail templates/contactFormRes");
const {
  contactUsEmailSupport,
} = require("../mail templates/contactUsOrganization");
require("dotenv").config();

exports.contactUsController = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    //confirmation email to user
    const emailRes = await mailSender(
      email,
      "Your data send successfully",
      contactUsEmail(name, email, message)
    );

    //mail to the designated the support team of website
    const emailRes2 = await mailSender(
      process.env.SUPPORT_EMAIL,
      "Message recieved successfully",
      contactUsEmailSupport(name, email, message)
    );

    console.log("Email res", emailRes);
    return res.status(200).json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending contact data",
    });
  }
};

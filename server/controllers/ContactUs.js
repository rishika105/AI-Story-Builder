const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require("../utils/contactFormRes");

exports.contactUsController = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const emailRes = await mailSender(
      email,
      "Your data send successfully",
      contactUsEmail(name, email, message)
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

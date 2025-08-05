const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

require("dotenv").config();

const transporter =  nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
})

router.post("/send-email", async (req, res) => {
  try {
    const requestData = req.body;

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: process.env.EMAIL_TO,
      subject: "Info email",
      html: `
              <div>
                <h2>User Details</h2>
                <p>The user provided the following details</p>
                <ul>
                  <li>Name: ${requestData.name}</li>
                  <li>Email: ${requestData.email}</li>
                  <li>Contact: ${requestData.phone}</li>
                  <li>Message: ${requestData.details}</li>
                </ul>
              </div>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("Error Occured:", error);
          reject(error);
        } else {
          console.log("Email sent sucessfully", info.response);
          resolve(info);
          res.status(200).json({ message: "email sent", data: requestData });
        }
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const cors = require ("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

const transporter =  nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
})

app.use(express.json());
app.use(
  cors({
    origin: process.env.LOCAL_URL,
    methods: "GET, POST",
    credentials: true,
  })
)


app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to impl backend"})
});

app.post("/api/send-email", async (req, res) => {
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
    }

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          return console.log("Error Occured:", error);
          reject(error);
        }else{
          console.log("Email sent sucessfully", info.response);
          resolve(info);
          res.status(200).json ( {message: "email sent", data: requestData});
        }
      })
    })

  }catch (error) {
    next(error)
  }finally {
    
  }
  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
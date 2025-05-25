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
  
});

app.post("/api/send-email", (req, res) => {
  try {
    const requestData = req.body;
    
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: process.env.EMAIL_TO,
      subject: "Info email",
      text: `Name: ${requestData.name} Email: ${requestData.email} Contact: ${requestData.phone} Details: ${requestData.details}`
    }
    console.log(requestData);

    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        return console.log("Error Occured:", error);
      }
      console.log("Email sent sucessfully", info.response);
    })

    res.status(200).json ( {message: "email sent", data: requestData});
  }catch (error) {
    next(error)
  }finally {
    
  }
  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
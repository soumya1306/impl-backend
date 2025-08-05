const express = require("express");
require("dotenv").config();
const logger = require("./utils/logger");
const port = process.env.PORT;

const app = express();

const cors = require ("cors");
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

const emailRoute = require("./routes/send-email");
const loginRoute = require("./routes/login");
const basicDetailsRoute = require("./routes/basic-details");
const addtionalDetailsRoute = require("./routes/additional-details");
const attachmentsRoute = require("./routes/attachments");
const commonRoute = require("./routes/common");

app.use("/api", emailRoute);
app.use("/api", loginRoute);
app.use("/api", basicDetailsRoute);
app.use("/api", addtionalDetailsRoute);
app.use("/api", attachmentsRoute);
app.use("/api", commonRoute);


app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
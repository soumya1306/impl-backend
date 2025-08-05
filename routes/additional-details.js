const express = require("express");

const router = express.Router();

const dbConnection = require("../utils/database");

router.post("/additional-details", async(req, res) => {
  console.log(req.body)
  res.json({message: "Data Posted sucessfully"})
})

module.exports = router
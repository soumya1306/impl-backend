const express = require("express");

const router = express.Router();
const logger = require("../utils/logger")

const dbConnection = require("../utils/database");

router.post("/common/get-flags", async(req, res) => {
  const username = req.body.username;
  // console.log(req.body)
  dbConnection.query("SELECT * FROM user_detail_flags WHERE username = ?",[username], (err, rows) => {
    // console.log(rows[0])
    if(err){
      console.error("Error Occured while connecting to database"+ err.sqlMessage);
        return;
    }
    logger.info("Flags fetched sucessfully");
    res.json({message:"Flags fetched sucessfully", data:rows[0]})
  })
})

module.exports = router
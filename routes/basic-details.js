const express = require("express");

const router = express.Router();

const dbConnection = require("../utils/database");
const logger = require("../utils/logger");

const basicDetails = [
  "username",
  "firstname",
  "lastname",
  "dob",
  "age",
  "pob",
  "gender",
  "nationality",
  "religion",
  "mstatus",
];

router.post("/basic-details", async (req, res) => {
  console.log(req.body);
  const basic_details = req.body;
  dbConnection.execute(
    "INSERT INTO user_basic_details (username, firstname, lastname, dob, age, pob, gender, nationality, religion, mstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      basic_details.username,
      basic_details.firstname,
      basic_details.lastname,
      basic_details.dob,
      basic_details.age,
      basic_details.pob,
      basic_details.gender,
      basic_details.nationality,
      basic_details.religion,
      basic_details.mstatus,
    ],
    (err) => {
      if (err) {
        logger.error("Error storing basic details: " + err.sqlMessage);
        res.json({ message: "Error Storing details to db" });
        return;
      }
      dbConnection.execute(
        "UPDATE user_detail_flags SET isBasicDetailsEditable = 0 WHERE username = ?",
        [basic_details.username],
        (err) => {
          if (err) {
            logger.error("Error setting basic details flag" + err.sqlMessage);
            res.json({ message: "Error Storing details to db" });
            return;
          }
          res.json({ message: "Data Posted sucessfully" });
        }
      );
    }
  );
});

router.post("/get-basic-details", async (req, res) => {
  const userName = req.body.username;
  console.log(req.body.username);

  dbConnection.execute(
    "SELECT * FROM user_basic_details WHERE username = ? ",
    [userName],
    (err, rows) => {
      if (err) {
        logger.error("Error retriving basic details" + err.sqlMessage);
        return;
      }
      console.log(rows[0]);
      res.json({ message: "User Details fetched", data: rows[0] });
    }
  );
  
});

module.exports = router;

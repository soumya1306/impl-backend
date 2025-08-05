const express = require("express");
const jwt = require("jsonwebtoken");

const dbConnection = require("../utils/database");
const logger = require("../utils/logger");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  dbConnection.query(
    "SELECT * from user_auth WHERE username = ? AND password = ?",
    [username, password],
    (err, rows) => {
      if (err) {
        logger.error("Error Occured while connecting to database" + err);
        return;
      }

      const user = rows[0];
      if (user && user.password === password) {
        const jwtToken = jwt.sign(
          { userId: user.id,
            role: user.role },
          process.env.SECRET_KEY
        );
        console.log({ token: jwtToken, role: user.role });
        res.json({ token: jwtToken, role: user.role });
      } else {
        res.status(401).json({ message: "Invalid Creds" });
        logger.error("Invalid cred");
      }
    }
  );
});

module.exports = router;

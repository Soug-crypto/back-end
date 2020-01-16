const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../database-mongo/users");
const { signUpValidation } = require("../../validation");

require("dotenv").config();

const router = express.Router();

router.post("/signup", (req, res) => {
  let { username, email, password } = req.body;

  const validation = signUpValidation({ username, email, password });
  if (validation.error) {
    return res.json({
      saved: false,
      msg: validation.error.details[0].message
    });
  }
  User.saveUser(username, email, password)
    .then(savedUser => {
      user = {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      };
      const secret = process.env.JWT_SECRET || "SoSecretThatYouWantToKnowIt";
      const expire = 3600;
      const token = jwt.sign(user, secret, {
        expiresIn: expire
      });
      return res.status(201).send({ saved: true, user, token });
    })
    .catch(err => {
      res.status(201).json({
        saved: false,
        msg: "There is already an account with this email"
      });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  User.findUser(email, password)
    .then(savedUser => {
      if (savedUser.found) {
        userInfo = {
          _id: savedUser.user._id,
          username: savedUser.user.username,
          email: savedUser.user.email
        };
        const secret = process.env.JWT_SECRET || "SoSecretThatYouWantKnowIt";
        const expire = 3600;
        const token = jwt.sign(userInfo, secret, {
          expiresIn: expire
        });
        return res.send({ found: true, token });
      } else {
        res.status(201).json({ found: false, msg: "Wrong password or email" });
      }
    })
    .catch(err => res.status(500).json({ err }));
});

module.exports = router;

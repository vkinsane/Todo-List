const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User Model
const User = require("../../models/User");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "796409146798-736s4dc71rnhqdb472h1nh0kr7evh027.apps.googleusercontent.com"
);

//@route Google api/auth/googleauth
//@desc  Google Auth A User
//@access Public
router.post("/googleauth", (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "796409146798-736s4dc71rnhqdb472h1nh0kr7evh027.apps.googleusercontent.com",
    })
    .then((userData) => {
      const { email } = userData.payload;
      // Check for existing user
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          return res.status(400).json({
            msg: "User does not exists",
          });
        }
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                list_id: user.list_id,
              },
            });
          }
        );
      });
    });
});

//@route POST api/auth
//@desc  Auth A User
//@access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please Enter all fields" });
  }

  //Check for existing user
  User.findOne({
    email: email,
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: "User Doesnot Exists",
      });
    }
    //validate passsword
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid Credentials",
        });
      }

      //If Credentials Matched
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              list_id: user.list_id,
            },
          });
        }
      );
    });
  });
});

//@route GET api/auth/user
//@desc  Get user data
//@access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.json(user);
    });
});

module.exports = router;

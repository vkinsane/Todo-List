const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
//User Model
const User = require("../../models/User");

//@route GET api/users
//@desc GET All Users
//@access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

//@route POST api/users
//@desc  Create A User
//@access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please Enter all fields" });
  }

  //Check for existing user
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      list_id: "default",
    });

    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser.save().then((user) => {
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
  });
});

//@route PUT api/items
//@desc  Update the User [ List Id ]
//@access Private
router.put("/updateUser", (req, res) => {
  User.updateOne(
    { _id: req.body._id },
    {
      list_id: req.body.list_id,
      // $set: {
      //   list_id: "cool",
      // },
    }
  ).then((item) => res.json(item));
});

//@route DELETE api/users/:id
//@desc  Delete A User
//@access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.remove().then(() =>
        res.json({
          success: true,
        })
      );
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
      })
    );
});

module.exports = router;

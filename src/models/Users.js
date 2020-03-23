const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken")

var Users = new Schema({
  userType: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please enter your password!");
      } else if (validator.equals(value.toLowerCase(), "password")) {
        throw new Error("Password is invalid");
      } else if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password should not contain password!");
      }
    }
  },
  tokens: 
    {
      token: {
        type: String,
      }
    }
});

Users.pre("save", function(next){
  const user = this;
  bcrypt.genSalt(10, (err, salt) => 
    {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      } else {
        bcrypt.hash(user.password, salt, (err, hashed) => {
          if (err) {
            return next(err);
          }
          user.password = hashed;
          next();
        });
      }
    })
});
module.exports = mongoose.model("Users", Users);

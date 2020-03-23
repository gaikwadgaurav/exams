const bcrypt = require('bcrypt')
const Users = require('../models/Users')
const HttpStatus = require('../HttpStatus/index')
const mWare = require('../middlewares/Middleware')
const secretKey = "secretKey"
const jwt = require("jsonwebtoken")
const EXPIRES_IN_MINUTES = "480m"; //8 hours
module.exports = {
    //INSERT
    insertUser: async (req, res, next) => {
      try {
        const body = req.body;
        console.log('body', body)
        if (Object.keys(body).length === 0 && body.constructor === Object) {
          return res.status(HttpStatus.unauthorized).json({
            success: false,
            error: "must provide a user" || next(err)
          });
        } else {
          const user = await Users.create(body);
          return res.json({ message: "User added successfully.",data:user });
        }
      } catch (error) {
        return res.status(HttpStatus.serverError).json({
          message: "Something went wrong. Please try again" || next(err)
        });
      }
    },

    //Get User By ID
    getUserById: async (req, res, next) => {
      try {
        const userId = req.params.id;
        const user = await Users.findById({ _id:userId });
        return res.json({
          message: "User information",
          data: user
        });
      } catch (error) {
        res.err;
        return res.status(HttpStatus.serverError).json({
          message: "Server Issue" || next(err)
        });
      }
    },

  //AUTHENTICATING USER LOGIN
  Login: async (req, res, next) => {
    try {
      const body = req.body;
      const email = body.email;
      const password = body.password;
      const user = await Users.findOne({ email });
      bcrypt.compare(password, user.password, async function(err, result) {
        if (result === true) {
          const payload = { id: user._id, email: user.email };
          const token = jwt.sign(payload, secretKey, {
            expiresIn: EXPIRES_IN_MINUTES
          });
          return res.status(HttpStatus.OK).json({
            success: true,
            payload,
            token,
            message: "Logged in Successfull"
          });
        } else {
          return res.status(HttpStatus.notAcceptable).json({
            success: false,
            error: "Password doesn't match"
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
}




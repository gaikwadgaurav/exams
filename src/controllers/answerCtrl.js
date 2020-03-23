const Answers = require("../models/Answers");
const HttpStatus = require("../HttpStatus/index");
const mongoose = require('mongoose')
module.exports = {
  insertAnswers: async (req, res, next) => {
    console.log("answersList", req.body);
    try {
      const body = req.body;
      if (Object.keys(body).length === 0 && body.constructor === Object && !body) {
        return res.status(HttpStatus.badRequest).json({
          success: false,
          error: "Invalid"
        });
      } else {
        const answer = await Answers.create(body);
        return res.json({
          message: "Answer added successfully",
          data: answer
        });
      }
    } catch (e) {
      return res.status(HttpStatus.serverError).json({
        message: "Something went wrong. Please try again" || next(err)
      });
    }
  },
};

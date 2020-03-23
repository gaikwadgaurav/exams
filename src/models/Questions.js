var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Questions = new Schema(
  {
    questionTitle: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000
    },
    usersInfo:{
      type: Schema.Types.ObjectId,
      ref:"Users"
    },
    answerId:[{
        type: Schema.Types.ObjectId,
        ref:"Answers"
    }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Questions", Questions);

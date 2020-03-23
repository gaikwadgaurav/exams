var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Answers = new Schema({
  answerOptions:{
    type: Array,
    validate:{
      validator:function(value){
        return value && value.length ===4;
      },
      message: "There should be atleast 4 answer option"
    },
    required: true,
  },
  correctOptions: {
      type: String,
      required:true,
  },
  questionId:{
    type: Schema.Types.ObjectId,
    ref:"Questions"
  }
});
module.exports = mongoose.model("Answers",Answers);

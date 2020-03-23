var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Answers = new Schema({
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate"
  },
  questionSet: {
    type: Schema.Types.ObjectId,
    ref: "QuestionSet"
  },
  questionAnswers: {
    type: [Answer]
  },
  totalScore: {
    type: Number
  },
  isPassed: {
    type: Boolean,
    default: false
  },
  timestamps: true
});
module.exports = {
  Answers
};

export const CandidateQuestionAnswer = mongoose.model(
  "CandidateAnswer",
  CandidateQuesAnswerSchema
);

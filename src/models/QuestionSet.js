var mongoose = require('mongoose')
var Schema = mongoose.Schema

var QuestionSet = new Schema({
    questions:{
        type:Schema.Types.ObjectId,
        ref:"Questions"
    },
    answers:{
        type:Schema.Types.ObjectId,
        ref:"Answers"
    }
},{timestamps:true})
module.exports = mongoose.model("QuestionSet",QuestionSet)

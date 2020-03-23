const Questions = require("../models/Questions");
const UserCtrl = require("./userCtrl");
const HttpStatus = require("../HttpStatus/index");

module.exports = {
  insertQuestions: async (req, res, next) => {
    try {
      const body = req.body;
      console.log("body", body);
      if (Object.keys(body).length === 0 && body.constructor === Object) {
        return res.status(HttpStatus.badRequest).json({
          success: false,
          error: "Invalid"
        });
      } else {
        const question = await Questions.create(body);
        return res.json({
          message: "Question added successfully",
          data: question
        });
      }
    } catch (e) {
      return res.status(HttpStatus.serverError).json({
        message: "Something went wrong. Please try again" || next(err)
      });
    }
  },
  list:async(req,res) =>{
      try{
        if(res.status == HttpStatus.notFound){
            return res.json({
                success: false,
                message: "No data found"
            })
        }else{
            const id = req.params.id;
            const qlist = await Questions.findById(id)
            .populate("answerId")
            return res.json({message: "Question Set",data: qlist})
        }
      }catch(e){
          console.log('e', e)
      }
  }
};


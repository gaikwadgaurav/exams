const UserCtrl = require('../controllers/userCtrl');
const AnswerCtrl = require('../controllers/answerCtrl');
const QuestionCtrl = require('../controllers/questionCtrl');
const mWare = require("../middlewares/Middleware");
let router = require("express").Router();
router.post("/insert", UserCtrl.insertUser);
router.post("/insertAnswers", AnswerCtrl.insertAnswers)
router.post("/insertQuestions",mWare.auth,mWare.userType,QuestionCtrl.insertQuestions)
router.get("/qlist/:id",QuestionCtrl.list)
router.get("/getUser/:id",UserCtrl.getUserById)
router.post("/login",UserCtrl.Login)
module.exports = router;


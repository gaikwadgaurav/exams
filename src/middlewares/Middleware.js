const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const User = require("../models/Users");

const auth = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] ||
      req.headers["x-access-token"].replace("Bearer", "").trim();
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    const user = await User.findOne({ _id: decoded.id});
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ Error: "Please Authenticate" });
  }
};
const userType = async (req,res,next)=>{
    try{
        const result = await User.findOne({userType:"admin"});
        if(!result){
            throw new Error();
        }
        req.result = result;
        next();
    }catch(e){
        res.status(401).send({Error:"Not Allowed || Not Matched"})
    }
};
module.exports = {
  auth,
  userType
};

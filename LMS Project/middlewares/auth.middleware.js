import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isloginedIn=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new AppError("Unsuthincates, Please login again",401))
    }

    const userDetails=await jwt.verify(token,process.env.JWT_SECRET)
    req.user=userDetails;

    next();
}

export{
    isloginedIn
}
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOptions={
    maxage:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}

const register=async(req,res)=>{
    const {fullName,email,password}=req.body;
    if(!fullName || !email || password){
        return next (new AppError("All fiils are required",400));
    }

    const userExist=await User.findOne({email});
    if(userExist){
        return next (new AppError("Email is alrady Exist",400));
    }

    const user=await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            // secure_url:
        }
        
    })

    if(!user){
        return next (new AppError("User registration faild,Please try again",400));
    }

    // TODO: File Upload

    await user.save();

    user.password=undefined;

    const token=await user.generateJWTToken();

    res.cookie("token",token,cookieOptions)

    res.status(201).json({
        success:true,
        message:"user register successfully",
        user,
    })
}
const login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return next(new AppError("All field are required",400));
        }
    
        const user=await User.findOne({
            email
        }).select(+password);
    
        if(!password || !user.compairePassword(password)){
            return next(new AppError("Email or password does not match",400))
        }
    
        const token=await user.generateJWTToken();
        user.password=undefined;
    
        res.cookie("token",token,tokenOptions)
    
        res.status(200).json({
            success:true,
            message:"User logined successfully",
            user,
        })
    } catch (e) {
        return next(new AppError(e.message,500))
    }
}
const logout=(req,res)=>{
    res.cookie("token",null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"User logout successfully"
    })
}
const getprofile=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId);
        
        res.status(200).json({
            success:true,
            message:"User details",
            user
        })
    } catch (e) {
        return next(new AppError("Faild to fatch user details",400))
    }
}

export{
    register,
    login,
    logout,
    getprofile
}
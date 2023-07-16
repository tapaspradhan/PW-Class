import AppError from "../utils/error.util";

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

    res.status(201).json({
        success:true,
        message:"user register successfully",
        user,
    })
}
const login=(req,res)=>{

}
const logout=(req,res)=>{

}
const getprofile=(req,res)=>{

}

export{
    register,
    login,
    logout,
    getprofile
}
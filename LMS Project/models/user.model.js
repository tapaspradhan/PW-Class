import{Schema,model} from "mongoose";
import bcript from "bcriptjs"

const userSchema= new Schema({
    fullName:{
        type:"String",
        required:[true,"Name is Required"],
        minLength:[5,"Name at lest  5 charctor"],
        maxLength:[50,"Name shoud be less then 50 charctor"],
        lowercase:true,
        trim:true
    },
    email:{
        type:"String",
        required:[true,"Email is required"],
        lowercase:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please fill in a valid email address"
        ]
    },
    password:{
        type:"String",
        required:[true,"Password is required"],
        minLength:[8,"Password atlest 8 charactor"],
        select:false
    },
    avatar:{
        publid_id:{
            type:"String"
        },
        secure_url:{
            type:"String"
        }
    },
    role:{
        type:"String",
        enum:["USER","ADMIN"],
        default:"USER"
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcript.hash(this.password,10);
})

const User=model("User",userSchema);

export default User;
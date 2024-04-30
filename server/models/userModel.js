import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please provide Username"],
        unique:[true,"Username already exists."]
    },
    email:{
        type:String,
        required:[true,"Please provide your Email address"] ,
        unique:true
    },
    password:{
        type:String,
        require:[true,"Please provide a password"],
        unique:false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        } 
    ],
    cart:[
        {}
    ]
});

UserSchema.methods.generateJWT=async function(){
    try{
        let token=jwt.sign({_id:this._id,username:this.username,email:this.email,cart:this.cart},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

export default mongoose.model.users || mongoose.model("user",UserSchema);
const {model,Schema}=require("mongoose");
const userSchema=new Schema({ name:String,
    email:{
        type:String,
        required:true,
        unique:true,

    },
    role:{
        type:String,
        required:true,
        enum:["admin","user"]
    },
    password:{
        type:String,
        required:true,

    },
   
})
const userModel=model("user",userSchema);

module.exports=userModel
const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const userModel = require("./models/userModel");
const jobModel = require("./models/jobsModel");

const app=express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
 res.send("api is working")
})
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email});
    if(user){
     const verification=user.password==password;
        if(verification){
            const token= await jwt.sign({id:user.id,email},"SECRET1234",{expiresIn:"7 days"});
             return res.status(200).send({message:"Login Successful",token,role:user.role})
        }else{
            return res.status(401).send({message:"Invalid Credentials"})
        }
    }else{
        return res.status(404).send({message:"email not found"})
    }
   })
app.post("/signup",async(req,res)=>{
    const { email,password,name} = req.body;
    if(email.includes("@masaischool.com")){
        const user = await userModel.create({ email: email,password:password,name:name,role:"admin"})
        user.save();
        res.send({message:"Sign up Successful"});
    }else{
        const user = await userModel.create({ email: email,password:password,name:name,role:"user"})
        user.save(); 
        res.send({message:"Sign up Successful"});
    }
   
})
app.post("/jobs",async(req,res)=>{
    const { company,contract,position,location} = req.body;
    const job=await jobModel.create({ company:company,contract:contract,position:position,location:location})
    job.save();
    res.send({message:"Successfully posted"});
   
})
app.get("/jobs",async(req,res)=>{
    const { company,contract,position,location} = req.body;
    const jobs=await jobModel.find()
    res.send(jobs);
   
})
app.delete("/jobs/:id",async(req,res)=>{
    const {id} = req.params;
    const jobs=await jobModel.deleteOne({_id:id})
    res.send({message:"Successfully deleted"});
   
})
app.put("/jobs/:id",async(req,res)=>{
    const {id} = req.params;
    const { company,contract,position,location} = req.body;
    const jobs=await jobModel.updateOne({_id:id},{$set:{company,contract,position,location}});
    res.send({message:"Successfully edited"});
   
})
mongoose.connect("mongodb+srv://sudarshan:sudarshan@cluster0.ydgncyl.mongodb.net/mock13").then(()=>{
    app.listen(8002,()=>{
        console.log("server started")
    })
})
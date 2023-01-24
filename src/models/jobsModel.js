const {model,Schema}=require("mongoose");
const jobSchema=new Schema({ position:{
    type:String,
    required:true,

},
    company:{
        type:String,
            required:true,

    },
    contract:{
        type:String,
        required:true,
       
    },
    location:{
        type:String,
        required:true,

    },
   
})
const jobModel=model("job",jobSchema);

module.exports=jobModel
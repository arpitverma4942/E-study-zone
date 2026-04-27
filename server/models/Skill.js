const mongoose=require('mongoose')
const skillSchema=mongoose.Schema({
    skill:{
       type:String,
       required:true,
       unique:true

    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    
},
{
    timestamps:true
}
)

module.exports=mongoose.model("Skill",skillSchema)
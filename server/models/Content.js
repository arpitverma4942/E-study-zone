const mongoose=require('mongoose')
const contentSchema=mongoose.Schema({
    skillId:{
        type:mongoose.Schema.ObjectId,
        ref:"Skill"
    },
    file:{
        type:String
    },
   
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:['draft','publish']
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Content',contentSchema)
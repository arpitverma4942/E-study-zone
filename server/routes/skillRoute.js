const express=require('express')
const routes=express.Router()
const Skill=require('../models/Skill')


routes.post('/skill',async(req,res)=>{

    try{
        const{skill,description}=req.body
        const isSkill =await Skill.findOne({skill:skill})
        if(isSkill){
            return res.json({msg:"Skill already added"})
        }
        const issSkill=await new Skill(req.body)
        await issSkill.save()
        res.json({msg:"Skill added successfully"})
    }
    catch(er){
        console.log(er);
        res.json({msg:"Skill is not added"})
        
    }
})



routes.get('/getsskill/:id',async(req,res)=>{
    try{
       const data=await Skill.find({userId:req.params.id})
       res.json({msg:"Successfully get skills",data:data})
    }
    catch(er){
        console.log(er);
        res.json({msg:"Sorry try again"})
        
    }
})
// find skill by user id
routes.get('/getskill/:id',async(req,res)=>{
    try{
       const data=await Skill.find({ userId:req.params.id})
       res.json({msg:"Successfully get skills",data:data})
    }
    catch(er){
        console.log(er);
        res.json({msg:"Sorry try again"})
        
    }
})


routes.delete('/deleteskill/:id',async(req,res)=>{

    try{
        const data=await Skill.findByIdAndDelete(req.params.id)
        res.json({msg:"Skill deleted successfully"})
    }
    catch(er){
        console.log(er);
        res.json({msg:"Sorry try again"})
        
    }
})

module.exports=routes
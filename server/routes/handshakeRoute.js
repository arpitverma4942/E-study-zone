const express=require('express')
const routes=express.Router()
const Handshake=require('../models/Handshake')

routes.post('/request/:id',async(req,res)=>{
    const {trainerId,learnerId,status}=req.body
    try{
        const data=await new Handshake({
            trainerId:req.params.id,
            learnerId:learnerId,
            status:status
        })
        data.save()
        res.json("Request Sended Successfully")
    }catch(er){
        console.log(er);
        res.json("Sorry")
        
    }
})

//for trainer

routes.get('/:id',async(req,res)=>{
  const data=await Handshake.find({trainerId:req.params.id}).populate('learnerId')
  res.json(data)
})

routes.patch('/accept/:id',async(req,res)=>{
        const data=await Handshake.findByIdAndUpdate(req.params.id,{status:"accepted"});
        res.json("request accepted")
})

routes.patch('/reject/:id',async(req,res)=>{
        const data=await Handshake.findByIdAndUpdate(req.params.id,{status:"rejectd"});
        res.json("request rejected")
})

module.exports=routes
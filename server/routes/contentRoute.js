const express=require('express')
const routes=express.Router()
const Content=require('../models/Content')
const Handshake=require('../models/Handshake')
const path=require('path')
const multer=require('multer')
const { log } = require('console')
  const  upload=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join("./public/uploads/"))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const uploadFile=multer({storage:upload})

routes.post('/upload',uploadFile.single('content'),async(req,res)=>{
try{
    const {skillId,content,userId}=req.body;
    const data=await new Content({
        skillId:skillId,
        file:req.file.path,
        userId:userId
    })
   await data.save()
   res.json({msg:"Content Successfully upload"})
}
catch(er){
    console.log(er);
    
    res.json({msg:"Server error"})
}

})

// get content by userId
routes.get('/get/:id', async (req, res) => {
  try {
    const data = await Content.find({ userId: req.params.id }).populate('skillId') // use find instead of findOne
      
    res.json({ msg: "Successfully fetched content", data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Sorry, try again" })
  }
})

// delete content bu id

routes.delete('/delete/:id', async (req, res) => {
  try {
    const data = await Content.findByIdAndDelete( req.params.id )
      
    res.json({ msg: "Successfully Delete Content",})
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Sorry, try again" })
  }
})

//search content api's

routes.post('/search',async(req,res)=>{
  const {query}=req.body
  try{
    const data=await Content.find().populate('skillId').populate('userId')
    const result=data.filter((item)=>{
      return item.skillId.skill.toLowerCase()==query.toLowerCase()
    }
  )
  res.json(result)
  }
  catch(er){
    console.log(er);
    res.json("Server error")
    
  }
})

// routes.get('/getcontent/:id',async(req,res)=>{
//   try{
//     const data = await Handshake.find({learnerId:req.params.id,status:"accepted"});
//     const result = await Content.find({userId:data[0].trainerId}).populate("skillId")
//     res.json(result)
//   }catch(er){
//     console.log(er);
//     res.json("server error")
    
//   }
// })

routes.get('/getcontent/:id', async (req, res) => {
  try {
    // Find all accepted handshakes for this learner
    const handshakes = await Handshake.find({ learnerId: req.params.id, status: "accepted" });

    if (!handshakes.length) {
      return res.json({ msg: "No accepted handshakes found", data: [] });
    }

    // Collect trainerIds from all accepted handshakes
    const trainerId = handshakes.map(h => h.trainerId);

    // Fetch all content for those trainers
    const contents = await Content.find({ userId: { $in: trainerId } }).populate("skillId").populate("userId", "name email");;

    res.json({ msg: "Content fetched successfully", data: contents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

routes.get("/count/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const count = await Content.countDocuments({ userId });
    res.json({ msg: "Trainer content count fetched successfully", count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error counting trainer content" });
  }
});

module.exports=routes
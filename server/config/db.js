const mongoose=require('mongoose')
const MongoDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Db is connected");
    
    })

    .catch(()=>{
        console.log("Db is not connected");
        
    })
}
module.exports=MongoDB;
const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const rateLimit=require('express-rate-limit')
const MongoDB=require('./config/db')
const cluster=require('cluster')
const os=require('os')
dotenv.config();
if(cluster.isPrimary){
    for(i=1;i<=os.availableParallelism;i++){
        cluster.fork();
    }
    cluster.on('fork',(Worker)=>{
        console.log(Worker.process.pid);
        
    })
}
else{
const app=express();
app.use(cors())
app.use(express.json())
MongoDB();

const a=rateLimit({    
    windowMs:1000*60,
    limit:10,
    message:"limit exceed ho gyi"
})

// app.use(a)


  

//api's started
app.use('/api/user',a,require('./routes/userRoute'))
app.use('/api/admin',require('./routes/adminRoute'))
app.use('/api/skill',require('./routes/skillRoute'))
app.use('/api/content',require('./routes/contentRoute'))
app.use('/api/handshake',require('./routes/handshakeRoute'))

//admin api's
app.use('/api/admin',require('./routes/adminRoute'))


// for serving static files
app.use('/api/public',express.static('public'))
//api's ended




app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:5000");
    
})


}














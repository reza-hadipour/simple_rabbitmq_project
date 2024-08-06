// Auth service

const express = require('express');
const { authHandler } = require('./handler/auth');
const app = express();

const {PORT} = process.env;

require('./config/mongodb');
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/auth",authHandler);

app.use((req,res,next)=>{
    return res.json({error: "NotFound"});
})


app.use((error,req,res,next)=>{
    return res.json({error: error.message});
})


app.listen(PORT,()=>{
    console.log(`Auth service is running on port ${PORT}...`);
})
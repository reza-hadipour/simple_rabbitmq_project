// Product Service

const express = require('express');
const { productHandler } = require('./handler/product');
const app = express();

const {PORT} = process.env;

require('./config/mongodb');
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/product",productHandler);

app.use((req,res,next)=>{
    return res.json({error: "NotFound"});
})


app.use((error,req,res,next)=>{
    return res.json({error: error.message});
})

app.listen(PORT,()=>{
    console.log(`Product service is running on port ${PORT}...`);
})
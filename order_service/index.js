// Order Service

const express = require('express');
const { orderRoutes } = require('./handler/order.routes');
const { createOrderWithQueue } = require('./config/rabbitmq.config');
const app = express();

const {PORT} = process.env;

require('./config/mongodb');
app.use(express.json());
app.use(express.urlencoded({extended:true}))

createOrderWithQueue("ORDER");

app.use("/order",orderRoutes);

app.use((req,res,next)=>{
    return res.json({error: "NotFound"});
})


app.use((error,req,res,next)=>{
    return res.json({error: error.message});
})


app.listen(PORT,()=>{
    console.log(`Order service is running on port ${PORT}...`);
})
const isAuthenticated = require('../config/isAuthenticated');
const { pushToQueue, returnChannel, createQueue } = require('../config/rabbitmq.config');
const productModel = require('../model/product');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.post('/create', async (req,res,next)=>{
    try {
        const {name, price} = req.body;

        const newProduct = await productModel.create({name,price});
        return res.json({
            message: "New product created.",
            product : newProduct
        })

    } catch (error) {
        next(error)
    }
    
})

router.post("/buy", isAuthenticated, async (req,res,next)=>{
    try {
        const {productId = []} = req.body;
        const products = await productModel.find({_id : {$in : productId}});

        const customerEmail = req.user['email'];

        await pushToQueue("ORDER",{products, email: customerEmail});

        let {channel,queueDetail} = await createQueue("PRODUCT");
        channel.consume("PRODUCT", async (msg)=>{
            if(msg.content){
                // console.log(queueDetail);
                const newOrder = JSON.parse(msg.content.toString());
                console.log(`New Order created: ${newOrder._id}, total: ${newOrder.totalPrice}`);
                channel.ack(msg);
            }
        })
        
        return res.json("Order is registered.")

    } catch (error) {
        next(error);
    }
})

module.exports.productHandler = router;
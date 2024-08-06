const amqp = require('amqplib');
const orderModel = require('../model/order.model');

let channel;

const connectToChannel = async function(){
    try {
        let connection = await amqp.connect("amqp://127.0.0.1:5672");
        return await connection.createChannel();
        
    } catch (error) {
        console.log(`Cannot connect to rabbitMQ server, Error: ${error?.message}`);
    }
}

const returnChannel = async () => {
    if(!channel){
        channel = await connectToChannel();
    }

    return channel;
}

const createQueue = async (queueName)=>{
    const myChannel = await returnChannel();
    await myChannel.assertQueue(queueName);
    return myChannel;
}

const pushToQueue = async (queueName, data) => {
    try {
        const myChannel = await returnChannel();
        myChannel.assertQueue(queueName);
        return myChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(
            error
        );
    }
}

const createOrderWithQueue = async (queueName) => {
    try {
        const myChannel = await createQueue(queueName);
        myChannel.consume(queueName, async (msg) => {
            if(msg.content){
                const {products , email} =  JSON.parse(msg.content.toString());
                const newOrder = await orderModel.create({email, products , totalPrice : (products.map( p => +p.price)).reduce((prev,current) => prev + current , 0) })
                myChannel.ack(msg);
                console.log("Order registered in order service");
                pushToQueue("PRODUCT",newOrder);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createOrderWithQueue
}
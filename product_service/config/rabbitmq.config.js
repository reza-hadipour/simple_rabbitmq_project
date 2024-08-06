const amqp = require('amqplib');

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
    const queueDetail = await myChannel.assertQueue(queueName);
    return {channel: myChannel, queueDetail};
}

const pushToQueue = async (queueName, data) => {
    try {
        const myChannel = await returnChannel();
        myChannel.assertQueue(queueName);
        return myChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(
            error.message
        );
    }
}

module.exports = {
    pushToQueue,
    returnChannel,
    createQueue
}
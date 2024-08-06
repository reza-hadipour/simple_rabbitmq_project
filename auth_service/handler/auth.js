const userModel = require('../model/user');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res,next)=>{
    try {
        const {name, email, password} = req.body;
        const existUser = await userModel.findOne({email});
        if(existUser) throw {message : "User already exists"}
        const newUser = new userModel({name,email,password});
        await newUser.save();
        return res.json({
            message: "New user created"
        })
    } catch (error) {
        next(error);
    }
})

router.post('/login', async (req,res,next)=>{
    try {
        const {email, password} = req.body;
        const existUser = await userModel.findOne({email, password});
        if(!existUser) throw {message : "Login failed"}

        jwt.sign({email, userId: existUser.id},"SecretK3Y",(error,token)=>{
            if(!error) return res.json({token});
            return res.json({error: error.message});
        })
        
    } catch (error) {
        next(error);
    }
})

module.exports.authHandler = router;
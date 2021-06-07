const router = require('express').Router();
const verify = require('./veriftyToken');
const UserPost = require('../model/UserPost');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

router.get('/',verify, (req,res) => {
    res.send(req.user);

});

router.post('/createPost', async (req, res) => {
    
   const temp = req.header('auth-token');

   

   const verified = jwt.verify(temp, process.env.TOKEN_SECRET);
     const tokenUser = verified;

     res.send(tokenUser._id);

    
    const userPost = new UserPost({
        userID: tokenUser._id,
        title: req.body.title,
        message: req.body.message,

    });

    try {
        const savedPost = await userPost.save();
        //res.send({savedPost: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});


router.get('/userPosts', async (req, res) => {
   
   
    const temp = req.header('auth-token');

   

   const verified = jwt.verify(temp, process.env.TOKEN_SECRET);
     const tokenUser = verified;

     

     const temp2 = '60a3eae6d42b365eac9d0b2c';

     try {
         const postMessage = await UserPost.find({'userID': tokenUser._id});
         res.status(200).json(postMessage);
     } catch (error) {
        res.status(404).json({ message: error.message });
     }

    
});

router.get('/allPosts', async (req, res) => {

    try {
        const postMessages = await UserPost.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


module.exports = router;
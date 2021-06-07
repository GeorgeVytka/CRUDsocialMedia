const router = require('express').Router();
const jwt = require("jsonwebtoken");
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');


//const Joi = require('joi');



router.post('/register', async (req, res) => {

    //validate the data before we create a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  

    //check if the user is already in the DB
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    
    //db
   
 

    //hash the password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);


    

    //create a new insit of the user model 
    //dont forgwt body parswer
    const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }

    
});



router.post('/login', async (req,res) =>{

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if the email exists in the DB
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email  is not correct');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');


    //create ans assign token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  
});



module.exports  = router;
//Valdation
const Joi = require('@hapi/joi');


//register validation
const registerValidation = (data) => {


const schema = Joi.object( {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

  //valdation
    //return an object
    return schema.validate(data);
  
  
  
  
  

};

//register validation
const loginValidation = (data) => {


    const schema = Joi.object( {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    
      //valdation
        //return an object
        return schema.validate(data);
      
      
      
      
      
    
    };

    module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
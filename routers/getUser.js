const { User} = require('../db');
const express = require('express');
const router = express.Router();
const roleMiddle = require('../middlewear/roleMiddle');


async function getUsers (req, res){
    try{
      const users = await User.findAll({attributes: {exclude: ['password']}});
       return res.json(users);
    
    } catch(e){
     console.log(e);
     res.status(400).json({message: "Dont get users"});
    }
   }
  
   router.get('/users', roleMiddle , getUsers); 
 
 module.exports = router ;

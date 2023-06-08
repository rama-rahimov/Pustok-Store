const {secret} = require('../config');
const jwt = require('jsonwebtoken');
const {User} = require('../db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

function generetAccessToken (id, roleId) {
    const payload = {
       id ,
       roleId
    }
 
    return jwt.sign(payload, secret, {expiresIn: "24h"});
 }

async function login (req, res){
    try{
      const {full_name, password, email} = req.body ;
      const user = await User.findOne({where: {email: email}});
      if(!user){
         res.status(400).json("We don't find user");
      }
      await bcrypt.compareSync(password, user.password);
      const token = generetAccessToken(user.id, user.roleId);
      return res.json({token});
    } catch(error){
      console.log(error);
      res.status(400).json({message: "Authorization failed"});
    }
   }

   router.post('/login', login);

   module.exports = router ;
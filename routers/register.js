const {check} = require('express-validator');
const {User , Role} = require('../db');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const express = require('express');
const router = express.Router();


async function registration (req, res){
    try{
      const error = validationResult(req);
      if(!error.isEmpty()){
         return res.status(400).json({message: "Error status", error});
      }
    const {full_name, password, password2, email} = req.body ; 
    const condidate = await User.findOne({where:{ email: email }});
    if(condidate != null){
     return res.status(400).json({message: 'This full_name exists'});
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const equal = await bcrypt.compareSync(password2, hashPassword);
   if(!equal){
    return res.status(400).json({message: "Passwords dont equal"});
   }
    
   const roleName = await Role.findOne({where: {id: 2}});
   const idRole = roleName.id ;
     await User.create({full_name: full_name, password: hashPassword, email: email, roleId: idRole});
    res.json({message: "Registration completed successfully"}); 
    } catch(error){
     return res.json(error)
    }
   }

router.post('/register',[
    check('full_name', ("full_name dont true")).isLength({min: 3, max: 20}),
    check('password', ("password must be bigger 4 and menshe 10")).isLength({min: 5, max: 25}),
    check('password2', ("password must be bigger 4 and menshe 10")).isLength({min: 5, max: 25}),
    check('email', ("Email is not correct")).isEmail(),
  ], registration);

module.exports = router ;
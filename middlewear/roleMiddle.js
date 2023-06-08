const {secret} = require('../config');
const jwt = require('jsonwebtoken');
const {Role, User} = require('../db');


module.exports = async function(req, res, next){
        try{
            if(req.method === "OPTIONS"){
                next();
            }
            let role = 1 ;
         const token = req.headers["authorization"];
         const decoded = await jwt.verify(token, secret);
         const takeRole = await User.findOne({where:{id: decoded.id}});
         if(takeRole.roleId !== role){
            return res.status(400).json("This is wrong role");
         }
         
         next();
        } catch(e){
            console.log(e);
            res.status(400).json({message: "User not authorized"})
        }
    }
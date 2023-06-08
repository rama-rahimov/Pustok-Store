const express = require('express');
const { User } = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const bcryptjs = require('bcryptjs');

const updatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body ;
        const token =  req.headers["authorization"] ;
        const descode = await jwt.verify(token, secret);
        const user = await User.findOne({where:{id: descode.id}});
        const comparePassword = await bcryptjs.compare(oldPassword, user.password);
        if(!comparePassword){
            return res.json("password dont true");
        }
        const hashPassword = await bcryptjs.hash(newPassword, 7);
        await User.update({password:hashPassword},{where:{id: descode.id}});
        res.json("Password update");
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

router.put('/update-password', updatePassword);

module.exports = router ;
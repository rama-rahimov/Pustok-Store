const express = require('express');
const router = express.Router();
const {User} = require('../db');
const {Op} = require('sequelize');

const getOneUser = async(req, res) => {
    const id = req.query.id ;
    const user = await User.findAll({where: {id: {[Op.like]: `%${id}`}}});
    if(!user){
    return res.state(400).json("This id not found");
    }
   res.json({message: user});
}

router.get('/get-user', getOneUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const {Adress, User} = require('../db');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');


async function adress (req, res) {
    try{
    const token = req.body.token || req.query.token || req.headers["authorization"];
    const descoded = await jwt.verify(token, secret);
    const {country, city, region, street, home} = req.body ;
    await Adress.create({country , city , region , street , home });
    const takeIdAdress = await Adress.findOne({where: {street, home}});
    await User.update({adressId: takeIdAdress.id }, {where:{id: descoded.id}});
    res.json(takeIdAdress);
    } catch(error) {
        console.log(error);
        res.json({message: error});
    }
}

router.post('/adress', adress);

module.exports = router ;
const express =  require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const {User} = require('../db');
const { where } = require('sequelize');
const {secret} = require('../config');

const addInfoUser = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["authorization"];
        const descoded = await jwt.verify(token, secret);
        const {tel} = req.query ;
        await User.update({tel}, {where: {id: descoded.id}});
        const newUser = await User.findAll({where: {id: descoded.id}});
        res.json(newUser);
    } catch (error) {
        res.json(error);
    }
}

router.put('/add-infoabout-user', addInfoUser);

module.exports = router ;
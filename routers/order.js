const express = require('express');
const router = express.Router();
const {Order, User, Basket, Book, Order_detail} = require('../db');
const {secret} = require('../config');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { or } = require('sequelize');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

async function order (req, res) {
    try{
     const {required_date, shipped_date} = req.body ;
     const token = req.body.token || req.query.token || req.headers["authorization"];
     const descoded = await jwt.verify(token, secret);
     const userIdandAdress = await User.findOne({where: {id: descoded.id}});
     const order = await Order.create({required_date, shipped_date, userId: userIdandAdress.id, adressId: userIdandAdress.adressId});
     await Order_detail.update({order_id: order.id});
     await Basket.drop({where:{id :{[Op.gt]: 0}}});
     res.json("Order completed successfully");
    } catch(error) {
      return res.json(error);
    }
}

router.post('/order', order);

module.exports = router ;
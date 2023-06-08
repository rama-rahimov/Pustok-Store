const express = require('express');
const router = express.Router();
const {Order_detail, Order, Book, Basket, User} = require('../db');
const { where } = require('sequelize');
const {secret} = require('../config');
const jwt = require('jsonwebtoken');

async function orderDetail (req, res) {
    try{
    const token = req.body.token || req.query.token || req.headers["authorization"];
    const descoded = await jwt.verify(token, secret);
    const findOrder = await User.findOne({attributes:['id'], where:{id: descoded.id}, include:[{model: Order, attributes:['id'], 
    include:[{model: Basket, as: 'basket', attributes:['bookId', 'amount'], 
    include:[{model: Book, as:'book', attributes:['price', 'discount']}]}
    ]}
    ]});

    const order_details = await Order_detail.findOne({attributes:['orderId', 'bookId'], where: {bookId: findOrder.orders[0].basket.bookId , orderId: findOrder.orders[0].id}});
    if(!order_details){
        await Order_detail.create({unit_price: findOrder.orders[0].basket.book.price , 
            quantity: findOrder.orders[0].basket.amount , 
            discount: findOrder.orders[0].basket.book.discount , 
            orderId: findOrder.orders[0].id, 
            bookId: findOrder.orders[0].basket.bookId});
    } else{
        const findOrderDetails = await Order_detail.findOne({where:{bookId: findOrder.orders[0].basket.bookId , orderId: findOrder.orders[0].id}});
       res.json(findOrderDetails);
    }
    } catch(error) {
        console.log(error);
        res.json(error);
    }
}

router.get('/order-detail', orderDetail);

module.exports = router ;
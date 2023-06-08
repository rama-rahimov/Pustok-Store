const express = require('express');
const bodyParser = require('body-parser');
const {Basket, Book, Image_book, User, Order_detail} = require('../db');
const { where } = require('sequelize');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const addToCart = async(req, res) => {
    try{
        const token = req.body.token || req.query.token || req.headers["authorization"];
        const descoded = await jwt.verify(token, secret);
        if(!token){
            return res.json("Not have token");
        }
        const name_book = req.body.name_book ;
        const book = await Book.findOne({where:{name: name_book}});
        const basketBookId = await Basket.findAll({where:{bookId:book.id, userId: descoded.id}});
        if(basketBookId.length !== 0){
            await Basket.create({bookId: book.id, userId: descoded.id});
            const findBasketLength = await Basket.findAll({where:{bookId:book.id, userId: descoded.id}});
            await Basket.update({amount: findBasketLength.length}, {where: {bookId: book.id, userId: descoded.id}});
            const infoOrderDetails = await Book.findOne({where:{id: book.id}, attributes:['name', 'price', 'discount'], include:[{model: Basket, as:"basket", attributes:['amount']}]});
            await Order_detail.update({quantity: infoOrderDetails.basket.amount});
            res.status(200).json({success: true, msg: "U nas poluchilos ))))"});
        }else{
            await Basket.create({bookId: book.id, userId: descoded.id});
            const infoOrderDetails = await Book.findOne({where:{id: book.id}, attributes:['name', 'price', 'discount'], include:[{model: Basket, as:"basket", attributes:['amount']}]});
            await Order_detail.create({unit_price: infoOrderDetails.price, quantity: infoOrderDetails.basket.amount, discount: infoOrderDetails.discount, book_name: infoOrderDetails.name});
            res.status(200).send({success: true, msg: "U nas poluchilos ))))", data: prostoCreateNew}); 
        } 
    } catch(error){
        res.status(400).send({success: false, msg: "Nevishlo no nado staratsa dalshe"});
    }
}

router.post('/add-to-cart', addToCart);

module.exports = router ;
const express = require('express');
const router = express.Router();
const {Book, Publisher} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');

const book = async (req, res) => {
    try {
        const {name, page_count, publication_date, appear_date, price, discount, description, isbn, publisher} = req.body ;
        const takeBook = await Book.findOne({where:{name}});
        const takePublisher = await Publisher.findOne({where:{name: publisher}});
        if(!takePublisher){
            return res.json({message: "This publishers not have"});
        }
        if(!takeBook){
        await Book.create({name, page_count, publication_date, appear_date, price, discount, description, isbn, publisherId:takePublisher.id});
        }
        const getBook = await Book.findOne({where:{name}});
        res.json({book: getBook});
    } catch (error) {
       console.log(error);
       res.json(error); 
    }
}

router.post('/book', roleMiddle, book);

module.exports = router;
const express = require('express');
const router = express.Router();
const {Image_book, Book} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');

async function imageBook (req, res) {
    try{
    const {image, bookName} = req.body ;
    const takeImage = await Image_book.findOne({where:{image}});
    const takeBook = await Book.findOne({where: {name: bookName}});
    if(!takeImage){
      await Image_book.create({image, bookId: takeBook.id});
    }
    const getImage = await Image_book.findOne({where:{image}});
    res.json({images: getImage});
    } catch(error) {
        console.log(error);
        res.json({message: error});
    }
}

router.post('/image_book', roleMiddle, imageBook);

module.exports = router ;
const express = require('express');
const router  = express.Router();
const {Product_detail, Book, Image_book, Tag, Tag_book} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');

const productDetail = async (req, res) => {
try {
    const {nameBook} = req.body ;
    const takeBook = await Book.findOne({where:{name: nameBook}});
    const takeImage = await Image_book.findAll({where:{bookId: takeBook.id}});
    const takeTagBook = await Tag_book.findAll({where:{bookId: takeBook.id}});
    let tagAndBook = [] ;
    for(let i = 0; i < takeTagBook.length; i++){
     let nameTag = await Tag.findOne({where:{id: takeTagBook[i].tagId}});
     tagAndBook.push(nameTag.name);
    }
    let images = [] ;
    for(let i = 0 ; i < takeImage.length; i++ ){
     images.push(takeImage[i].image);
    }
    const takeProductDetail = await Product_detail.findOne({where:{bookId: takeBook.id}});
    if(!takeProductDetail){
     await Product_detail.create({brands: takeBook.name , reward_points: 60.24 , ex_tax: 34, bookId: takeBook.id, product_code: takeBook.isbn});
    }
    const getProductDetail = await Product_detail.findOne({where: {bookId: takeBook.id}});
    await Image_book.update({productDetailId: getProductDetail.id}, {where: {bookId: takeBook.id}});
    res.json({dataProduct: getProductDetail, imeges: images, tags: tagAndBook});
} catch (error) {
    console.log(error);
    res.json(error);
}
}

router.post('/product-detail', roleMiddle ,productDetail);

module.exports = router ;
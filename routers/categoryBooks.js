const express = require('express');
const router = express.Router();
const {Category, Book, Category_book} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const categoryBook = async (req, res) => {
    try {
        const {nameBook, nameCategory} = req.body ;
     const takeCategory = await Category.findOne({where:{name: nameCategory}});
     const takeBook = await Book.findOne({where:{name: nameBook}});
     const takeCategoryBooks = await Category_book.findOne({where:{bookId: takeBook.id , categoryId: takeCategory.id}});
     if(!takeCategoryBooks){
      await Category_book.create({bookId: takeBook.id , categoryId: takeCategory.id});
     }
     const findCategoryBook = await Category_book.findOne({where:{bookId: takeBook.id , categoryId: takeCategory.id}});
     res.json({data: findCategoryBook});
    } catch (error) {
    console.log(error);
    res.json(error);
    }
}

router.post('/category-book', roleMiddle, categoryBook);

module.exports = router ;

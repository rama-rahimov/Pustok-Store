const express = require('express');
const router = express.Router();
const {Tag_book, Tag, Book} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');

const tagBook = async (req, res) => {
    try {
        const {nameBook, nameTag} = req.body ;
        const takeBook = await Book.findOne({where:{name: nameBook}});
        const takeTag = await Tag.findOne({where:{name: nameTag}});
        const takeTagBook = await Tag_book.findOne({where:{bookId: takeBook.id, tagId: takeTag.id}});
        if(!takeTagBook){
            await Tag_book.create({bookId: takeBook.id, tagId: takeTag.id});
        }
        const getTakBook = await Tag_book.findOne({where:{bookId: takeBook.id, tagId: takeTag.id}});
        res.json(getTakBook);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

router.post('/tag-book', roleMiddle ,tagBook);

module.exports = router ;
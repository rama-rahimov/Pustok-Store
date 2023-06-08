const express = require('express');
const router = express.Router();
const {Book, Author, Author_book} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const authorBook = async(req, res) => {
    try {
        const {bookName, authorName, authorLastname} = req.body ;
        const takeBook = await Book.findOne({where:{name: bookName}});
        const takeAuthor = await Author.findOne({where:{name: authorName, last_name:authorLastname}});
        const takeAuthorBook = await Author_book.findOne({where:{bookId: takeBook.id, authorId: takeAuthor.id}});
        if(!takeAuthorBook){
         await Author_book.create({bookId: takeBook.id, authorId: takeAuthor.id});
        }
        const findAuthorBook = await Author_book.findOne({where:{bookId: takeBook.id, authorId: takeAuthor.id}});
        res.json(findAuthorBook);   
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

router.post('/author-book', roleMiddle, authorBook);

module.exports = router ; 
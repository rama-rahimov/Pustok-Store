const {Book} = require('../db');
const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');

router.get('/search-book', async (req, res) => {
    const name = req.query.name ;
    const books = await Book.findAll({attributes:['name'],where: {name: {[Op.substring]: name }}});
   return res.json({message: books});
});

module.exports = router ;
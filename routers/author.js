const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const {Author} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');


async function author (req, res) {
    try{
        const {name, last_name, biography} = req.body ;
        const  author = await Author.findOne({where:{name, last_name}});
        if(!author){
        await Author.create({name, last_name, biography});
        }
        const findAuthor = await Author.findOne({where:{name, last_name}});
        res.json({author: findAuthor});
    } catch(error){
        console.log(error);
        res.json({message: error});
    }
}

router.post('/author', roleMiddle ,author);

module.exports = router ;
const express = require('express');
const router = express.Router();
const {Tag} = require('../db');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const roleMiddle = require('../middlewear/roleMiddle');

async function tag (req, res) {
    try{
        const name = req.body.name ;
        const  tag = await Tag.findOne({where:{name}});
        if(!tag){
        await Tag.create({name});
        }
        const findTag = await Tag.findOne({where:{name}});
        res.json(findTag);
    } catch(error) {
        console.log(error);
        res.json(error);
    }
}

router.post('/tag', roleMiddle ,tag);

module.exports = router ;
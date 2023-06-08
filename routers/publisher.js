const express = require('express');
const router = express.Router();
const {Publisher} = require('../db');
const roleMiddle = require('../middlewear/roleMiddle');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

async function publisher (req, res) {
    try{
        const {name, description} = req.body ;
        const takePublisher = await Publisher.findOne({where:{name}});
        if(!takePublisher){
            await Publisher.create({name, description});
        }
        const getPublisher = await Publisher.findOne({where:{name}});
        res.json(getPublisher);
    } catch(err) {
        console.log(err);
        res.json({message: "Dont get publisher"});
    }
}

router.post('/publisher',roleMiddle , publisher);

module.exports = router ;
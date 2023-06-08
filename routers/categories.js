const express = require('express');
const router = express.Router();
const {Category} = require('../db');



const fetchCat = async (req, res) => {
    const getData = await Category.findAll({});
    if(getData){
     const catList = await catLists(getData);
     res.json({"Status": 200, "Data": catList});
    }
}

async function catLists (getData, parentId = false){
    let categoryList = [] ;
    let parentCatId;
    if(parentId === false){
        parentCatId =  getData.filter(result => result.parent_id == false );
    } else{
        parentCatId =  getData.filter(result => result.parent_id == parentId);
    }

    for(data of parentCatId){
        categoryList.push({
            id: data.id,
            name: data.name,
            children: await catLists(getData, data.id)
        });
    }
    return categoryList;
   }

router.get('/categories', fetchCat);

module.exports = router ;

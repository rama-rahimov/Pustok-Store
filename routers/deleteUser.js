const express = require('express');
const router = express.Router()
const {User} = require('../db');

const deleteUser = async (req, res) => {
    const full_name = req.query.full_name ;
    await User.destroy({where:{full_name}});
    const user = await User.findAll({});
    res.json(user);
}

router.delete('/delete-user', deleteUser);

module.exports = router ;
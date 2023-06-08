const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = async(req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if(!token){
        res.status(400).send({success: false, msg: "A token is required for authenticate"});
    }
    try{
    const descoded = await jwt.verify(token, config.secret);
    req.user = descoded ;
    } catch(error) {
        res.status(400).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;
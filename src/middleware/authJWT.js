const jwt = require('jsonwebtoken')
const config = require('../config/auth')


verifyToken = (req, res, next) => {
    const token = req.cookies.token; 

    if(!token) {
        return  res.redirect('/');
    }

    const user = jwt.verify(token, config.secret);
    req.user = user;
    res.redirect('/welcomeHome');

    // jwt.verify(token, config.secret, (err, decoded) => {
    //     if(err) {
    //         return res.status(401).json({
    //             massage: 'unauthorized'
    //         })
    //     }
    //     req.userId = decoded.id
    //     next()
    // })
}

module.exports = { verifyToken }
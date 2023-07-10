const express = require('express')
var app = express();

const router = express.Router()
const middlewareVerif = require('../middleware/authJWT')

router.get('/', (req, res) => {
    res.render( 'index')
})

router.get('/welcomeHome', middlewareVerif.verifyToken, (req, res) => {
    res.render('indexVerif', {name: req.user.name})
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/admin', middlewareVerif.verifyToken, (req,res) => {
    res.render("indexAdmin", {name: req.user.name})
})

module.exports = router 
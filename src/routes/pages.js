const express = require('express')
var app = express();

const router = express.Router()

router.get('/', (req, res) => {
    res.render( 'index')
})

router.get('/welcomeHome', (req, res) => {
    res.render('indexVerif')
})

router.get('/register', (req, res) => {
    res.render( 'register')
})

router.get('/login', (req, res) => {
    res.render( 'login')
})

module.exports = router
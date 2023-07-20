const express = require('express')
var app = express();

const router = express.Router()
const middlewareVerif = require('../middleware/authJWT')
const userController = require('../controllers/user.controller')
const dashboardController = require('../controllers/Admindashboard.controller')
const articleController = require('../controllers/article.controller')

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

// Member
router.get('/', (req, res) => {
    res.render( 'index')
})

router.get('/welcomeHome', (req, res) => {
    res.render('indexVerif')
})

router.get('/welcomeHome/articles', articleController.findAll, (req, res) => {
    res.render('article')
})


// Admin
router.get('/admin', dashboardController.count, (req,res) => {
    res.render('indexAdmin')
})

    // Users
router.get('/admin/users', userController.findAll, (req,res) => {
    res.render('userAdmin')
})

router.get('/admin/users/insert', (req,res) => {
    res.render('InsertuserAdmin')
})

router.get('/admin/users/edit/:email', userController.findOne)

    // Article
router.get('/admin/articles', articleController.findAllAdmin, (req,res) => {
    res.render('articleAdmin')
})

router.get('/admin/articles/insert', (req,res) => {
    res.render('InsertarticleAdmin')
})

router.get('/admin/articles/edit/:id', articleController.findOne)

module.exports = router 
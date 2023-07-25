// const middleware = require('../middleware/index')
// const controller = require('../controllers/auth.controller')


// module.exports = (app) => {
//     app.use(function(req, res, next) {
//         res.header(
//             'Access-Control-Allow-Header',
//             'authorization, Origin, Content-Type, Accept'
//         )
//         next()
//     })

//     app.post('/api/auth/register', controller.register)
    
// }


const middlewareI = require('../middleware/index')
const middlewareVerif = require('../middleware/authJWT')
const controller = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const articleController = require('../controllers/article.controller')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/PDF')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        next()

    })

    var cors = require('cors')

    app.use(cors())

    app.post('/api/auth/register', middlewareI.isUserExist, controller.register)
    app.post('/api/auth/login', controller.login)
    app.get('/api/auth/logout', controller.logout)
    app.get('/api/auth/verify', middlewareVerif.verifyToken, (req, res) => {
        if(req.user.role == "admin"){
             res.redirect('/admin');
        }else {
            res.redirect('/welcomeHome')
        }
    })
    app.get('/api/auth/getdata', middlewareVerif.verifyToken, (req, res) => {
        res.send(req.user)
    })



    // Member
    app.get('/welcomeHome/articles/tags', articleController.findAllinTags, (req, res) => {

    })

    app.get('/welcomeHome/articles/download/:id', articleController.download, (req, res) => {

    })

    // Admin

    // User
    app.post('/api/user/create', userController.create)

    app.put('/api/user/update/:email', userController.update)
    
    app.delete('/api/user/delete/:email', userController.delete)


    // Article
    app.post('/api/article/post',upload.single('pdf'), articleController.create)

    app.get('/admin/articles/tags', articleController.findAllinTagsAdmin, (req, res) => {

    })

    app.put('/api/article/update/:id', articleController.update)

    app.delete('/api/article/delete/:id', articleController.delete)
}
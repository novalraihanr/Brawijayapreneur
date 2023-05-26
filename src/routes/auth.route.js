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
    app.get('/api/auth/verify', middlewareVerif.verifyToken, (req, res) => {
        res.json({
            data: req.user
        })
    })

}
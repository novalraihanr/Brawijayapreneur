const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
app.use(cookieParser())

// HBS 
app.set('views', path.join(__dirname, './src/views'))
const publicDirectory = path.join(__dirname + '/src/public')
app.use(express.static(publicDirectory))
app.set('view engine', 'hbs')

// Method Override
app.use(methodOverride('_method'))

// Express Sessions + Flash
app.use(session({
    secret: 'brawpreneur',
    cookie: { maxAge: 360000},
    saveUninitialized: true,
    resave: false
}))

app.use(flash())



dotenv.config()

// let whitelist = ['http://localhost:5000']
// let whitelistRegister = ['http://localhost:5000/api/auth/register']

// var allowOrigins = ['http://localhost:5000']
app.use(cors())

// let corsOptions = {
//     origin: function (origin, callback) {
//         if(whitelist.indexOf(origin) !== -1 || !origin){
//             callback(null, true)
//         } else {
//             callback(new Error('NOT allowed  by CORS'))
//         }
//     },
//     origin: function (origin, callback) {
//         if(whitelistRegister.indexOf(origin) !== -1 || !origin){
//             callback(null, true)
//         } else {
//             callback(new Error('NOT allowed  by CORS'))
//         }
//     },
// }

// app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const db = require('./src/models')
const seed = require('./src/models/seeds')
const User = db.user
const Article = db.article

function initial() {
    User.create({
      name: "admin",
      email: "admin23@gmail.com",
      password: bcrypt.hashSync("admin234", 8),
      role: "admin"
    });
}

db.sequelize
    .sync()
    .then(() => {
        // seed.userSeed()
        // seed.categorySeed()
        console.log('database connected');
    })
    .catch((err) => {
        console.error('database connection failed', err);
    })

// app.get('/', (req, res) => {
//     res.json({
//         massage: 'server is runnning'
//     })
// })

app.use('/', require('./src/routes/pages'))
require('./src/routes/auth.route')(app)
require('./src/routes/profile.auth')(app)

const PORT = process.env.APP_PORT
app.listen(PORT, () => {
    console.log(`server is running on port http//localhost:${PORT}`);
})

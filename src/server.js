const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.set('views', path.join(__dirname, './views'))
const publicDirectory = path.join(__dirname + '/public')
app.use(express.static(publicDirectory))
app.set('view engine', 'hbs')

dotenv.config()

let whitelist = ['http://localhost:5000']
let whitelistRegister = ['http://localhost:5000/api/auth/register']

var allowOrigins = ['http://localhost:5000']
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

const db = require('./models')
const seed = require('./models/seeds')

db.sequelize
    .sync({ force : true })
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

app.use('/', require('./routes/pages'))
require('./routes/auth.route')(app)
require('./routes/profile.auth')(app)

const PORT = process.env.APP_PORT
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})

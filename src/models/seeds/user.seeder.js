const { db } = require('../index')
const User = db.user

exports.userSeed = () => {
    User.create({
        name: 'ridha ilham',
        email: 'ridhaaa@gmail.com',
        phone: '088888',
        password: 'zqMKLMLsnwlnw'
    })
}
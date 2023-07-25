
const { isUserExist } = require('./register')
const { verifyToken } = require('./authJWT')
module.exports = {
    isUserExist,
    verifyToken
}
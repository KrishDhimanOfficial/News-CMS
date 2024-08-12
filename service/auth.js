const jwt = require('jsonwebtoken')
const privateKey = '@13A(hgd%@#!7)apE&'

function setUser(user) {
    return jwt.sign(user, privateKey)
}
function getUser(token) {
    if(!token){
        return null;
    }
    return jwt.verify(token, privateKey)
}
module.exports = { setUser, getUser };
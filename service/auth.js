const jwt = require('jsonwebtoken')
const key = '$apex@870'

function setUser(user) {
    jwt.sign(user, key)
}

function getUser() {
    jwt.verify(token, key)
}

module.exports = { setUser, getUser }
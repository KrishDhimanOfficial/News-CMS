const mapUser = new Map();

function setUser(id,user){
    mapUser.set(id,user)
}
function getUser(id){
   return mapUser.get(id)
}

module.exports = {
    setUser,
    getUser
}

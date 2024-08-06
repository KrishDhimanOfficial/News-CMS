const mongoose = require('../Connections/monodb.connection')

const adminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const admincollection = mongoose.model('admin',adminSchema)
module.exports = admincollection;
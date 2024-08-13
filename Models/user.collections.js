const mongoose = require('../Connections/monodb.connection')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const usercollection = mongoose.model('user',userSchema)
module.exports = usercollection;
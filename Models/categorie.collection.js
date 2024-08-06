const mongoose = require('../Connections/monodb.connection');

const categorieSchema = mongoose.Schema({
    categorie_name : {
        type: String,
        required : true
    }
})

const categorieCollection = mongoose.model('categorie',categorieSchema)

module.exports = categorieCollection;
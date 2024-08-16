const mongoosePaginate = require('mongoose-aggregate-paginate-v2');
const mongoose = require('../Connections/monodb.connection');

const categorieSchema = mongoose.Schema({
    categorie_name : {
        type: String,
        required : true
    }
})

categorieSchema.plugin(mongoosePaginate);
// const categorieCollection = mongoose.model('categorie',categorieSchema)
module.exports = mongoose.model('categorie',categorieSchema);
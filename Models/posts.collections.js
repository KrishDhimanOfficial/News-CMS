const mongoosePaginate = require('mongoose-aggregate-paginate-v2');
const mongoose = require('../Connections/monodb.connection');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    image: String
})

postSchema.plugin(mongoosePaginate);
// const postCollection = mongoose.model('posts',postSchema)
module.exports = mongoose.model('posts', postSchema);
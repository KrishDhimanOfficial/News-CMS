const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/NewsSite')
    .then(() => {
        console.log('MongoDB Connected!')
    }).catch((error) => {
        console.log('Not Connected!');
    });

module.exports = mongoose;

const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_LINK)
    .then(() => {
        console.log('MongoDB Connected!')
    }).catch((error) => {
        console.log('Not Connected!');
    });

module.exports = mongoose;

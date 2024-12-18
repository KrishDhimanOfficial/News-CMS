require('dotenv').config()
const express = require('express');
const app = express()
const port = process.env.PORT ?? 8000;
const path = require('path');
const cookie = require('cookie-parser')
const postRoutes = require('./routes/post.routes');
const categorieRoutes = require('./routes/categories.routes');
const adminRoutes = require('./routes/admin.routes')

app.use(cookie())


// TO Pass json Data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Imagess from the "Uploads" directory
app.use(express.static(path.join(__dirname, '/')));



// Setup View ENgine To Excute EJS File
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.set('views', 'views');


// Use to Post Routes 
app.use('/post', postRoutes)

// Categories Routes
app.use('/categories', categorieRoutes)

// Admin Routes
app.use('/admin', adminRoutes)


app.use('/', (req, res) => {
    res.render('index')
})

app.listen(port, console.log('Running...'))
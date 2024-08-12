const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.middleware')
const LoginedUser = require('../middleware/checkLogin');
const login = require('../middleware/login');
const { handleAdminLogin, deletePost, setPost, UpdatePost,
    findPostByCategorie, addcategory, logout} = require('../controllers/admin.controllers');
const { set } = require('mongoose');


router.get('/login',login, (req, res) => {
    res.render('login')
})

router.get('/category', findPostByCategorie)

router.get('/Addcategory', (req, res) => {
    res.render('Addcategorie')
})


router.get('/logout', logout)

// TO handle Admin Login
router.post('/login', handleAdminLogin)


router.get('/panel',LoginedUser, (req, res) => { res.render('adminPanel') })
router.get('/post/delete/:id', deletePost)
router.post('/post/update/:id', upload.single('image'), UpdatePost)
router.get('/post/:id', setPost)
router.post('/submitCategory', addcategory)



module.exports = router;
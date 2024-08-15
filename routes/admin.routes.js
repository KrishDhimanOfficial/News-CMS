const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.middleware')
const LoginedUser = require('../middleware/checkLogin');
const login = require('../middleware/login');
const { handleAdminLogin, deletePost, setPost, UpdatePost, findPostByCategorie,
    addcategory, showAllUser, adduser, deleteUser, editUser,editUserPage, logout
} = require('../controllers/admin.controllers');


router.get('/login', login, (req, res) => {
    res.render('login')
})

router.get('/Addcategory', (req, res) => {
    res.render('Addcategorie')
})

// All User Routes
router.get('/users', showAllUser)
router.post('/submituser', adduser)
router.get('/user/:id', deleteUser);
router.get('/user/:id/edit', editUserPage);
router.post('/edituser/:id', editUser);
router.get('/adduser', (req, res) => {
    res.render('addUser')
})

// TO handle Admin Login
router.post('/login', handleAdminLogin)
router.get('/logout', logout)


router.get('/category', findPostByCategorie)
router.get('/panel', LoginedUser, (req, res) => { res.render('adminPanel') })
router.get('/post/delete/:id', deletePost)
router.post('/post/update/:id', upload.single('image'), UpdatePost)
router.get('/post/:id', setPost)
router.post('/submitCategory', addcategory)



module.exports = router;
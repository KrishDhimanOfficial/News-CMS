const express = require('express');
const router = express.Router();
const multer = require('multer');
const session = require('express-session');
const LoginedUser = require('../middleware/checkLogin');
const login = require('../middleware/login');
const { handleAdminLogin, deletePost, setPost, UpdatePost,
    findPostByCategorie, addcategory, logout } = require('../controllers/admin.controllers')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const upload = multer({ storage: storage })


router.get('/login', login, (req, res) => {
    res.render('login')
})

router.get('/category', findPostByCategorie)

router.get('/Addcategory', (req, res) => {
    res.render('Addcategorie')
})


router.get('/logout', logout)

// TO handle Admin Login
router.post('/login', handleAdminLogin)



router.get('/panel', LoginedUser, (req, res) => { res.render('adminPanel') })
router.get('/post/delete/:id', deletePost)
router.get('/post/:id', setPost)
router.put('/post/update/:id', UpdatePost)
router.post('/submitCategory', addcategory)



module.exports = router;
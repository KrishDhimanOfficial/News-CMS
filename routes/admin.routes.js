const express = require('express');
const router = express.Router();
const { handleAdminLogin, deletePost,UpdatePost } = require('../controllers/admin.controllers')


router.route('/login').get((req, res) => {
    res.render('login')
})

// TO handle Admin Login
router.route('/panel').post(handleAdminLogin)


router.route('/panel').get((req,res)=>{ res.render('adminPanel')})
router.route('/post/delete/:id').get(deletePost)
router.route('/post/update/:id').get(UpdatePost)

module.exports = router;
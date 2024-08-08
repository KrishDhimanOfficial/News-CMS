const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.middleware')
const { findPost, find_posts_By_Categories, find_single_post, searchQuery } = require('../controllers/post.controllers')
const postControlers = require('../controllers/post.controllers');


// Route to Render Create post page
router.get('/createpost', (req, res) => {
    res.render('createpost')
})

// Route to create post
router.post('/submitpost', upload.single('image'), postControlers.createPost)

router.get('/singlepost/:id', find_single_post)
router.get('/:categorie', find_posts_By_Categories)
router.get('/search/query', searchQuery)

// API's
router.get('/api/findPosts', findPost)

module.exports = router;
const express = require('express');
const router = express.Router();
const find_categorie = require('../controllers/categories.controllers');

// API's
router.get('/api/postByCategorie', find_categorie)

module.exports = router;
const admin = require('../Models/admin.collections')
const post = require('../Models/posts.collections');
const category = require('../Models/categorie.collection')
const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../services/auth');


const handleAdminLogin = async (req, res) => {
    try {
        const user = await admin.findOne(req.body);
        if (!user) {
            res.render('login', { error: 'Login Unsuccessful!' })
        }
        const sessionid = uuidv4();
        setUser(sessionid, user);
        res.cookie('uid', sessionid)
        res.redirect('/admin/panel')
    } catch (error) {
        res.render('login', { error: 'Login Unsuccessful!' })
    }
}
const deletePost = async (req, res) => {
    try {
        await post.findByIdAndDelete(req.params.id)
        res.render('adminPanel', { message: 'Successfully Deleted!' })
    } catch (error) {
        res.render('login', { error: 'Unsuccessful!' })
    }
}

const setPost = async (req, res) => {
    try {
        const data = await post.findOne({ _id: req.params.id })
        res.render('updatePost', { updatePost: data })
    } catch (error) {
        res.render('updatePost', { error: 'Unsuccessful!' })
    }
}

const addcategory = async (req, res) => {
    try {
        const data = await category.create(req.body)
        if (!data) {
            res.render('Addcategorie', { error: 'Unsuccessful!' })
        }
        res.redirect('/admin/category')
    } catch (error) {

    }
}

const findPostByCategorie = async (req, res) => {
    const data = await category.aggregate([
        {
            $lookup: {
                from: 'posts',
                localField: 'categorie_name',
                foreignField: 'categorie',
                as: 'posts'
            }
        },
        {
            $unwind: '$posts'
        },
        {
            $group: {
                _id: '$categorie_name',
                posts: { $push: '$posts' },
                count: { $sum: 1 }
            }
        }
    ])
    res.render('AllcategoryPage', { categoryBypostCount: data })
}

const UpdatePost = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        res.render('adminPanel')
    } catch (error) {
        console.log(error);
        res.render('updatePost', { error: 'Unsuccessful!' })
    }
}

module.exports = { handleAdminLogin, deletePost, setPost, addcategory, findPostByCategorie, UpdatePost };



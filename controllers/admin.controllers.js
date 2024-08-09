const admin = require('../Models/admin.collections');
const fs = require('fs');
const path = require('path')
const post = require('../Models/posts.collections');
const category = require('../Models/categorie.collection')
const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../service/auth');


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
        const postImage = await post.findOne({ _id: req.params.id });
        const imagePath = path.join(__dirname, '../uploads', postImage.image);
        if (fs.existsSync(imagePath)) {
            fs.rm(imagePath)
        }
        await post.findByIdAndDelete({ _id: req.params.id })
        res.render('adminPanel', { message: 'Successfully Deleted!' })
    } catch (error) {
        res.render('adminPanel', { error: 'Unsuccessful!' })
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
                post: { $push: '$posts' },
                count: { $sum: 1 }
            }
        }
    ])
    res.render('AllcategoryPage', { categoryBypostCount: data })
}

const UpdatePost = async (req, res) => {
    try {
        const { title, description, categorie } = req.body;
        image = req.file.filename

        await post.findByIdAndUpdate({ _id: req.params.id }, { title, description, categorie, image })
        res.redirect('/admin/panel')
    } catch (error) {
        res.render('updatePost', { error: 'Unsuccessful!' })
    }
}
const logout = (req, res) => {
    res.clearCookie('uid');
    res.redirect('/admin/login')
}

module.exports = {
    handleAdminLogin, deletePost, setPost, addcategory,
    findPostByCategorie, UpdatePost, logout
};



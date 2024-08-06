const admin = require('../Models/admin.collections')
const post = require('../Models/posts.collections');


const handleAdminLogin = async (req, res) => {
    try {
        const data = await admin.findOne(req.body);
        if (!data) {
            res.render('login', { error: 'Login Unsuccessful!' })
        }
        res.render('adminPanel')
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

const UpdatePost = async (req,res)=>{
    try {
        await post.findByIdAndUpdate(req.params.id)
        res.render('adminPanel', { message: 'Successfully Updated!' })
    } catch (error) {
        
    }
}

module.exports = { handleAdminLogin, deletePost ,UpdatePost};

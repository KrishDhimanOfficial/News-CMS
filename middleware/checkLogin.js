const { getUser } = require('../service/auth')

async function LoginedUser(req, res, next) {
    try {
        const userid = req.cookies.uid;
        const user = await getUser(userid)
        
        if (!userid && !user) {
            res.redirect('/admin/login')
        }
        next();
    } catch (error) {
        console.log(error);
    }
}


module.exports = LoginedUser;
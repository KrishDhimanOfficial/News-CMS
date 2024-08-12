const { getUser } = require('../service/auth')
function LoginedUser(req, res, next) {
    try {
        const token = req.cookies.uid;
        const user = getUser(token)

        if (!token || !user) return res.redirect('/admin/login')
            
        req.user = user;
        next();
    } catch (error) {
        console.log(`auth ${error}`);
    }
}


module.exports = LoginedUser;
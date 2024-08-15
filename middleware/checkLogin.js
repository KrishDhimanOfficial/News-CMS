const { getUser } = require('../service/auth')
function LoginedUser(req, res, next) {
    try {
        const token = req.cookies?.uid;

        const user = getUser(token)
        if (!token || !user) return res.redirect('/admin/login')
        switch (user.role) {
            case 'admin':
                req.user = user;
                return next();
            case 'user':
                return res.redirect('/');
            default:
                return res.redirect('/');
        }
    } catch (error) {
        console.log(`auth : ${error}`);
    }
}


module.exports = LoginedUser;
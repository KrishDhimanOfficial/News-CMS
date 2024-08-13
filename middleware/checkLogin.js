const { getUser } = require('../service/auth')
function LoginedUser(req, res, next) {
    try {
        const token = req.cookies?.uid;

        const user = getUser(token)

        if (!token || !user) return res.redirect('/admin/login')
        if (user.role == 'admin') { req.user = user; next(); }
        if (user.role == 'user') return res.redirect('/')

        res.redirect('/admin/login')
    } catch (error) {
        console.log(`auth : ${error}`);
    }
}


module.exports = LoginedUser;
const { getUser } = require('../service/auth')

async function LoginedUser(req, res, next) {
    try {
        const userid = req.cookies.uid;
        if (!userid) {
            res.redirect('/admin/login')
        }

        const user = await getUser(userid)
        if (!user) {
            res.redirect('/admin/login')
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}


module.exports =  LoginedUser;
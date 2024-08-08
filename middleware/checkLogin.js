function LoginedUser(req, res, next) {
    try {
        const userid = req.cookies.uid;
        if (!userid) {
            res.redirect('/admin/login')
        }
        next();
    } catch (error) {
        console.log(error);
    }
}


module.exports = LoginedUser;
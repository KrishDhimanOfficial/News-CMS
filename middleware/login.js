async function login(req, res, next) {
    try {
        const userid = req.cookies.uid;
        if (!userid) {
            next();
        } else {
            res.redirect('/admin/panel')
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = login;
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkAuthorization = (req, res, next) => {
    const token = req.session.token
    
    if (!token) {
        console.log("token tidak ada")
        req.session.message = "login first";
        res.redirect(301, '/auth/login');
    }

    try {
        const user = jwt.verify(token, process.env.JWT_KEY)
        req.user = user
        next()
    } catch (error) {
        req.session.message = `failed ${error.message}`
        res.redirect(301, '/auth/login');
    }
}
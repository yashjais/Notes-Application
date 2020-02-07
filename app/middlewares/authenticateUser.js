const User = require('../models/user')

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(function(user) {
            // console.log('calling next')
            if(user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({notice: 'token not available'})
            }
        })
        .catch(function(err) {
            res.status('401').send(err)
        })
}

module.exports = authenticateUser
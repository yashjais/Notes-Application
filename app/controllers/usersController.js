const User = require('../models/user')
const _ = require('lodash')

module.exports.register = (req, res) => {
    // console.log('in register')
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => res.send(_.pick(user, ['_id', 'username', 'email'])))
        .catch(err => res.send(err))
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(user => {
            // res.send(user)
            return user.generateToken()
        })
        .then(function(token) {
            // console.log('after the generateToken', user, token)
            res.setHeader('x-auth', token).send({})  //_.pick(user, ['_id', 'username', 'email'])))
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.account = (req, res) => {
    const { user } = req
    res.send(_.pick(user, '_id', 'username', 'email'))
}

module.exports.logout = (req, res) => {
    // res.send('logout')
    const { user, token } = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token: token}}})
        .then(() => res.send('successfully logged out'))
        .catch(err => res.send(err))
}

module.exports.forgotPassword = (req, res) => {
    const body = req.body
    User.findByCredential(body.email)
        .then(user => {
            // write code that how we will store the token in the database and when the user will hit the certain link we will verify that token and reset the password.
            user.generateToken()
            // res.setHeader('x-auth', token).send({})  //_.pick(user, ['_id', 'username', 'email'])))
                .then(token => res.setHeader('x-auth', token).send({}))
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err))    
}
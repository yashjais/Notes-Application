const User = require('../models/user')
const pick = require('lodash/pick')
const nodemailer = require('nodemailer')

module.exports.register = (req, res) => {
    // console.log('in register')
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => res.send(pick(user, ['_id', 'username', 'email'])))
        .catch(err => res.send(err))
}

module.exports.login = (req, res) => {
    const body = req.body
    console.log('in the login')
    User.findByCredentials(body.email, body.password)
        .then(user => {
            // res.send(user)
            return user.generateToken()
        })
        .then(function(user) {
            // console.log('in the backend ', user)
            // console.log('after the generateToken', user, token)
            // res.setHeader('x-auth', token).send({ token: token })  //pick(user, ['_id', 'username', 'email'])))
            res.send(user)
        })
        .catch(err => {
            res.status('401').send('invalid email or password')
        })
}

module.exports.account = (req, res) => {
    const { user } = req 
    user.token = req.token
    res.send(pick(user, '_id', 'username', 'email', 'token'))
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
        // res.setHeader('x-auth', token).send({})  //pick(user, ['_id', 'username', 'email'])))
            .then(user => {
                const smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    auth: {
                        user: "", // your email goes here
                        pass: ""     // your password goes here
                    }
                })
                mailOptions = {
                    to : body.email,
                    subject : 'Password Reset',
                    text : `Go to this link to reset your password. ${`http://localhost:3020/users/forgot-password?id=${user.token}`}`
                }
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error)
                    }else{
                        console.log("Message sent: " + response.message)
                    }
                })
                res.send('the link has been sent to associated email')
            })
            .catch(err => res.send(err))
    })
    .catch(err => res.status('404').send(err))       
}

module.exports.revivePassword = (req, res) => {
    console.log('here')
    const token = req.query.id
    User.findByToken(token)
        .then(user => {
            user.token = token
            user.message = 'password reset link is ok'
            res.status(200).send(pick(user, ['email','username', 'message', 'token']))
        })
        .catch(err => res.send(err))
}

module.exports.resetPassword = (req, res) => {
    // console.log('here')
    const { password } = req.body
    // console.log(password)
    const reqToken = req.query.id
    User.findByToken(reqToken)
        .then(user => {
            // res.send(user)
            let num
            user.tokens.forEach((token,index) => {
                if(token.token == reqToken){
                    num = index
                }
            })
            user.tokens.splice(num, 1)
            user.password = password
            console.log(user)
            return user.saveOneMoreTime() // this is a old user object// how to save it with crypting
        })
        .then(user => {
            res.send(user)
        })
        .catch(err => res.send(err))
}
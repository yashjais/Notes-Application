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
        .then(function(token) {
            console.log('in the backend ', token)
            // console.log('after the generateToken', user, token)
            // res.setHeader('x-auth', token).send({ token: token })  //pick(user, ['_id', 'username', 'email'])))
            res.send({ token })
        })
        .catch(err => {
            res.status('401').send('invalid email or password')
        })
}

module.exports.account = (req, res) => {
    const { user } = req
    res.send(pick(user, '_id', 'username', 'email'))
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
            .then(token => {
                const smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    auth: {
                        user: "yashj.cul@gmail.com",
                        pass: "fpthqoikbfqdtazm"
                    }
                })
                mailOptions = {
                    to : body.email,
                    subject : 'Password Reset',
                    text : `Go to this link to reset your password. ${`http://localhost:3020/users/forgot-password?id=${token}`}`
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
    .catch(err => res.send(err))       
}

module.exports.revivePassword = (req, res) => {
    console.log('here')
    const token = req.query.id
    User.findByToken(token)
        .then(user => {
            user.tokens.pop()
            return user.save()
        })
        .then(user => {
            console.log(user)
            res.send('submit the form')
            // functionality of the form will go here some where. 
        })
        .catch(err => res.send(err))
}
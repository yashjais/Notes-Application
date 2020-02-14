const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return 'format is invalid'
            } 
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

userSchema.methods.generateToken = function() {
    const user = this
    // console.log('code is in static method')
    // console.log(user)
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({token})
    return user.save()
            .then(user => {
                const data = {}
                data.token = token
                data.username = user.username,
                data.email = user.email,
                data._id = user._id
                return Promise.resolve(data)
            })
            .catch(err => {
                return Promise.reject(err)
            })

}

userSchema.statics.findByToken = function(token) {
    const User = this
    let tokenData 
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch(err) {
        return Promise.reject(err)
    }
    // console.log(tokenData)
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}

userSchema.statics.findByCredential = function(email) {
    const User = this
    return User.findOne({ email })
            .then(function(user) {
                if(!user) {
                    return Promise.reject('user does not found')
                } else {
                    return Promise.resolve(user)
                }
            })
}

userSchema.statics.findByCredentials = function(email, password) {
    const User = this
    return User.findOne({ email })
            .then(function(user) {
                if(!user) {
                    return Promise.reject('invalid email/password')
                } 
                return bcrypt.compare(password, user.password)
                        .then(function(result) {
                            if(result) {
                                return Promise.resolve(user)
                            } else {
                                return Promise.reject('invalid email/password')
                            }
                        })
                        .catch(function(err) {
                            return Promise.reject(err)
                        })
            })
            .catch(function(err) {
                return Promise.reject(err)
            })
}

userSchema.pre('save', function(next) {
    const user = this
    console.log('user is in pre save')
    if(user.isNew){
        console.log('in if of pre')
        bcrypt.genSalt(10)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
            })
            .then(encPass => {
                user.password = encPass
                next()
            })
            .catch(err => {
                Promise.reject('gen salt is not found')
            })
    } else {
        console.log('in else of pre')
        next()
    }
})

userSchema.methods.saveOneMoreTime = function() {
    const user = this
    console.log('saving one more time')
    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
        })
        .then(encPass => {
            user.password = encPass
            return user.save()
        })
        .then(user => Promise.resolve(user))
        .catch(err => {
            Promise.reject('gen salt is not found')
        })
}

const User = mongoose.model('User', userSchema)

module.exports = User
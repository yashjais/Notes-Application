const mongoose = require('mongoose')

const setUpDb = () => {
    mongoose.connect('mongodb://localhost:27017/notes-redux',  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
        .then(res => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = setUpDb   

// hello
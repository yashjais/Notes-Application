const Category = require('../models/category')

module.exports.list = (req, res) => {
    Category.find({ user: req.user._id})
        .then(categories => {
            res.json(categories)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Category.findOne({ _id: id, user: req.user._id })
        .then(cat => {
            if(cat){
                res.json(cat)
            }else{
                res.json({})
            }
        })
        .catch(err => {
            res.json(error)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.user = req.user._id
    category.save()
        .then(cat => {
            res.json(cat) 
        })
        .catch(err => {
            res.json(err)
        }) 
}

module.exports.update = (req, res) => {
    const body = req.body
    const id = req.params.id
    Category.findOneAndUpdate({ _id: id, user: req.user._id }, body, {new: true, runValidators: true})
        .then(cat => {
            if(cat) {
                res.json(cat)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.del = (req, res) => {
    const id = req.params.id
    Category.findOneAndDelete({ _id: id, user: req.user._id })
        .then(cat => {
            if(cat) {
                res.json(cat)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}
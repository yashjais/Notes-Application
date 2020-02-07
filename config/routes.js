const express = require('express')
const router = express.Router()
const authenticateUser = require('../app/middlewares/authenticateUser')
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.post('/users/account',authenticateUser, usersController.account)
router.post('/users/logout', authenticateUser, usersController.logout)

router.get('/notes', authenticateUser, notesController.list) 
router.get('/notes/:id', authenticateUser, notesController.show) 
router.post('/notes', authenticateUser, notesController.create)
router.put('/notes/:id', authenticateUser, notesController.update)
router.delete('/notes/:id', authenticateUser, notesController.del)

router.get('/categories', authenticateUser, categoriesController.list)
router.get('/categories/:id', authenticateUser, categoriesController.show)
router.post('/categories', authenticateUser, categoriesController.create)
router.put('/categories/:id', authenticateUser, categoriesController.update)
router.delete('/categories/:id', authenticateUser, categoriesController.del)

module.exports = router
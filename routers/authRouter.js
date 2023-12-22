// import Router from 'express'
const Router = require('express')
// import authController from '../controllers/authController.js'
const authController = require('../controllers/authController.js')

const router = new Router()

router.post('/registration', authController.registration)
router.post('/login', authController.login)

module.exports = router

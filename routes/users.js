const express = require('express')
const { signup,signin,signout,verifyToken,getSignIn} = require('../controllers/users')
const router = express.Router() 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const authController = require('../controllers/authController')
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
router.post('/signup',jsonParser,authController.signup)
router.get('/signin',jsonParser, authController.login)
router.post('/signin',jsonParser, authController.login)
router.get('/signout',jsonParser,authController.protect, authController.logout)

module.exports = router
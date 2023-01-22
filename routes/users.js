const express = require('express')
const router = express.Router() 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const authController = require('../controllers/authController')
const viewController = require('../controllers/viewController')
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
router.post('/signup',jsonParser,authController.signup)
router.post('/signin',jsonParser, authController.login)

router.get('/signout',jsonParser,authController.protect, authController.logout)

module.exports = router
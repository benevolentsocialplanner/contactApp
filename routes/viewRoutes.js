const express = require('express')
const router = express.Router() 
const viewsController = require('../controllers/viewController')
const authController = require('../controllers/authController')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()



router.get('/',jsonParser, authController.isLoggedIn, viewsController.getDashboard)
router.get('/login',jsonParser, authController.isLoggedIn, viewsController.getLoginForm)
// router.get('/signout',jsonParser, authController.isLoggedIn, viewsController.getDashboard)
module.exports = router;

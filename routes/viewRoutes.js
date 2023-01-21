const express = require('express')
const router = express.Router() 
const viewsController = require('../controllers/viewController')
const authController = require('../controllers/authController')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


router.get('/',jsonParser, viewsController.getDashboard)
router.get('/api/signin',jsonParser, viewsController.getLoginForm)

module.exports = router;

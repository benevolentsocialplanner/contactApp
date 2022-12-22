const express = require('express')
const { signup,signin,signout,verifyToken,getSignIn} = require('../controllers/users')
const router = express.Router() 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
router.post('/signup',jsonParser, signup)
router.get('/signin',jsonParser, getSignIn)
router.post('/signin',jsonParser, signin)
router.get('/signout',jsonParser,verifyToken, signout)

module.exports = router
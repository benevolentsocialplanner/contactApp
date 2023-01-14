const express = require('express')
const router = express.Router() 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
const authController = require('../controllers/authController.js')
const { addcontact,listById, deleteById,getAll,getByName,dashboard} = require('../controllers/contacts.js')

router.post('/addcontact',jsonParser,authController.protect, addcontact)
router.post('/listById',jsonParser,authController.protect,listById)
router.post ('/deleteById',jsonParser,authController.protect,deleteById)
router.get('/getAll',authController.protect,getAll)
router.post('/getByName',jsonParser,authController.protect,getByName)
module.exports = router
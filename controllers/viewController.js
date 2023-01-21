const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getLoginForm = (req,res,next) =>{
    console.log("ok")
    res.status(200).render('../views/login.pug',{
        title: "login to your acc"
    })
    
}
exports.getDashboard = (req,res,next) =>{
    res.status(200).render('dashboard',{
        title: "Dashboard"
    })
    
}
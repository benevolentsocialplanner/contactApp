const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getLoginForm = (req,res,next) =>{
    
    res.status(200).render('../views/login.pug',{
        title: "Login"
    })
    
}
exports.getDashboard = (req,res,next) =>{
    res.status(200).render('../views/base.pug',{
        title: "Base"
    })
    
}
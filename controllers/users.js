const crypto = require('crypto')
const User = require('../models/users')
const bcrypt = require("bcrypt")
const path = require('path')
const jwt = require('jsonwebtoken')

salt = crypto.randomBytes(16).toString('hex')
exports.signup = (req,res) => {
    const name = req.body.name
    const email = req.body.email
    const encry_password = req.body.encry_password
    if(!encry_password){
        res.redirect('/api/signin')
    }
    console.log(name,encry_password)
    var salt = bcrypt.genSaltSync(10);

    bcrypt.hash(encry_password, salt, (err, hashedPw) => {
        if(err){
            console.log(err.message)
            return err
        }
        const user = new User({
          name: name,
          encry_password: hashedPw,
          email: email
        })
    
        user.save()
         .then((user) => {
            res.json({ user})
          })
          .catch((err) => {
            res.send(err)
          })
      })
    
}   
exports.getSignIn = (req,res) =>{
    res.sendFile(path.join(__dirname, "../public/index.html"))
}
exports.signout = (req,res) => {
    req.session = null
    res.clearCookie(this.cookie).send('signedout')
    //User.status = 'off'
    // return res.json({
    //     message: "signed out!"
    // })

}
exports.signin = (req,res) => {
    // if (User.status==='on'){  
    //     return res.json({
    //         error: "you are signed in"
    //     })
    // }
    const email = req.body.email
    const password = req.body.encry_password
    console.log(password)
    User.findOne({email},(err,user) =>{
        if(err){
            res.send(err)
        }
        const pw = user.encry_password
        console.log(pw)
        const doesPwMatch=bcrypt.compareSync(password, pw, (err,result)=>{
            if(err){
                console.log(err)
            }
            user.status = 'on'
        })
        if(!doesPwMatch){
            return res.json({
                message:"pw and email dont match"
            })
        }

        const token = jwt.sign({_id: user._id},process.env.SECRET)

        //COOKIE
        res.cookie('x-access-token',token, {exp : Math.floor(Date.now() / 1000) + (60 * 60)})

        //send response
        const {_id, name, email} = user
        console.log(`new login user: ${user.email} token:${token}  `)
       // User.status= 'on'
        res.send({
            user
        })

    })

}

exports.verifyToken = (req,res,next) => {
    // if(User.status==='off'){
    //     return res.json({
    //         error: "ur off"
    //     })
    // }
    const token = req.cookies['x-access-token']
    if(token){
         jwt.verify(token,process.env.SECRET,(err)=>{
         if(err){
             console.log(err.message)
             return res.json({
                 message:"invalid token",
                 error: err.message
                  })
             }
 
         })
         next()

    }
    else{
         return res.json({
             message:"no token"
         })
     }
     
 }

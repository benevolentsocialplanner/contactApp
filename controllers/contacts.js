const Contact = require('../models/contacts')
const User = require('../models/users')
const uuidv1 = require('uuid/v1')
exports.addcontact = (req,res) => {
    
    const contactData = req.body
    const number = req.body.number
    if(!(/^[0-9]+$/.test(number))){
        return res.json({
            message:"number must contain only numbers"
        })

        //400
    }
    const contact = new Contact({
        ...contactData
    })
    
    Contact.salt = uuidv1()     
    contact.save()
        .then((contact) => {
            console.log(`new contact saved : ${contact}`)
            //
        })
        .catch((err) => {
            console.log(err.message)
            //400
        }) 
}
exports.listById = (req,res) =>{
    const _id = req.body._id
    const userid = req.body.userid
    Contact.findOne({userid: userid,_id:_id}, (err,result)=>{
        if(err){
            console.log(err.message)
            //400
        }
        if(!result){
            console.log('no results')
            //400
        }
        
        console.log(`contact id: ${_id}, result: ${result}`)
    })
}

exports.deleteById = (req,res) =>{

    const userid = req.body.userid
    Contact.find({userid : userid},(err,result)=>{
        if(err){
             console.log(err.message)
        }
        else{
            
                        const _id = req.body._id
                    Contact.findByIdAndDelete(_id,(err,result)=>{
                    if(err){
                        console.log(err.message)
                        //400
                    }
                    if(!result){
                        console.log("no contact by that id was found")
                            
                        //404
                    }
                    console.log(` deleteByIdAndDelete result: ${result} `)
                }) 

        }
    })

   
}
exports.getAll = (req,res) => {
    const userid = req.body.userid
    Contact.find({userid : userid},(err,result)=>{
        if(err){
             console.log(err.message)
        }
        else{
            
            res.send(result)
           // console.log(`all users: ${result}`)
        }
    })
}
exports.getByName = (req,res) => {
    Contact.find({userid : userid},(err,result)=>{
        if(err){
             console.log(err.message)
        }
        else{     
            const name = req.body.name
            Contact.find({name}, (err,result)=>{
                if(err){
                    console.log(err.message)
                }
                else{
                    console.log(`fetched by name : ${result}`)
                }
            })
        }
    })
    
}
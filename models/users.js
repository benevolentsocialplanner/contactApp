const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const Schema = mongoose.Schema 
const validator = require('validator');

const userSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required:true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    encry_password:{
        type: String ,
        required: true
    },
    contacts: Array,
    status: {
      type : String,
      enum: ['on','off'],
      default : 'off'
    },
    salt: String
    
}, {timestamps: true})


userSchema.pre(/^save/, function(next) { 

    next()
  })




userSchema.virtual('password')
    .set(function() {
        this.salt = uuidv1()
    })


userSchema.methods.toJSON = function(){ //hide password in json
    var obj = this.toObject()
    delete obj.encry_password
    return obj
}

userSchema.pre(/^find/, function(next) {
   
    this.find({ active: { $ne: false } })
    next()
  })



module.exports = mongoose.model("User", userSchema)

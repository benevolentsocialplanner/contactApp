const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const Schema = mongoose.Schema 
const User = require('../models/users')

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    number: {
        type: String,
        trim: true,
        required:true,
        unique: true,
        minLength:5,
        maxLength:20
    },
    salt: String
}, {
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
},{timestamps: true})




module.exports = mongoose.model("Contact", contactSchema)
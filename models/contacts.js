const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const Schema = mongoose.Schema 
const User = require('../models/users')

const contactSchema = new Schema({
    contact_id: Schema.Types.ObjectId,
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
    userid:{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
,
    salt: String
}, {
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
},{timestamps: true})



contactSchema.pre(/^find/, function(next) {
   
    this.populate({
      path: 'user',
      select: 'id'
    });
    next();
  });


module.exports = mongoose.model("Contact", contactSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create schema
const ContentSchema = new Schema({
    title: String,
    descriptions:String,
    slidePhoto: String,
    dateCreated:{
        type:Date,
        default:Date.now,
    }
})
const Content = mongoose.model('Content', ContentSchema)
module.exports = Content;


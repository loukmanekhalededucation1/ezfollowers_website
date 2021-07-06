const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    followers:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    requestedOffer:
    {
        type:Number,
        required:true
    },
    discount:
    {
        type: String,
        required:true,
        default:null
    }
})
module.exports = mongoose.model('followers',schema);
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    discount:{
        type:String,
        required:true
    },
    ip:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('discount_ips',schema);
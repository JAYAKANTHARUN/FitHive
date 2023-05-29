const mongoose=require('mongoose')

const cartschema = new mongoose.Schema({
    userid:String,
    productid:String
})

module.exports=mongoose.model('cart',cartschema)
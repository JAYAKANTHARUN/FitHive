const { Int32, Double } = require('mongodb')
const mongoose=require('mongoose')

const cartschema = new mongoose.Schema({
    userid:String,
    productid:String,
    name:String,
    company:String,
    category:String,
    price:String,
    image:String
})

module.exports=mongoose.model('cart',cartschema)
const { Double } = require('mongodb')
const mongoose=require('mongoose')

const productschema = new mongoose.Schema({
    userid:String,
    name:String,
    price:String,
    category:String,
    company:String,
    image:String,
    star:String,
    rating:String,
    discount:String,
    about:String
})

module.exports=mongoose.model('products',productschema)
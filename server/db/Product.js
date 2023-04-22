const mongoose=require('mongoose')

const productschema = new mongoose.Schema({
    userid:String,
    name:String,
    price:String,
    category:String,
    company:String
})

module.exports=mongoose.model('products',productschema)
const mongoose=require('mongoose')

const ordersschema = new mongoose.Schema({
    userid:String,
    ordername:String,
    ordermobilenumber:String,
    orderaddress:String,
    paymentmethod:String,
    totalamount:String,
    ordertime:String,
    orderproducts:Array
})

module.exports=mongoose.model('orders',ordersschema)
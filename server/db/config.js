const mongoose=require('mongoose')

require('dotenv').config({ path: "./config/config.env" })
const password=process.env.MONGOPASSWORD;

mongoose.set('strictQuery', false);

// mongoose.connect('mongodb://127.0.0.1:27017/fithive',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if (err){
//         console.log('error : '+err)
//     }
//     else{
//         console.log('database connected successfully')
//     }
// })
mongoose.connect(`mongodb+srv://jayakantharun03:${password}@cluster0.txiaeb6.mongodb.net/`,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if (err){
        console.log('error : '+err)
    }
    else{
        console.log('database connected successfully')
    }
})
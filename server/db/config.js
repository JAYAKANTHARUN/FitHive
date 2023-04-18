const mongoose=require('mongoose')

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/fithive',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if (err){
        console.log('error : '+err)
    }
    else{
        console.log('database connected successfully')
    }
})
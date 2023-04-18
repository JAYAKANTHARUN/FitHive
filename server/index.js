const express=require('express');
const app=express();

require('./db/config')
const User=require('./db/User')

app.use(express.json())

app.post('/register',async(req,res)=>{
    let user=new User(req.body)
    let result=await user.save()
    res.send(req.body)
})

app.listen(3000);
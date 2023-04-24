const express = require('express');
const app = express();
const cors = require('cors')

require('./db/config')
const User = require('./db/User')
const Product=require('./db/Product')

app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let user = new User(req.body)
        let result = await user.save()
        result = result.toObject()
        delete result.password
        res.send(result)
    }
    else{
        res.send({ result: "no user found" })
    }
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user)
        }
        else {
            res.send({ result: "no user found" })
        }
    }
    else {
        res.send({ result: "no user found" })
    }
})

app.post('/add',async(req,res)=>{
    if (req.body.name && req.body.price && req.body.category && req.body.company) {
        let product = new Product(req.body)
        let result = await product.save()
        res.send(result)
    }
    else{
        res.send({ result: "no product found" })
    }
})

app.get('/products',async(req,res)=>{
    let products=await Product.find()
    if (products.length>0){
        res.send(products)
    }
    else{
        res.send({ products:"No products found" })
    }
})

app.delete('/product/:id',async(req,res)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/product/:id',async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if (result){
        res.send(result)
    }
    else{
        res.send({result:"no product found"})
    }
})
app.post('/product/:id',async(req,res)=>{
    if (req.body.name && req.body.price && req.body.category && req.body.company){
        let result= await Product.updateOne(
            { _id:req.params.id },
            {
                $set:{
                    name:req.body.name,
                    price:req.body.price,
                    category:req.body.category,
                    company:req.body.company,
                }
            }
        )
        if (result){
            res.send(result)
        }
        else{
            res.send({result:"no updation"})
        }
    }
    else{
        res.send({result:"no updation"})
    }
})

app.get('/search/:key',async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    })
    if (result){
        res.send(result)
    }
    else{
        res.send({result:"product not found"})
    }
})

app.listen(3000);  
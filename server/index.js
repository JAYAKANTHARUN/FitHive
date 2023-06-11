const express = require('express');
const Razorpay=require('razorpay')
const app = express();
const cors = require('cors')

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));

const jwt = require('jsonwebtoken')
const jwtkey = 'e-comm'

require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const Admin = require('./db/Admin')
const Cart = require('./db/Cart')
const Orders = require('./db/Orders')

const getKeyId = require('./config/api');

app.use(express.json())
app.use(cors())

require('dotenv').config({path:"./config/config.env"});

app.get('/api/keyid',getKeyId);

app.post('/checkout/:id', verifytoken ,async (req, res) => {

    let amount = parseInt(req.body.totalamount)
    
    var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

    let order = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1"
    })
    res.status(201).json({success:true,order,amount})
})

app.post('/register', async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let result = await User.findOne(req.body)
        if (!result) {
            let user = new User(req.body)
            result = await user.save()
            result = result.toObject()
            delete result.password
            jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong" })
                }
                res.send({ result, auth: token })
            })
        }
        else {
            res.send({ result: "account present" })
        }
    }
    else {
        res.send({ result: "no user found" })
    }
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ user: "Something went wrong" })
                }
                res.send({ user, auth: token })
            })
        }
        else {
            res.send({ user: "no user found" })
        }
    }
    else {
        res.send({ user: "no user found" })
    }
})
app.post('/adminlogin', async (req, res) => {
    if (req.body.username && req.body.password) {
        let admin = await Admin.findOne(req.body).select("-password")
        //console.log(req.body,admin)
        if (admin) {
            jwt.sign({ admin }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ admin: "Something went wrong" })
                }
                res.send({ admin, auth: token })
            })
        }
        else {
            res.send({ admin: "no admin found" })
        }
    }
    else {
        res.send({ admin: "no details found" })
    }
})

app.post('/add', verifytoken, async (req, res) => {
    console.log(req.body)
    if (req.body.name && req.body.price && req.body.category && req.body.company && req.body.image && req.body.star && req.body.rating && req.body.discount && req.body.about) {
        let product = new Product(req.body)
        let result = await product.save()
        res.send(result)
    }
    else {
        res.send({ result: "no product found" })
    }
})

app.get('/admin', verifytoken, async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ products: "No products found", length: 0 })
    }
})

app.delete('/admin/:id', verifytoken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get('/admin/:id', verifytoken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "no product found" })
    }
})
app.post('/admin/:id', verifytoken, async (req, res) => {
    if (req.body.name && req.body.price && req.body.category && req.body.company && req.body.image && req.body.star && req.body.rating && req.body.discount && req.body.about) {
        let result = await Product.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,
                    company: req.body.company,
                    image: req.body.image,
                    star: req.body.star,
                    rating: req.body.rating,
                    discount: req.body.discount,
                    about: req.body.about,
                }
            }
        )
        if (result) {
            res.send(result)
        }
        else {
            res.send({ result: "no updation" })
        }
    }
    else {
        res.send({ result: "no updation" })
    }
})

app.get('/search/:key', verifytoken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { star: { $regex: req.params.key } },
            { rating: { $regex: req.params.key } },
            { discount: { $regex: req.params.key } },
            { about: { $regex: req.params.key } },

        ]
    })
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "product not found" })
    }
})
app.post('/profile', verifytoken, async (req, res) => {
    if (req.body.currentpassword && req.body.newpassword) {
        let result = await User.findOne({ _id: req.body.userid })
        if (result.password === req.body.currentpassword) {
            result = await User.updateOne(
                { _id: req.body.userid },
                {
                    $set: {
                        password: req.body.newpassword
                    }
                }
            )
            if (result) {
                res.send(result)
            }
            else {
                res.send({ result: "cannot update" })
            }
        }
        else {
            res.send({ result: "cannot update" })
        }
    }
    else {
        res.send({ result: "cannot update" })
    }
})

app.get('/userproducts', async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ products: "No products found", length: 0 })
    }
})
app.get('/details/:id', async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "no product found" })
    }
})
app.post('/userproducts/:id', verifytoken, async (req, res) => {
    console.log(req.body)
    let cart = new Cart(req.body)
    let result = await cart.save()
    res.send(result)
})
app.get('/cart/:id', verifytoken, async (req, res) => {
    let cart = await Cart.find({ userid: req.params.id })
    if (cart.length > 0) {
        res.send(cart)
    }
    else {
        res.send({ cart: "No cart found", length: 0 })
    }
})
app.get('/changequantity/:id', verifytoken, async (req, res) => {
    let result = await Cart.findOne({ _id: req.params.id })
    console.log(result)
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "no quantity found" })
    }
})
app.post('/decquantity/:id', verifytoken, async (req, res) => {
    let quantity = parseInt(req.body.quantity) - 1
    let result = await Cart.updateOne(
        { _id: req.params.id },
        {
            $set: {
                quantity: quantity
            }
        }
    )
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "no quantity changed" })
    }
})
app.post('/incquantity/:id', verifytoken, async (req, res) => {
    let quantity = parseInt(req.body.quantity) + 1
    let result = await Cart.updateOne(
        { _id: req.params.id },
        {
            $set: {
                quantity: quantity
            }
        }
    )
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "no quantity changed" })
    }
})
app.delete('/removequantity/:id', verifytoken, async (req, res) => {
    const result = await Cart.deleteOne({ _id: req.params.id })
    res.send(result)
})
app.post('/addorder/:id', verifytoken, async (req, res) => {
    let order = await Orders(req.body)
    result = await order.save()
    result = result.toObject()
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: 'no order placed' })
    }
})
app.get('/orders/:id',verifytoken,async (req,res)=>{
    let result = await Orders.find({userid:req.params.id})
    // console.log(result)
    if (result.length > 0) {
        res.send(result)
    }
    else {
        res.send({ result: "No orders found", length: 0 })
    }
})
app.delete('/clearcart/:id',verifytoken,async(req,res)=>{
    let result = await Cart.deleteMany({userid:req.params.id})
    res.send(result)
})

function verifytoken(req, res, next) {
    const token = req.headers['authorization']
    if (token) {
        // token=token.split(' ')[1]     //token=token.split(' ')[1]
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: 'please provide correct token with header' })
            }
            else {
                next()
            }
        })
    }
    else {
        res.status(401).send({ result: 'please add token with header' })
    }
}



app.listen(3000);  
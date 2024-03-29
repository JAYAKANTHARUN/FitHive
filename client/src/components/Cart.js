import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

const Cart = () => {

    const navigate = useNavigate()

    const auth = JSON.parse(localStorage.getItem('user'))

    const [cart, setcart] = useState([])

    const [totalamount, settotalamount] = useState('')

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getcart()
    }, [])

    const getcart = async () => {
        if (auth) {
            let result = await fetch(`https://fithive-e-commerce.onrender.com/cart/${auth._id}`, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            if (result.length !== 0) {
                let sum = 0
                result.map((item, index) => (
                    sum = sum + parseFloat(item.price) * parseFloat(item.quantity)
                ))
                settotalamount(sum)
                setcart(result)
                setIsLoading(false)
            }
            else {
                setcart(result)
                setIsLoading(false)
            }
        }
        else {
            navigate('/login')
        }
    }

    const decquantity = async (cartid) => {
        setIsLoading(true)
        let result = await fetch(`https://fithive-e-commerce.onrender.com/changequantity/${cartid}`, {
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        if (result.quantity === '1') {
            let result = await fetch(`https://fithive-e-commerce.onrender.com/removequantity/${cartid}`, {
                method: 'delete',
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            getcart()
        }
        else {
            result = await fetch(`https://fithive-e-commerce.onrender.com/decquantity/${cartid}`, {
                method: 'post',
                body: JSON.stringify({ quantity: result.quantity }),
                headers: {
                    "Content-Type": "application/json",
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            getcart()
        }
    }
    const incquantity = async (cartid) => {
        setIsLoading(true)
        let result = await fetch(`https://fithive-e-commerce.onrender.com/changequantity/${cartid}`, {
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        result = await fetch(`https://fithive-e-commerce.onrender.com/incquantity/${cartid}`, {
            method: 'post',
            body: JSON.stringify({ quantity: result.quantity }),
            headers: {
                "Content-Type": "application/json",
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        getcart()
    }
    const remove = async (cartid) => {
        setIsLoading(true)
        let result = await fetch(`https://fithive-e-commerce.onrender.com/removequantity/${cartid}`, {
            method: 'delete',
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        getcart()
    }
    const handleproceedcheckout = (userid) => {
        navigate(`/checkout/${userid}`)
    }

    return (
        <div>
            {isLoading ? (
                <div className="loading">
                    <div className="loadingspinner">
                        <ClipLoader size={80} color={"#db6401"} loading={isLoading} />
                    </div>
                </div>
            ) : (
                <div className="cartpage">
                    <h1>Cart</h1>
                    <div className="cart">
                        {cart.length === 0 ? (
                            <h3>Your cart is Empty</h3>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index}>
                                    <div className="cartitem">
                                        <div>
                                            <img src={item.image} alt="loading" />
                                        </div>
                                        <div>
                                            <p>Item - {item.name}</p>
                                        </div>
                                        <div>
                                            <p>Company - {item.company}</p>
                                        </div>
                                        <div>
                                            <p>Category - {item.category}</p>
                                        </div>
                                        <div>
                                            <p>Price - ₹{item.price} x {item.quantity}</p>
                                        </div>
                                        <div className="incdec">
                                            <button className="quantity" onClick={() => { decquantity(item._id) }}> - </button><span> {item.quantity} </span><button className="quantity" onClick={() => { incquantity(item._id) }}> + </button>
                                        </div>
                                        <div>
                                            <button className="remove" onClick={() => { remove(item._id) }}> Remove </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        )}
                    </div>
                    {cart.length === 0 ? (
                        <h3></h3>
                    ) : (
                        <>
                            <div className="totalamount">
                                <p>Total Payable Amount: ₹{totalamount}</p>
                            </div>
                            <hr />
                            <button className="proceed" onClick={() => handleproceedcheckout(auth._id)}>
                                Proceed to Checkout
                            </button>
                        </>
                    )}

                </div>
            )}
        </div>
    )
}

export default Cart;
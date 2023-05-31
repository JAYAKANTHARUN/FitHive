import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate()

    const auth = JSON.parse(localStorage.getItem('user'))

    const [cart, setcart] = useState([])

    useEffect(() => {
        getcart()
    }, [])

    const getcart = async () => {
        if (auth) {
            let result = await fetch(`http://127.0.0.1:3000/cart/${auth._id}`, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            if (result) {
                setcart(result)
            }
        }
        else {
            navigate('/login')
        }
    }

    const decquantity = async (cartid) => {
        let result = await fetch(`http://127.0.0.1:3000/changequantity/${cartid}`, {
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        if (result.quantity === '1') {
            let result = await fetch(`http://127.0.0.1:3000/removequantity/${cartid}`, {
                method: 'delete',
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            getcart()
        }
        else {
            result = await fetch(`http://127.0.0.1:3000/decquantity/${cartid}`, {
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
        let result = await fetch(`http://127.0.0.1:3000/changequantity/${cartid}`, {
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        result = await fetch(`http://127.0.0.1:3000/incquantity/${cartid}`, {
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
        let result = await fetch(`http://127.0.0.1:3000/removequantity/${cartid}`, {
            method: 'delete',
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        getcart()
    }

    return (
        <div className="cartpage">
            <h1>Cart</h1>
            <div className="cart">
                {cart.length === 0 ? (
                    <h3>Your cart is Empty</h3>
                ) : (
                    cart.map((item, index) => (
                        <div>
                            <div className="cartitem" key={index}>
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
                                    <p>Price - ${item.price}</p>
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
            <button className="proceed">Proceed to Payment</button>
        </div>


    )
}

export default Cart;
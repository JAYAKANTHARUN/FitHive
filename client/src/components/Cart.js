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
    

    return(
        <div className="cartpage">
            <h1>Cart</h1>
            <div className="cart">
                {cart.length === 0 ? (
                    <h3>No Cart Found</h3>
                ) : (
                    cart.map((item, index) => (
                        <div className="cartitem" key={index}>
                            <img src={item.image} alt="loading" />
                            <p>{item.name}</p>
                            <p>{item.company}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <hr />
                        </div>
                    ))
                )}
            </div>
        </div>


    )
}

export default Cart;
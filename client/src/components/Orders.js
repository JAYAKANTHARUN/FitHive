import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

const Orders = () => {

    const navigate = useNavigate()

    const auth = JSON.parse(localStorage.getItem('user'))

    const [orders, setorders] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getorders()
    }, [])

    const getorders = async () => {
        if (auth) {
            let result = await fetch(`http://127.0.0.1:3000/orders/${auth._id}`, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            setorders(result)
            console.log(orders)
            setIsLoading(false)
        }
        else {
            navigate('/login')
        }
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
                    <h1>Orders</h1>
                    <div className="cart">
                        {orders.length === 0 ? (
                            <h3>No Orders</h3>
                        ) : (
                            orders.map((item1, index1) => (
                                <div key={index1}>
                                    {item1.orderproducts.map((item2, index2) => (
                                        <div key={index2}>
                                            <div className="cartitem">
                                                <div>
                                                    <img src={item2.image} alt="loading" />
                                                </div>
                                                <div>
                                                    <p>Item - {item2.name}</p>
                                                </div>
                                                <div>
                                                    <p>Company - {item2.company}</p>
                                                </div>
                                                <div>
                                                    <p>Category - {item2.category}</p>
                                                </div>
                                                <div>
                                                    <p>
                                                        Price - ₹{item2.price} x {item2.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <hr />
                                    <hr />
                                </div>
                            ))
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default Orders;
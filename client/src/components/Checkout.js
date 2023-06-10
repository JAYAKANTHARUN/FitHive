import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const auth = JSON.parse(localStorage.getItem('user'))

    const [ordername, setordername] = useState('')
    const [ordermobilenumber, setordermobilenumber] = useState('')
    const [orderaddress, setorderaddress] = useState('')
    const [paymentmethod, setpaymentmethod] = useState('cod')

    const [cart, setcart] = useState([])

    const navigate = useNavigate()

    const [totalamount, settotalamount] = useState('')

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
            if (result.length !== 0) {
                let sum = 0
                result.map((item, index) => (
                    sum = sum + parseFloat(item.price) * parseFloat(item.quantity)
                ))
                settotalamount(sum)
                setcart(result)
            }
            else {
                setcart(result)
            }
        }
        else {
            navigate('/login')
        }
    }



    const handleplaceorderandpay = async (e) => {

        e.preventDefault()

        let order = await fetch(`http://127.0.0.1:3000/checkout/${auth._id}`, {
            method: 'post',
            body: JSON.stringify({ userid: auth._id, ordername: ordername, ordermobilenumber: ordermobilenumber, orderaddress: orderaddress, paymentmethod: paymentmethod, totalamount: totalamount, ordertime: new Date(), orderproducts: cart }),
            headers: {
                "Content-Type": "application/json",
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })

        order = await order.json()
        console.log(order)
        
        const options = {
            key: 'rzp_test_u8uz7rfj0GVUXE',
            amount: parseInt(totalamount) * 100,
            currency: 'INR',
            order_id: order.id,
            "handler": function (response) {
                alert("Payment Successfull");
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const handleradio = (e) => {
        setpaymentmethod(e.target.value)
    }

    return (
        <div className="checkoutpage">
            <p>Checkout</p>
            <div className="checkout">
                <label>Name : </label>
                <input className="checkoutinput" type="text" id='ordername' value={ordername} onChange={(e) => { setordername(e.target.value) }} /><br />
                <label>Mobile no : </label>
                <input className="checkoutinput" type="text" id='ordermobilenumber' value={ordermobilenumber} onChange={(e) => { setordermobilenumber(e.target.value) }} /><br />
                <label>Address : </label>
                <input className="checkoutinput" type="text" id='orderaddress' value={orderaddress} onChange={(e) => { setorderaddress(e.target.value) }} /><br />
                <br />
                <hr />
                <br />
                <div className="paymentmethod">
                    <h3>Payment Method</h3><br />
                    <div className="paymentradio">
                        <div className="radio">
                            <label>
                                <input className="radioinput" type="radio" name="paymentMethod" value="cod" id="cod" checked={paymentmethod === 'cod'} onChange={handleradio} />
                                Cash on Delivery (COD)
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input className="radioinput" type="radio" name="paymentMethod" value="online" id="online" checked={paymentmethod === 'online'} onChange={handleradio} />
                                Online Payment
                            </label>
                        </div>
                        <br />
                    </div>
                </div>
                <hr />
                <button id="rzp-button1" onClick={(e) => handleplaceorderandpay(e)}>Place Order And Pay</button>
            </div>
        </div>

    )
}
export default Checkout;
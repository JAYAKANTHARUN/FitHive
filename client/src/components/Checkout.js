import React, { useState } from "react";

const Checkout = () => {

    const [ordername, setordername] = useState('')
    const [ordermobilenumber, setordermobilenumber] = useState('')
    const [orderaddress, setorderaddress] = useState('')
    const [paymentmethod, setpaymentmethod] = useState('cod')

    const handleplaceorderandpay = () => {
        console.log(ordername, ordermobilenumber, orderaddress, paymentmethod)
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
                                <input className="radioinput" type="radio" name="paymentMethod" value="cod" id="cod"     checked={paymentmethod === 'cod'} onChange={handleradio} />
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
                <button onClick={() => { handleplaceorderandpay() }}>Place Order And Pay</button>
            </div>
        </div>

    )
}
export default Checkout;
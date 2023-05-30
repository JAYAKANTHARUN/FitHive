import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserProducts = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [products, setproducts] = useState([])
    const auth = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getproducts()
    }, [])

    const getproducts = async () => {
        let result = await fetch('http://127.0.0.1:3000/userproducts')
        result = await result.json()
        setproducts(result)
    }
    const gotodetails = (id) => {
        navigate(`/details/${id}`)
    }

    const addtocart = async (id,name,price,company,category,image) => {
        if (auth) {
            let userid=auth._id
            let result = await fetch(`http://127.0.0.1:3000/userproducts/${id}`, {
                method: 'post',
                body: JSON.stringify({ userid:userid,productid:id,name:name,company:company,category:category,price:price,image:image}),
                headers: {
                    "Content-Type": "application/json",
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            console.log(result)
        }
        else{
            navigate('/login')
        }
    }

    return (
        <div className="userproducts">
            {products.length === 0 ? (
                <h3>No Products Found</h3>
            ) : (
                products.map((item, index) => (
                    <div className="product" key={index}>
                        <img src={item.image} alt="loading" />
                        <p className="name">{item.name}</p>
                        <p className="company">{item.company}</p>
                        <p className="price">${item.price}</p>
                        <button onClick={() => { gotodetails(item._id) }}>Details</button> <button onClick={() => { addtocart(item._id,item.name,item.price,item.company,item.category,item.image) }}>Add to Cart</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default UserProducts;
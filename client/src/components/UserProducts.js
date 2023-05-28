import React from "react";
import { useState, useEffect } from "react";

const UserProducts = () => {

    const [products, setproducts] = useState([])

    useEffect(() => {
        getproducts()
    }, [])

    const getproducts = async () => {
        let result = await fetch('http://127.0.0.1:3000/userproducts')
        result = await result.json()
        setproducts(result)
    }

    return (
        <div className="userproducts">
            {products.length === 0 ? (
                <h3>No Products Found</h3>
            ) : (
                products.map((item, index) => (
                    <div classname="product" key={index}>
                        <img src={item.image} alt="loading" />
                        <p className="name">{item.name}</p>
                        <p className="company">{item.company}</p>
                        <p className="price">${item.price}</p>
                        <button>Details</button> <button>Add to Cart</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default UserProducts;
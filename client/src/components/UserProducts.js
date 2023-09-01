import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ClipLoader } from "react-spinners";

const UserProducts = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [products, setproducts] = useState([])
    const auth = JSON.parse(localStorage.getItem('user'))

    const [isVisible, setIsVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getproducts();
        setIsVisible(true);
    }, [])

    const getproducts = async () => {
        // let result = await fetch('http://127.0.0.1:3000/userproducts')
        // let result = await fetch(`mongodb+srv://jayakantharun03:${password}@cluster0.txiaeb6.mongodb.net/`)
        let result = await fetch('https://0.0.0.0:3000/userproducts')
        result = await result.json()
        setproducts(result)
        setIsLoading(false)
    }
    const gotodetails = (id) => {
        navigate(`/details/${id}`)
    }
    // const [starcount, setstarcount] = useState(parseFloat(star));

    // const handleStarClick = (starIndex) => {
    //     setstarcount(starIndex + 1);
    // };

    return (
        <div className={`userproducts ${isVisible ? 'show' : ''}`}>
            {isLoading ? (
                <div className="productsloading">
                    <div className="productsloadingspinner">
                        <ClipLoader size={80} color={"#db6401"} loading={isLoading} />
                    </div>
                </div>
            ) : products.length === 0 ? (
                <h3>No Products Found</h3>
            ) : (
                products.map((item, index) => (
                    <div onClick={() => { gotodetails(item._id) }} className="product" key={index}>
                        <img src={item.image} alt="loading" />
                        <p className="name">{item.name}</p>
                        <p className="company">{item.company}</p>
                        <div className="useramount">
                            <p className="red">-{item.discount}% Off  </p><p className="discount">₹{item.price}</p>
                        </div>
                        <p className="mrp"> M.R.P - ₹{Math.round(item.price / (1 - (item.discount / 100)))}</p>
                        <div className="userrating">
                            {item.star}.0 - {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className={index < parseFloat(item.star) ? 'star filled' : 'star'}
                                // onClick={() => handleStarClick(index)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default UserProducts;
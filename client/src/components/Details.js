import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Details = () => {

    const [name, setname] = useState('')
    const [price, setprice] = useState(0)
    const [category, setcategory] = useState('')
    const [company, setcompany] = useState('')
    const [image, setimage] = useState('')
    const params = useParams()

    useEffect(() => {
        getdetails()
    }, [])

    const getdetails = async () => {
        let result = await fetch(`http://127.0.0.1:3000/details/${params.id}`)
        result = await result.json()
        setname(result.name)
        setprice(result.price)
        setcategory(result.category)
        setcompany(result.company)
        setimage(result.image)
    }

    const [rating, setRating] = useState(4);

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    return (
        <div className="details">
            <h1>{name}</h1>
            <div className="detailsflex">
                <div className="detailimage">
                    <img className="productimage" src={image} alt="loading" />
                </div>
                <div className="detailspara">
                    <p className="brand">Brand - {company}</p>
                    <div className="rating">
                        4.0 - {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < rating ? 'star filled' : 'star'}
                                onClick={() => handleStarClick(index)}
                            >
                                &#9733;
                            </span>
                        ))} <a href=''> 135 Ratings</a>
                    </div>
                    <div className="amount">
                        <p className="red">-70%  </p><p className="discount">${price}</p>
                    </div>
                    <p className="mrp">M.R.P - ${Math.round(price * 100.00 / 70.00)}</p>
                    <p className="deals">Deal of the Day</p>
                    <p className="tax">Inclusive of all Taxes</p>
                    <div className="imageflex">
                        <div className="imageelement">
                            <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png" alt="loading" /><br />
                            <span className="imageabout">Pay on Delivery</span>
                        </div>
                        <div className="imageelement">
                            <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" alt="loading" /><br />
                            <span className="imageabout">7 Days Replacement</span>
                        </div>
                        <div className="imageelement">
                            <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" alt="loading" /><br />
                            <span className="imageabout">1 Year Warranty</span>
                        </div>
                        <div className="imageelement">
                            <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB617044271_.png" alt="loading" /><br />
                            <span className="imageabout">Top Brand</span>
                        </div>
                        <div className="imageelement">
                            <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png" alt="loading" /><br />
                            <span className="imageabout">Secure Transaction</span>
                        </div>
                    </div>
                    <div>
                        <p className="heading">About this Item - </p>
                        <p className="about">Category - {category}</p>
                        <p className="about">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, et.</p>
                        <p className="about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, eos fuga? Officiis esse laudantium.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Details;
import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";

const Details = () => {

    const [name, setname] = useState('')
    const [price, setprice] = useState(0)
    const [category, setcategory] = useState('')
    const [company, setcompany] = useState('')
    const [image, setimage] = useState('')
    const [star,setstar]=useState('')
    const [rating,setrating]=useState('')
    const [discount,setdiscount]=useState('')
    const [about,setabout]=useState('')
    const params = useParams()
    const navigate=useNavigate()

    useEffect(() => {
        const parsedstar=parseInt(star)
        setstarcount(parsedstar)
        getdetails()
    }, [star])

    const getdetails = async () => {
        let result = await fetch(`http://127.0.0.1:3000/details/${params.id}`)
        result = await result.json()
        setname(result.name)
        setprice(result.price)
        setcategory(result.category)
        setcompany(result.company)
        setimage(result.image)
        setstar(result.star)
        setrating(result.rating)
        setdiscount(result.discount)
        setabout(result.about)
    }
    const auth = JSON.parse(localStorage.getItem('user'))

    const [starcount, setstarcount] = useState(parseFloat(star));

    const handleStarClick = (starIndex) => {
        setstarcount(starIndex + 1);
    };
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
        <div className="details">
            <h1>{name}</h1>
            <div className="detailsflex">
                <div className="detailimage">
                    <img className="productimage" src={image} alt="loading" />
                </div>
                <div className="detailspara">
                    <p className="brand">Brand - {company}</p>
                    <div className="rating">
                        {star}.0 - {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < starcount ? 'star filled' : 'star'}
                                onClick={() => handleStarClick(index)}
                            >
                                &#9733;
                            </span>
                        ))} <a href=''> {rating} Ratings</a>
                    </div>
                    <div className="amount">
                        <p className="red">-{discount}%  </p><p className="discount">${price}</p>
                    </div>
                    <p className="mrp">M.R.P - ${Math.round(price * 100.00 / (100.00-discount))}</p>
                    <p className="deals">Deal of the Day</p>
                    <p className="tax">Inclusive of all Taxes</p>
                    <hr />
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
                    <hr />
                    <div>
                        <p className="heading">About this Item - </p>
                        <p className="about">Category - {category}</p>
                        <p className="about">{about}</p>
                    </div>
                    <hr />
                    <button onClick={() => { addtocart(params.id,name,price,company,category,image) }}>Add to Cart</button>
                </div>
            </div>

        </div>
    )
}

export default Details;
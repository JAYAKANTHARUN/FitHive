import React, { useState } from "react"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { ClipLoader } from "react-spinners";

const Products = () => {

    const navigate = useNavigate()

    const [products, setproducts] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    useEffect(() => {
        getproducts()
    }, [])

    const getproducts = async () => {
        setIsSearchLoading(true)
        let result = await fetch('https://fithive.onrender.com/admin', {
            headers: {
                'authorization': JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        setproducts(result)
        setIsLoading(false)
        setIsSearchLoading(false)
    }
    // console.log(products)
    // console.log(products.products)
    // console.log(products.length)

    const deleteproduct = async (id) => {
        setIsLoading(true)
        if (window.confirm("Are You Sure?")) {
            let result = await fetch(`https://fithive.onrender.com/admin/${id}`, {
                method: 'delete',
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            if (result) {
                getproducts()
            }
        }
        setIsLoading(false)
    }

    const updateproduct = (id) => {
        navigate(`/update/${id}`)
    }
    const addproduct = () => {
        navigate('/add')
    }
    const searchproduct = async (event) => {
        setIsSearchLoading(true)
        let key = event.target.value
        if (key) {
            let result = await fetch(`https://fithive.onrender.com/search/${key}`, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            if (result) {
                setproducts(result)
                setIsSearchLoading(false)
            }
        }
        else {
            getproducts()
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
                <div className="products">
                    <h1>Products List</h1>
                    <button onClick={() => addproduct()}>Add Product</button>
                    <br /><br />
                    <input className="searchbar" onChange={searchproduct} type="text" placeholder="Search Here" />
                    <br /><br />
                    <div>
                        {isSearchLoading ? (
                            <div className="searchloading">
                                <div className="searchloadingspinner">
                                    <ClipLoader size={80} color={"#db6401"} loading={isSearchLoading} />
                                </div>
                            </div>
                        ) : (
                            <div className="producttable">
                                {
                                    products.length === 0 ? <h3>No Products Found</h3>
                                        :
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Slno</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Company</th>
                                                    <th scope="col">Star</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Operation</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {isSearchLoading ? (
                                                    <div className="loading">
                                                        <div className="loadingspinner">
                                                            <ClipLoader size={80} color={"#db6401"} loading={isLoading} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    products.map((item, index) =>
                                                        <tr key={item._id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.category}</td>
                                                            <td>{item.company}</td>
                                                            <td>{item.star} Star</td>
                                                            <td>{item.discount}%</td>
                                                            <td><img src={item.image} alt="loading" /></td>
                                                            <td><button onClick={() => deleteproduct(item._id)}>Delete</button><button onClick={() => updateproduct(item._id)}>Update</button></td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products;
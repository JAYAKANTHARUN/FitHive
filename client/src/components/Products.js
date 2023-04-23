import React, { useState } from "react"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const Products = () => {

    const navigate=useNavigate()

    const [products, setproducts] = useState([])

    useEffect(() => {
        getproducts()
    }, [])

    const getproducts = async () => {
        let result = await fetch('http://127.0.0.1:3000/products')
        result = await result.json()
        setproducts(result)
    }
    // console.log(products)

    const deleteproduct = async (id) => {
        if (window.confirm("Are You Sure?")) {
            let result = await fetch(`http://localhost:3000/product/${id}`, {
                method: 'delete'
            })
            result = await result.json()
            if (result) {
                getproducts()
            }
        }
    }

    const updateproduct=(id)=>{
        navigate(`/update/${id}`)
    }
    const addproduct=()=>{
        navigate('/add')
    }

    return (
        <div className="products">
            <h1>Products List</h1>
            <button className="addbutton" onClick={()=>addproduct()}>Add Product</button>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th scope="col">Slno</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Operation</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item, index) =>
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td><button onClick={() => deleteproduct(item._id)}>Delete</button><button onClick={()=>updateproduct(item._id)}>Update</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Products;
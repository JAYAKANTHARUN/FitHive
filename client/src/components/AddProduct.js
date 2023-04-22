import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const AddProduct=()=>{

    const [name,setname]=useState('')
    const [price,setprice]=useState('')
    const [category,setcategory]=useState('')
    const [company,setcompany]=useState('')
    const navigate=useNavigate()

    const addproduct=async ()=>{
        console.log(name,price,category,company)
        
        const userid=JSON.parse(localStorage.getItem('user'))._id

        let result = await fetch('http://127.0.0.1:3000/add',{
            method:'post',
            body:JSON.stringify({userid,name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        console.log(result)
        if (result.name && result.price && result.category && result.company){
            localStorage.setItem('product',JSON.stringify(result))
            navigate('/products')
        }
        else{
            alert("Please enter valid details")
        }
    }

    return(
        <div className="addproduct">
            <h1>Add Product</h1>
            <label>Name : </label>
            <input type="text" id='name' placeholder='Enter Name' value={name} onChange={(e) => { setname(e.target.value) }} /><br />
            <label>Price : </label>
            <input type="text" id='price' placeholder='Enter Price' value={price} onChange={(e) => { setprice(e.target.value) }} /><br />
            <label>Category : </label>
            <input type="text" id='category' placeholder='Enter Category' value={category} onChange={(e) => { setcategory(e.target.value) }} /><br />
            <label>Company : </label>
            <input type="text" id='company' placeholder='Enter Company' value={company} onChange={(e) => { setcompany(e.target.value) }} /><br />
            <button type='submit' onClick={addproduct}>Add</button>
            
        </div>
    )
}

export default AddProduct;
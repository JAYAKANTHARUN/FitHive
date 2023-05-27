import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const AddProduct=()=>{

    const [name,setname]=useState('')
    const [price,setprice]=useState('')
    const [category,setcategory]=useState('')
    const [company,setcompany]=useState('')
    const [image,setimage]=useState('')
    const navigate=useNavigate()

    const addproduct=async ()=>{
        //console.log(name,price,category,company,image)
        
        //const userid=JSON.parse(localStorage.getItem('user'))._id

        let result = await fetch('http://127.0.0.1:3000/add',{
            method:'post',
            body:JSON.stringify({name,price,category,company,image}),
            headers:{
                'Content-Type':'application/json',
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        })
        result=await result.json()
        //console.log(result)
        if (result.name && result.price && result.category && result.company && result.image){
            navigate('/admin')
        }
        else{
            alert("Please enter valid details")
        }
    }
    const converttobase64=(e)=>{
        //console.log(e)
        var reader=new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            //console.log(reader.result)
            setimage(reader.result)
        }
        reader.onerror=error=>{
            console.log(error)
        }
    }

    return(
        <div className="addproduct">
            <h1>Add Product</h1>
            <label>Name : </label>
            <input type="text" id='name' value={name} onChange={(e) => { setname(e.target.value) }} /><br />
            <label>Price : </label>
            <input type="text" id='price' value={price} onChange={(e) => { setprice(e.target.value) }} /><br />
            <label>Category : </label>
            <input type="text" id='category' value={category} onChange={(e) => { setcategory(e.target.value) }} /><br />
            <label>Company : </label>
            <input type="text" id='company' value={company} onChange={(e) => { setcompany(e.target.value) }} /><br />
            <label>Image : </label>
            <input type="file" accept="image/*" onChange={converttobase64} />
            {image === "" || image === null ? "" : <img src={image} alt="loading" />} <br />
            <button type='submit' onClick={addproduct}>Add</button>
            
        </div>
    )
}

export default AddProduct;
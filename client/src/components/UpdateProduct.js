import React,{useState,useEffect} from "react"
import { useParams,useNavigate } from "react-router-dom"

const UpdateProduct=()=>{

    const [name,setname]=useState('')
    const [price,setprice]=useState('')
    const [category,setcategory]=useState('')
    const [company,setcompany]=useState('')
    const params=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        getproductdetails()
    },[])

    const getproductdetails=async()=>{
        let result= await fetch(`http://127.0.0.1:3000/admin/${params.id}`,{
            headers:{
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        setname(result.name)
        setprice(result.price)
        setcategory(result.category)
        setcompany(result.company)
    }

    const updateproduct=async ()=>{
        console.log(name,price,category,company)
        let result = await fetch(`http://127.0.0.1:3000/admin/${params.id}`,{
            method:'post',
            body:JSON.stringify({id:params.id,name,price,category,company}),
            headers:{
                "Content-Type":"application/json",
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        })
        result=await result.json()
        //console.log(result)
        if (result.matchedCount){
            navigate('/admin')
        }
        else{
            alert("Please enter valid details")
        }
    }

    return(
        <div className="addproduct">
            <h1>Update Product</h1>
            <label>Name : </label>
            <input type="text" id='name' placeholder='Enter new Name' value={name} onChange={(e) => { setname(e.target.value) }} /><br />
            <label>Price : </label>
            <input type="text" id='price' placeholder='Enter new Price' value={price} onChange={(e) => { setprice(e.target.value) }} /><br />
            <label>Category : </label>
            <input type="text" id='category' placeholder='Enter new Category' value={category} onChange={(e) => { setcategory(e.target.value) }} /><br />
            <label>Company : </label>
            <input type="text" id='company' placeholder='Enter new Company' value={company} onChange={(e) => { setcompany(e.target.value) }} /><br />
            <button type='submit' onClick={updateproduct}>Update</button>
            
        </div>
    )
}

export default UpdateProduct;
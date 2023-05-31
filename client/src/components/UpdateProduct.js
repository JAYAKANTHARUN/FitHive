import React,{useState,useEffect} from "react"
import { useParams,useNavigate } from "react-router-dom"

const UpdateProduct=()=>{

    const [name,setname]=useState('')
    const [price,setprice]=useState('')
    const [category,setcategory]=useState('')
    const [company,setcompany]=useState('')
    const [image,setimage]=useState('')
    const [star,setstar]=useState('')
    const [rating,setrating]=useState('')
    const [discount,setdiscount]=useState('')
    const [about,setabout]=useState('')
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
        setimage(result.image)
        setstar(result.star)
        setrating(result.rating)
        setdiscount(result.discount)
        setabout(result.about)
    }

    const updateproduct=async ()=>{
        console.log(name,price,category,company,image,star,rating,discount,about)
        let result = await fetch(`http://127.0.0.1:3000/admin/${params.id}`,{
            method:'post',
            body:JSON.stringify({id:params.id,name,price,category,company,image,star,rating,discount,about}),
            headers:{
                "Content-Type":"application/json",
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        })
        result=await result.json()
        console.log(result)
        if (result.matchedCount){
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
            <h1>Update Product</h1>
            <label>Name : </label>
            <input type="text" id='name' value={name} onChange={(e) => { setname(e.target.value) }} /><br />
            <label>Price : </label>
            <input type="text" id='price' value={price} onChange={(e) => { setprice(e.target.value) }} /><br />
            <label>Category : </label>
            <input type="text" id='category' value={category} onChange={(e) => { setcategory(e.target.value) }} /><br />
            <label>Company : </label>
            <input type="text" id='company' value={company} onChange={(e) => { setcompany(e.target.value) }} /><br />
            <label>Star : </label>
            <input type="text" id='star' value={star} onChange={(e) => { setstar(e.target.value) }} /><br />
            <label>Rating : </label>
            <input type="text" id='rating' value={rating} onChange={(e) => { setrating(e.target.value) }} /><br />
            <label>Discount : </label>
            <input type="text" id='discount' value={discount} onChange={(e) => { setdiscount(e.target.value) }} /><br />
            <label>About : </label>
            <input type="text" id='about' value={about} onChange={(e) => { setabout(e.target.value) }} /><br />
            <label>Image : </label>
            <input type="file" accept="image/*" onChange={converttobase64} />
            {image === "" || image === null ? "" : <img src={image} alt="loading" />} <br />
            <button type='submit' onClick={updateproduct}>Update</button>
            
        </div>
    )
}

export default UpdateProduct;
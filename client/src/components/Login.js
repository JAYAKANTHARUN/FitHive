import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if (auth){
            navigate('/')
        }
    })

    const handlelogin=async()=>{
        console.log(name,email,password)
        let result = await fetch('http://127.0.0.1:3000/login',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        console.log(result)
        if (result.name && result.name){
            localStorage.setItem("user",JSON.stringify(result))
            navigate('/products')
        }
        else{
            alert("Please enter valid details")
        }
    }

    return(
        <div className="signup">
            <h1>Log In</h1>
            <label>Name</label><br />
            <input type="text" id='name' placeholder='Enter Your Name' value={name} onChange={(e) => { setname(e.target.value) }} /><br /><br />
            <label>Email</label><br />
            <input type="email" id='email' placeholder='Enter Email' value={email} onChange={(e) => { setemail(e.target.value) }} /><br /><br />
            <label>Password</label><br />
            <input type="password" id='password' placeholder='Enter Password' value={password} onChange={(e) => { setpassword(e.target.value) }} /><br /><br />
            <button type='submit' onClick={handlelogin}>Submit</button>
        </div>
    )
}

export default Login;
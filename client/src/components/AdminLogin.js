import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin=()=>{
    const navigate=useNavigate()

    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')

    const handleadminlogin=async()=>{
        let result=await fetch('http://127.0.0.1:3000/adminlogin',{
            method:'post',
            body:JSON.stringify({username,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        //console.log(result)
        if (result.admin.username && result.auth){
            localStorage.setItem("admin",JSON.stringify(result.admin))
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/admin')
        }
        else{
            alert("Please enter valid details")
        }
    }

    return(
        <div className="adminlogin">
            <h1>Admin LogIn</h1>
            <label>Username</label><br />
            <input type="text" id='username' value={username} onChange={(e) => { setusername(e.target.value) }} /><br /><br />
            <label>Password</label><br />
            <input type="password" id='password' value={password} onChange={(e) => { setpassword(e.target.value) }} /><br /><br />
            <button type='submit' onClick={handleadminlogin}>Submit</button>
        </div>
    )
}

export default AdminLogin;
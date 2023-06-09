import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        const auth =  localStorage.getItem('user')
        if (auth){
            navigate('/')
        }
    })

    const collectdata = async() => {
        console.log(name, email, password)
        let result=await fetch('http://127.0.0.1:3000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        console.log(result)
        if (result.result.name && result.result.email && result.auth){
            localStorage.setItem("user",JSON.stringify(result.result))
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/userproducts')
        }
        else if (result.result==='account present'){
            alert("Account already present")
        }
        else{
            alert("Please enter valid details")
        }
    }

    return (
        <div className='signup'>
            <h1>Sign Up</h1>
            <label>Name</label><br />
            <input type="text" id='name' placeholder='Enter Your Name' value={name} onChange={(e) => { setname(e.target.value) }} /><br /><br />
            <label>Email</label><br />
            <input type="email" id='email' placeholder='Enter Email' value={email} onChange={(e) => { setemail(e.target.value) }} /><br /><br />
            <label>Password</label><br />
            <input type="password" id='password' placeholder='Enter Password' value={password} onChange={(e) => { setpassword(e.target.value) }} /><br /><br />
            <button type='submit' onClick={collectdata}>Submit</button>
        </div>
    )
}

export default SignUp
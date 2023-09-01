import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

const Login = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

    const [isVisible, setIsVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }

    })

    const handlelogin = async () => {
        setIsLoading(true)
        console.log(name, email, password)
        let result = await fetch('https://fithive.onrender.com/login', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        if (result.user.name && result.user.email && result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            setIsLoading(false)
            navigate('/userproducts')
        }
        else {
            setIsLoading(false)
            alert("Please enter valid details")
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
                <div className="signuppage">
                    <div className={`signup ${isVisible ? 'show' : ''}`}>
                        <h1>Log In</h1>
                        <label>Name</label><br />
                        <input type="text" id='name' placeholder='Enter Your Name' value={name} onChange={(e) => { setname(e.target.value) }} /><br /><br />
                        <label>Email</label><br />
                        <input type="email" id='email' placeholder='Enter Email' value={email} onChange={(e) => { setemail(e.target.value) }} /><br /><br />
                        <label>Password</label><br />
                        <input type="password" id='password' placeholder='Enter Password' value={password} onChange={(e) => { setpassword(e.target.value) }} /><br /><br />
                        <button type='submit' onClick={handlelogin}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;
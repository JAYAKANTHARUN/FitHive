import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

const AdminLogin = () => {
    const navigate = useNavigate()

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const handleadminlogin = async () => {
        setIsLoading(true)
        let result = await fetch('https://fithive.onrender.com/adminlogin', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        //console.log(result)
        if (result.admin.username && result.auth) {
            localStorage.setItem("admin", JSON.stringify(result.admin))
            localStorage.setItem("token", JSON.stringify(result.auth))
            setIsLoading(false)
            navigate('/admin')
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
                <div className="adminlogin">
                    <h1>Admin LogIn</h1>
                    <label>Username</label><br />
                    <input type="text" id='username' value={username} onChange={(e) => { setusername(e.target.value) }} /><br /><br />
                    <label>Password</label><br />
                    <input type="password" id='password' value={password} onChange={(e) => { setpassword(e.target.value) }} /><br /><br />
                    <button type='submit' onClick={handleadminlogin}>Submit</button>
                </div>
            )}
        </div>
    )
}

export default AdminLogin;
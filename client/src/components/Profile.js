import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

import { ClipLoader } from "react-spinners";

const Profile = () => {

    const [display, setdisplay] = useState(false)
    const [newpassword,setnewpassword]=useState('')
    const [currentpassword,setcurrentpassword]=useState('')


    const auth = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const handlechangepassword = () => {
        setdisplay(true)
    }
    const changepassword=async(userid)=>{
        setIsLoading(true)
        let result=await fetch('https://fithive.onrender.com/profile',{
            method:'post',
            body:JSON.stringify({userid,currentpassword,newpassword}),
            headers:{
                "Content-Type":"application/json",
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        })
        result=await result.json()
        if (result.modifiedCount){
            setIsLoading(false)
            alert("Password Updated")
            navigate('/userproducts')
        }
        else{
            setIsLoading(false)
            alert("Enter Valid Details")
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
                <div className="profile">
                <br />
                <h1>Profile</h1>
                <br />
                <div className="profiledetails">
                    <label>Username : {auth.name}</label><br /><br />
                    <label>Email : {auth.email}</label>
                    <br /><br /><br /><br /><br />
                    {!display ? <button onClick={() => handlechangepassword()}>Change Password</button> :
                        <div>
                            <label>Current Password:</label>
                            <input type="password" id="currentpassword" value={currentpassword} onChange={(e)=>setcurrentpassword(e.target.value)}/>
                            <br /><br />
                            <label>New Password:</label>
                            <input type="password" id="newpassword" value={newpassword} onChange={(e)=>setnewpassword(e.target.value)}/>
                            <br />
                            <br />
                            <button onClick={()=>changepassword(auth._id)}>Save Password</button>
                        </div>
                    }
                </div>
            </div>
            )}
        </div>
    )
}

export default Profile;
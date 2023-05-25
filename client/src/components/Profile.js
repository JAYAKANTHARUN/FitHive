import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const Profile = () => {

    const [display, setdisplay] = useState(false)
    const [newpassword,setnewpassword]=useState('')
    const [currentpassword,setcurrentpassword]=useState('')


    const auth = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const handlechangepassword = () => {
        setdisplay(true)
    }
    const changepassword=async(userid)=>{
        let result=await fetch('http://127.0.0.1:3000/profile',{
            method:'post',
            body:JSON.stringify({userid,currentpassword,newpassword}),
            headers:{
                "Content-Type":"application/json",
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        })
        result=await result.json()
        if (result.modifiedCount){
            alert("Password Updated")
            navigate('/products')
        }
        else{
            alert("Enter Valid Details")
        }
    }

    return (
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
    )
}

export default Profile;
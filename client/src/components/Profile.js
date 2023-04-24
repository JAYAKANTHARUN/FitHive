import React from "react";

const Profile = () => {
    const auth = JSON.parse(localStorage.getItem('user'))
    return (
        <div className="profile">
            <br />
            <h1>Profile</h1>
            <br />
            <div className="profiledetails">
                <label>Username : {auth.name}</label><br /><br />
                <label>Email : {auth.email}</label>
            </div>
        </div>
    )
}

export default Profile;
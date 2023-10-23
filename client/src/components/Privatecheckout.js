import React from "react";
import { Navigate,Outlet,useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";

const Privatecheckout=()=>{

    const auth = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()

    const [length, setlength] = useState(1)

    useEffect(() => {
        getcart()
    }, [])

    const getcart = async () => {
        if (auth) {
            let result = await fetch(`https://fithive-e-commerce.onrender.com/cart/${auth._id}`, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            if (result.length === 0) {
                setlength(0)
            }
        }
        else {
            navigate('/login')
        }
    }

    return length !== 0 ? <Outlet /> : <Navigate to='/userproducts' />
}

export default Privatecheckout;
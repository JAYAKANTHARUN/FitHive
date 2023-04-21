import React, { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Nav=()=>{
    const auth=localStorage.getItem('user')
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.clear()
        navigate('/')
    }
    return(
        <div>
            <ul  className='navbar'>
                <li><Link to='/'>FitHive</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                <li><Link to='/delete'>Delete Products</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li className='navsignup'>{auth ? <Link onClick={logout} to='/'>Logout</Link> : <Link to='/signup'>SignUp</Link> }</li>
            </ul>
        </div>
    )
}
export default Nav;
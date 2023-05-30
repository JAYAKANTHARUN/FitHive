import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Nav=()=>{
    const auth=localStorage.getItem('user')
    const admin=localStorage.getItem('admin')
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.clear()
        navigate('/')
    }
    return(
        <div>
            <ul  className='navbar'>
                <li><Link to='/'>FitHive</Link></li>
                <li><Link to='/userproducts'>Products</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                {/* <li><Link to='/add'>Add Products</Link></li> */}
                {/* <li><Link to='/update'>Update Products</Link></li>
                <li><Link to='/delete'>Delete Products</Link></li> */}
                {/* <li><Link to='/profile'>Profile</Link></li> */}
                <li className='navsignup'>{auth || admin ? <Link onClick={logout} to='/'>Logout</Link> : <Link to='/signup'>SignUp</Link> }</li>
                <li className='navsignup'>{!admin && (auth ? <Link to='/profile'>Profile</Link> : <Link to='/login'>LogIn</Link>)}</li>
            </ul>
        </div>
    )
}
export default Nav;
import React from 'react'
import {Link} from 'react-router-dom'

const Nav=()=>{
    return(
        <div>
            <ul  className='navbar'>
                <li><Link to='/'>FitHive</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                <li><Link to='/delete'>Delete Products</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li className='navsignup'><Link to='/signup'>SignUp</Link></li>
            </ul>
        </div>
    )
}
export default Nav;
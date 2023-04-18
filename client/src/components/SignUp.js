import React,{useState} from 'react'

const SignUp=()=>{
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

    const signup=()=>{
        console.log(name,email,password)
    }

    return(
        <div className='signup'>
            <h1>Sign Up</h1>
            <label>Name</label><br />
            <input type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>{ setname(e.target.value) }} /><br /><br />
            <label>Email</label><br />
            <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>{ setemail(e.target.value) }}/><br /><br />
            <label>Password</label><br />
            <input type="password" placeholder='Enter Password'value={password} onChange={(e)=>{ setpassword(e.target.value) }} /><br /><br />
            <button type='submit' onClick={signup}>Submit</button>
        </div>
    )
}

export default SignUp
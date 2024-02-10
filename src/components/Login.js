import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../FirebaseConfig'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login({ setloggedin }) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    function login() {
        signInWithEmailAndPassword(auth, email, password).then(e => setloggedin(true)).catch(err => toast.error("Invalid Credentials!")) 
    }
    return (
        <div className='login-container bg-success my-5 pt-5 pb-4 px-3 text-light'>
            <ToastContainer theme='colored' />
            <p className='font-theme display-4 text-center mb-4'>Welcome to Royal College Plants</p>
            <div className='mb-2'>
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={email} onChange={e => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-2">
                <label for="exampleInputEmail1" className="form-label">Password</label>
                <input type="password" value={password} onChange={e => setpassword(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <button type="submit" onClick={login} class="btn btn-success border border-light">Submit</button>
        </div>
    )
}

export default Login

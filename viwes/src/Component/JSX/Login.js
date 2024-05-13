import React, { useEffect, useState } from 'react';
import logo from '../Images/logo.jpeg'
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import '../CSS/Login.css';
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a state for loading
  const [clicked, setClicked] = useState(false); // Add a state for button clicks

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  }

  const Userlogin = async (e) => {

    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      setLoading(true); // Set loading to true when the button is clicked
  
      const res = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });
  
      const data = await res.json();
  
      if (res.status === 400 || !data) {
        const errorMessage = data.error; // Get the error message from the response data
        window.alert(errorMessage); // Show an alert with the error message
        navigate("/");
      } else {
        window.alert("Sign in Successful");
        localStorage.setItem("user", data.userId); 
        navigate("/dashboard");
      }
  
      setLoading(false); // Set loading to false after the login process is complete
      setClicked(false); // Reset the button click state
    }
  }
  return (
    <div className='container'>
      <form className='Loginform' method='POST'>
        <div className='formlogo'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='title'><h1>Sign in</h1></div>
        <div className='input-container1'>
          <input type="text" id='email' autoComplete='off' required className='text-input1' value={email} onChange={(e) => setemail(e.target.value)} />
          <label htmlFor="email" className='label'>Email address</label>
        </div>
        <div className='input-container1'>
          <input type={type} id='password' autoComplete='off' required className='text-input1' value={password} onChange={(e) => setpassword(e.target.value)} />
          <label htmlFor="password" className='label'>Password</label>
          <span onClick={handleToggle} className='icon'><Icon icon={icon} size={20} color='black' /></span>
        </div>
        <button type="button" className='Login' onClick={Userlogin} disabled={loading || clicked}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <div className='Sigin-Up' > <h1>No account?<span><NavLink to="/signUp"> Sign up</NavLink></span></h1>
        </div>
      </form>
    </div>
  )
}

export default Login
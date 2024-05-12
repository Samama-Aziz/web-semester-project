import React, { useState } from 'react';
import logo from '../Images/logo.jpeg'
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import '../CSS/Login.css';
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Name: "", email: "", password: ""
  });
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [loading, setLoading] = useState(false); // Add a state for loading
  const [clicked, setClicked] = useState(false); // Add a state for button clicks

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      setLoading(true); // Set loading to true when the button is clicked
  
      const res = await fetch('/Registration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
  
      const data = await res.json();
  
      if (res.status === 422 || !data) {
        window.alert(data.error); // Provide a generic error message
      } else {
        window.alert("Registration Successful");
        navigate("/");
      }
  
      setLoading(false); // Set loading to false after the registration process is complete
      setClicked(false); // Reset the button click state
    }
  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  }

  return (
    <div className='container'>
      <form className='Loginform' method='POST'>
        <div className='formlogo'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='title'><h1>Create your account</h1></div>
        <div className='input-container1'>
          <input type="text" name='Name' id='name' autoComplete='off' required className='text-input1' value={user.Name} onChange={handleInputs} />
          <label htmlFor="name" className='label'>Full name</label>
        </div>
        <div className='input-container1'>
          <input type="text" name='email' id='email' autoComplete='off' required className='text-input1' value={user.email} onChange={handleInputs} />
          <label htmlFor="email" className='label'>Email address</label>
        </div>
        <div className='input-container1'>
          <input type={type} name='password' id='password' autoComplete='off' required className='text-input1' value={user.password} onChange={handleInputs} />
          <label htmlFor="password" className='label'>Password</label>
          <span onClick={handleToggle} className='icon'><Icon icon={icon} size={20} color='black' /></span>
        </div>
        <button type="button" className='Login' onClick={postData} disabled={loading || clicked}>
          {loading ? 'Loading...' : 'Create'}
        </button>
        <div className='Sigin-Up' > <h1>Have an account?<span><NavLink to="/"> Sign in</NavLink></span></h1>
        </div>
      </form>
    </div>
  )
}

export default Signup;

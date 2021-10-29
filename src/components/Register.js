import React, { useState } from 'react';
import {
  Link,
  Redirect
} from "react-router-dom"
import { register } from '../api';

const Register = ({ setAuthenticated, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
        setError("Passwords Do Not Match")
        return
    }
    try {
      const data = await register(username, password,email);
      console.log ("USER RESPONSE", data)
      if (data.token) {
        const token = data.token
        setToken(data.token)
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        setFormSubmittedSuccessfully(true);
        setAuthenticated(true);
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  if (formSubmittedSuccessfully) {
    return <Redirect to="/" />
  }

  return (
    <div className="card">
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Register</h1>
        <p className="form-subtitle">All Ready have an Account? <Link className="link-subtitle" to="/Login">Click Here to Login</Link></p>
        {/* <Link className="link-subtitle" to="/register">Click Here to Register</Link> */}
        <div className="form-fields">
          <label htmlFor="username"><b>UserName</b></label>
          <input
            type='text' required
            name='username'
            placeholder='Enter Your Username'
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <label htmlFor="emailAddress"><b>Email Address</b></label>
          <input
            type='text' required
            name='emailAddress'
            placeholder='Enter Your Email Address'
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          
          <label htmlFor="password"><b>Password</b></label>
          <input
            type='password' required
            name='password'
            placeholder='Enter Your Password'
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <label htmlFor="password"><b>Confirm Password</b></label>
          <input
            type='password' required
            name='password'
            placeholder='Enter Your Password'
            onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}
          />
        </div>
        <button className="btn-form" type="submit">Register</button>
      </form>
    </div>
  )
}


export default Register;
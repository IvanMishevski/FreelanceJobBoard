import React, { useState } from 'react';
import { Link } from 'react-router';
import './Register.css'; // Assuming you have a CSS file

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    tel: '',
    password: '',
    rePassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="wrapper-register">
      <h2>Registration</h2>
      
      <form onSubmit={handleSubmit}>
        {/* username */}
        <div className="input-box">
          <input 
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        
        {/* email */}
        <div className="input-box">
          <input 
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        {/* telephone */}
        <div className="input-box">
          <input 
            type="text"
            name="tel"
            id="tel"
            placeholder="Enter your phone number"
            value={formData.tel}
            onChange={handleChange}
          />
        </div>
        
        {/* password */}
        <div className="input-box">
          <input 
            type="password"
            name="password"
            id="password"
            placeholder="******"
            autoComplete="on"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        {/* rePassword */}
        <div className="input-box">
          <input 
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="******"
            autoComplete="on"
            value={formData.rePassword}
            onChange={handleChange}
          />
        </div>
        
        <div className="input-box button">
          <input 
            type="submit" 
            value="Register Now"
          />
        </div>
        
        <div className="text">
          <h3>Already have an account? <Link to="/login">Login</Link></h3>
        </div>
      </form>
    </div>
  );
}
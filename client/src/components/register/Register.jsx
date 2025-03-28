import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Register.css'; 
import { useRegister } from '../../api/userApi';
import { useUserContext } from '../../contexts/UserContext';

export default function Register() {
  
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();

  const registerHandler = async (formData) => {
    const { email, password } = Object.fromEntries(formData);

    const confirmPassword = formData.get('rePassword');

    if (password !== confirmPassword) {
      console.log('Password missmatch');

      return;
    }

    const authData = await register(email, password);

    userLoginHandler(authData);

    navigate('/');
  }
    return (
      <div className="wrapper-register">
        <h2>Registration</h2>

        <form action={registerHandler}>
          {/* username */}
          <div className="input-box">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              
            />
          </div>

          {/* email */}
          <div className="input-box">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              
            />
          </div>

          {/* telephone */}
          <div className="input-box">
            <input
              type="text"
              name="tel"
              id="tel"
              placeholder="Enter your phone number"
              
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

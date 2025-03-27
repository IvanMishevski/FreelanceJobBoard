import React, { useState } from 'react';
import { Link } from 'react-router';
import './Login.css'; 

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login submitted:', formData);
    };

    return (
        <div className="wrapper-login">
            <div className="title"><p>Login Form</p></div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <i className="fa-solid fa-envelope"></i>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="john.doe@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <i className="fas fa-lock"></i>
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
                <div className="row button">
                    <input type="submit" value="Login" />
                </div>
                <div className="signup-link">Not a member? <Link to="/register">Register</Link></div>
            </form>
        </div>
    );
}
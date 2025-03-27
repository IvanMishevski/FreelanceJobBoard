import React, { useActionState, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Login.css'; 

export default function Login({
    onLogin
}) {
    const navigate = useNavigate()

    const loginHandler = (previousState, formData) => {
        
        const values = Object.fromEntries(formData);

        onLogin(values.email);

        // navigate('/jobs')

        return values;
    };
    const[values, loginAction, isPending] = useActionState(loginHandler, {email: '',password: ''});
    

    

    return (
        <div className="wrapper-login">
            <div className="title"><p>Login Form</p></div>
            <form action={loginAction}>
                <div className="row">
                    <i className="fa-solid fa-envelope"></i>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="john.doe@gmail.com"
                        
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
                        
                    />
                </div>
                <div className="row button">
                    <input type="submit" value="Login" disabled={isPending}/>
                </div>
                <div className="signup-link">Not a member? <Link to="/register">Register</Link></div>
            </form>
        </div>
    );
}
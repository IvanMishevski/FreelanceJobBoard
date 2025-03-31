import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import './Login.css';
import { UserContext } from '../../contexts/UserContext';
import { useLogin } from '../../api/userApi';
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Clear auth error when user types in any field
        if (errors.auth) {
            setErrors(prev => ({
                ...prev,
                auth: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        // Password validation - only check if it's empty
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const authData = await login(formData.email, formData.password);
            userLoginHandler(authData);
            toast.success('Successful Login');
            navigate(-1);
        } catch (err) {
            // Generic error message for security
            toast.error('Incorrect email or password');
            
            // Set generic authentication error
            setErrors(prev => ({ 
                ...prev, 
                auth: 'Incorrect email or password'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wrapper-login">
            <div className="title"><p>Login Form</p></div>
            <form onSubmit={handleSubmit}>
                {errors.auth && <div className="error-message auth-error">{errors.auth}</div>}
                
                <div className="row">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john.doe@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-input' : ''}
                    />
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
                
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
                        className={errors.password ? 'error-input' : ''}
                    />
                </div>
                {errors.password && <div className="error-message">{errors.password}</div>}
                
                <div className="row button">
                    <input 
                        type="submit" 
                        value={isSubmitting ? "Logging in..." : "Login"} 
                        disabled={isSubmitting} 
                    />
                </div>
                <div className="signup-link">Not a member? <Link to="/register">Register</Link></div>
            </form>
        </div>
    );
}

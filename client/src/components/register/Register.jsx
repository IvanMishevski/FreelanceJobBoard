import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Register.css'; 
import { useRegister } from '../../api/userApi';
import { useUserContext } from '../../contexts/UserContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    // Clear error for this field when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const { username, email, password, rePassword } = formValues;
    const newErrors = {};

    // Username validation
    if (!username || username.trim() === '') {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!email || email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password || password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (password !== rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const validationErrors = validateForm();
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      const { username, email, password } = formValues;
      const authData = await register(username, email, password);

      if (!authData) {
        setErrors({ form: 'Registration failed. Please try again.' });
        setIsSubmitting(false);
        return;
      }

      userLoginHandler(authData);
      navigate('/jobs');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        form: error.message || 'An error occurred during registration. Please try again.' 
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper-register">
      <h2>Registration</h2>

      {errors.form && <div className="error-message">{errors.form}</div>}

      <form onSubmit={registerHandler}>
        {/* username */}
        <div className="input-box">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            className={errors.username ? 'error-input' : ''}
            value={formValues.username}
            onChange={handleInputChange}
          />
          {errors.username && <div className="field-error">{errors.username}</div>}
        </div>

        {/* email */}
        <div className="input-box">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={errors.email ? 'error-input' : ''}
            value={formValues.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        
        {/* password */}
        <div className="input-box">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            autoComplete="on"
            className={errors.password ? 'error-input' : ''}
            value={formValues.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>

        {/* rePassword */}
        <div className="input-box">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="******"
            autoComplete="on"
            className={errors.rePassword ? 'error-input' : ''}
            value={formValues.rePassword}
            onChange={handleInputChange}
          />
          {errors.rePassword && <div className="field-error">{errors.rePassword}</div>}
        </div>

        <div className="input-box button">
          <input
            type="submit"
            value={isSubmitting ? "Registering..." : "Register Now"}
            disabled={isSubmitting}
          />
        </div>

        <div className="text">
          <h3>Already have an account? <Link to="/login">Login</Link></h3>
        </div>
      </form>
    </div>
  );
}

import React, { useActionState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import './Login.css';
import { UserContext } from '../../contexts/UserContext';
import { useLogin } from '../../api/userApi';
import { toast } from 'react-toastify';

export default function Login({
    onLogin
}) {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);


        const authData = await login(values.email, values.password);
        onLogin(authData);
        navigate('/jobs');



    }
        const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });



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
                        <input type="submit" value="Login" disabled={isPending} />
                    </div>
                    <div className="signup-link">Not a member? <Link to="/register">Register</Link></div>
                </form>
            </div>
        );
    }
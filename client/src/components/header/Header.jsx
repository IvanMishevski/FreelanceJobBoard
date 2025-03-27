import { Link } from "react-router";
import './Header.css'

export default function Header() {
    return (
        <header>
            <div className="inner_header">
                <div className="logo_container">
                   <h1>Freelance <span>JobBoard</span></h1>
                </div>
                <ul className="navigation">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/jobs"><li>All jobs</li></Link>
                    <Link to="/create"><li>Create</li></Link>
                    <Link to="/profile"><li>Profile</li></Link>
                    <Link to="/login"><li>Login</li></Link>
                    <Link to="/register"><li>Register</li></Link>
                    <Link to="/logout"><li>Logout</li></Link>
                </ul>
            </div>
        </header>
    );
}



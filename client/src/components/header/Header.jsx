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
                    <Link to="/"><a><li>Home</li></a></Link>
                    <Link to="/jobs"><a><li>All jobs</li></a></Link>
                    <Link to="/create"><a><li>Create</li></a></Link>
                    <Link to="/profile"><a><li>Profile</li></a></Link>
                    <Link to="/login"><a><li>Login</li></a></Link>
                    <Link to="/register"><a><li>Register</li></a></Link>
                    <Link to="/logout"><a><li>Logout</li></a></Link>

                </ul>
            </div>

        </header>
    );
}



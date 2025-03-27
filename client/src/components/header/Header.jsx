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
                    <a><li>All jobs</li></a>
                    <a><li>Create</li></a>
                    <a><li>Profile</li></a>
                    <a><li>Login</li></a>
                    <a><li>Register</li></a>
                    <a><li>Logout</li></a>

                </ul>
            </div>

        </header>
    );
}



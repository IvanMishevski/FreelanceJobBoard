import './Home.css'
import { Link } from "react-router"
export default function Home() {
    return (
        <div className="welcome-text">
            <h1>Find the perfect job for you</h1>
            <p><Link to="/jobs"></Link>View Jobs</p>
        </div>
    )
}
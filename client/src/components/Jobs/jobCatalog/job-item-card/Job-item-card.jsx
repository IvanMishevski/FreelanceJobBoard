import './Job-item-card.css';
import { Link } from 'react-router'

export default function JobItemCard({
    _id,
    jobTitle,
    company,
    image, 
}) {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={image} />
                <h2>{jobTitle}</h2>
                <h6>{company}</h6>
                <Link to={`/jobs/${_id}/details`} className="details-button">Details</Link>
            </div>
        </div>
    );
}
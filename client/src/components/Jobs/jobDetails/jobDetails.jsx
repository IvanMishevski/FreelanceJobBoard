import React from 'react';
import './jobDetails.css';
import { Link, useNavigate, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useJob, useDeleteJob } from '../../../api/jobsApi';

const JobDetails = () => {
    const { jobId } = useParams();
    const { job } = useJob(jobId);
    const { userId } = useAuth();

    const jobDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${job.jobTitle} game?`);

        if (!hasConfirm) {
            return;
        }

        await deleteGame(jobId);

        navigate('/games');
    };

    const isOwner = userId === job._ownerId; 
    console.log(userId);
    
    return (
        <div className="container">
            <div className="job-content">
                <div className="job-title">
                    <div className="job-name-wrapper">
                        <div className="job-name">
                            <h2>Job Title: {job.jobTitle}</h2>
                            <h2>Company:{job.company}</h2>
                            <div className="job-description">
                                Description:{job.description}
                            </div>
                            <h2>Salary:{job.salary}$</h2>
                            <div className="answear">
                                {isOwner && (
                                    <>
                                    <button className="edit-button"><Link to={`/jobs/${job._id}/edit`} className="edit-link" style={{ color: 'white', textDecoration: 'none' }}>Edit</Link></button>
                                    <button onClick={jobDeleteClickHandler} className="delete-button">Delete</button>
                                </>
                                )


                                }


                            </div>

                        </div>
                        <div className="subscribers">
                            <p>
                                {/* Applications: <span>{applications.length || 0}</span> */}
                            </p>
                        </div>
                    </div>
                </div>

                {/* {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <header className="header">
              <p>
                <span>{comment.userId?.username}</span> commented
                <time>{elapsedTime(comment.created_at)}</time>
              </p>
            </header>
            <div className="comment-main">
              <div className="userdetails">
                <img src="profile.png" alt="avatar" />
              </div>
              <div className="post-content">
                <p>
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        ))} */}

                {(
                    <div className="answer-comment">
                        <p>
                            <span></span> Add new comment:
                        </p>
                        <div className="answer">
                            <form >
                                <textarea
                                    name="text"
                                    id="comment"
                                    cols="30"
                                    rows="10"
                                    minLength="10"
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={false}
                                    style={{ backgroundColor: '#234465' }}
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
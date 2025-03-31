import React from 'react';
import './jobDetails.css';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useDeleteJob, useJob } from '../../../api/jobsApi';
import { useApplications, useCreateApplication } from '../../../api/applicationsApi';


const JobDetails = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { job } = useJob(jobId);
    const { userId, email } = useAuth();
    const { deleteJob } = useDeleteJob();
    const { create } = useCreateApplication(jobId);
    const { applications, addApplication } = useApplications(jobId);
    console.log(applications);
    

    const jobDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${job.jobTitle} game?`);

        if (!hasConfirm) {
            return;
        }

        await deleteJob(jobId);

        navigate('/jobs');
    };

    const isOwner = userId === job._ownerId;

    const applicationCreateHandler = async (formData) => {
        const applicationData = Object.fromEntries(formData);
        // Server update
        const applicationResult = await create(jobId, applicationData);

        // Local state update
        addApplication({ ...applicationResult, author: { email } })

        window.location.reload();
    };
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
                            <h2>Salary:{job.salary}</h2>
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
                                Applications: <span>{applications.length || 0}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {applications.map((application, index) => (
                    <div className="comment" key={index}>
                        <header className="header">
                            <p>
                                <span>{email}</span> applied:
                            </p>
                        </header>
                        <div className="comment-main">
                            <div className="userdetails">
                                <img src="/profile.png" alt="avatar" />
                            </div>
                            <div className="post-content">
                                <p>
                                    {application.application.text}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {(
                    <div className="answer-comment">
                        <p>
                            <span></span> Apply for job:
                        </p>
                        <div className="answer">
                            <form action={applicationCreateHandler}>
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
import React, { useState } from 'react';
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
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    
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
    const isAuthenticated = !!userId;

    const applicationCreateHandler = async (formData) => {
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);
        
        try {
            const applicationData = Object.fromEntries(formData);
            
            // Validate application text
            if (!applicationData.text || applicationData.text.trim().length < 10) {
                throw new Error('Application text must be at least 10 characters long');
            }
            
            // Server update
            const applicationResult = await create(jobId, applicationData);

            // Local state update
            addApplication({ ...applicationResult, author: { email } });
            
            setSuccessMessage('Your application has been submitted successfully!');
            
            // Clear form
            document.getElementById('application-form').reset();
            
            // Optional: reload after a delay instead of immediate reload
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (err) {
            console.error('Application submission error:', err);
            setError(err.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                                )}
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


                {isAuthenticated && !isOwner && (
                    <div className="answer-comment">
                        <p>
                            <span></span> Apply for job:
                        </p>
                        <div className="answer">
                            {error && (
                                <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                                    {error}
                                </div>
                            )}
                            {successMessage && (
                                <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>
                                    {successMessage}
                                </div>
                            )}
                            <form action={applicationCreateHandler} id="application-form">
                                <textarea
                                    name="text"
                                    id="comment"
                                    cols="30"
                                    rows="10"
                                    minLength="10"
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{ 
                                        backgroundColor: isSubmitting ? '#cccccc' : '#234465',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Post'}
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
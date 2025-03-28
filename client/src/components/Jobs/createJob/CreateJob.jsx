import { useNavigate } from 'react-router';

import { useCreateJob } from '../../../api/jobsApi';
import './CreateJob.css';

export default function CreateJob() {
  const navigate = useNavigate();
    const { create: createJob } = useCreateJob();

    const submitAction = async (formData) => {
        const jobData = Object.fromEntries(formData);

        await createJob(jobData);

        navigate('/jobs');
    };

  return (
   
      <div className="new-job-border">
        <div className="header-background">
          <span>Create New Job</span>
        </div>
        <form action={submitAction}>
          <div className="new-job-title">
            <label htmlFor="jobTitle">Job Title <span className="red">*</span></label>
            <input 
              type="text" 
              name="jobTitle" 
              id="jobTitle" 
              
              required
            />
          </div>
          
          <div className="new-job-title">
            <label htmlFor="company">Company <span className="red">*</span></label>
            <input 
              type="text" 
              name="company" 
              id="company" 
             
              required
            />
          </div>        
          <div className="new-job-title">
            <label htmlFor="salary">Salary <span className="red">*</span></label>
            <input 
              type="text" 
              name="salary" 
              id="salary" 
              
              required
            />
          </div>
          
          <div className="new-job-title">
            <label htmlFor="image">Company Logo</label>
            <input 
              type="text" 
              name="image" 
              id="image" 
              
            /> 
          </div>
          
          <div className="new-job-content">
            <label htmlFor="description">Description <span className="red">*</span></label>
            <textarea 
              name="description" 
              id="description" 
              rows="8" 
              className="height"
              
              required
            ></textarea>
          </div>
          
          <div className="new-job-buttons">
            <button className="public" type="submit">Post Job</button>
          </div>
        </form>
      </div>
      
  );
}
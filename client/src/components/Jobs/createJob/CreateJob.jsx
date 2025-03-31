import { useNavigate } from 'react-router';
import { useState } from 'react';

import { useCreateJob } from '../../../api/jobsApi';
import './CreateJob.css';

export default function CreateJob() {
  const navigate = useNavigate();
  const { create: createJob } = useCreateJob();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    salary: '',
    image: '',
    description: ''
  });

  const validateForm = () => {
    const newErrors = {};

    // Job Title validation
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    } else if (formData.jobTitle.length < 5) {
      newErrors.jobTitle = 'Job title must be at least 5 characters';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // Salary validation - only check if it's filled in
    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    // Image URL validation (optional field)
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL for the company logo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the error for this field when user makes changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Clear server error when user makes any change
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setServerError(null);
      
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      await createJob(formData);
      navigate('/jobs');
    } catch (error) {
      setServerError(error.message || 'Failed to create job. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-job-border">
      <div className="header-background">
        <span>Create New Job</span>
      </div>
      
      {serverError && (
        <div className="error-message server-error">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="new-job-title">
          <label htmlFor="jobTitle">Job Title <span className="red">*</span></label>
          <input 
            type="text" 
            name="jobTitle" 
            id="jobTitle" 
            value={formData.jobTitle}
            onChange={handleChange}
            className={errors.jobTitle ? 'error-input' : ''}
            required
          />
          {errors.jobTitle && <div className="error-message">{errors.jobTitle}</div>}
        </div>
        
        <div className="new-job-title">
          <label htmlFor="company">Company <span className="red">*</span></label>
          <input 
            type="text" 
            name="company" 
            id="company" 
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error-input' : ''}
            required
          />
          {errors.company && <div className="error-message">{errors.company}</div>}
        </div>
        
        <div className="new-job-title">
          <label htmlFor="salary">Salary <span className="red">*</span></label>
          <input 
            type="text" 
            name="salary" 
            id="salary" 
            value={formData.salary}
            onChange={handleChange}
            className={errors.salary ? 'error-input' : ''}
            required
          />
          {errors.salary && <div className="error-message">{errors.salary}</div>}
        </div>
        
        <div className="new-job-title">
          <label htmlFor="image">Company Logo</label>
          <input 
            type="text" 
            name="image" 
            id="image" 
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? 'error-input' : ''}
          /> 
          {errors.image && <div className="error-message">{errors.image}</div>}
        </div>
        
        <div className="new-job-content">
          <label htmlFor="description">Description <span className="red">*</span></label>
          <textarea 
            name="description" 
            id="description" 
            rows="8" 
            value={formData.description}
            onChange={handleChange}
            className={`height ${errors.description ? 'error-input' : ''}`}
            required
          ></textarea>
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
        
        <div className="new-job-buttons">
          <button 
            className="public" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
}

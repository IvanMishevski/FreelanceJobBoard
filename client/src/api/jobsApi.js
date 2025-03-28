import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/jobs';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setJobs)
    }, []);

    return { jobs };
};

export const useJob = (jobId) => {
    const [job, setJob] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${jobId}`)
            .then(setJob);
    }, [jobId])

    return {
        job,
    };
};

export const useCreateJob = () => {
    const { request } = useAuth();

    const create = (jobData) =>
        request.post(baseUrl, jobData);

    return {
        create,
    }
};

export const useEditJob = () => {
    const { request } = useAuth();

    const edit = (jobId, jobData) =>
        request.put(`${baseUrl}/${jobId}`, { ...jobData, _id: jobId });

    return {
        edit,
    }
};

export const useDeleteJob = () => {
    const { request } = useAuth();

    const deleteJob = (jobId) =>
        request.delete(`${baseUrl}/${jobId}`);

    return {
        deleteJob,
    }
};
import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = `http://localhost:3030/data/applications`;

function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT': 
            return [...state, action.payload]
        case 'GET_ALL':
           return action.payload; 
        default:
            return state;
    }
};

export const useComments = (jobId) => {
    const { request } = useAuth();

    const [applications, dispatch] = useReducer(commentsReducer, [])

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `jobId="${jobId}"`,
            load: `author=_ownerId:users`,
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(result => dispatch({type: 'GET_ALL', payload: result}))
    }, [jobId, request]); 

    return {
        applications,
        addApplication: (applicationsData) => dispatch({type: 'ADD_Application', payload: applicationsData})
    }
}

export const useCreateComment = () => {
    const { request } = useAuth();

    const create = (jobId, application) => {
        const applicationData = {
            jobId,
            application,
        };

        return request.post(baseUrl, applicationData);
    }

    return {
        create,
    }
}
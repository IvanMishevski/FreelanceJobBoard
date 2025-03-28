import { useJobs } from "../../../api/jobsApi";
import JobItemCard from "./job-item-card/Job-item-card";

export default function JobCatalog() {
    const { jobs } = useJobs();

    return (
        <section id="catalog-page">
            <h1>All Available Job Offers</h1>

            {jobs.length > 0
                ? jobs.map(job => <JobItemCard key={job._id} {...job} />)
                : <h3 className="no-articles">No offers yet</h3>
            }
        </section>
    );
}
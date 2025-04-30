import { JobDetail as JobDetailProps } from "../../Information";
import JobDetail from "../JobDetail";

interface JobDetailsProps {
  jobDetails: Array<JobDetailProps>;
}

export default function JobDetails({ jobDetails }: JobDetailsProps) {
  return (
    <>
      {jobDetails.length > 0 &&
        jobDetails.map((jd) => (
          <JobDetail
            key={jd.detail.from}
            title={jd.title}
            detail={jd.detail}
            details={jd.details}
          />
        ))}
    </>
  );
}

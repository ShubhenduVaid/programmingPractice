import { JobDetail as JobDetailProps } from "../../Information";
import "./JobDetail.css";

export default function JobDetail({
  title,
  detail: { companyName, from, to, location },
  details,
}: JobDetailProps) {
  return (
    <>
      <div className="job-title">{title}</div>
      <div className="job-details">
        {companyName} | {from} - {to} | {location}
      </div>
      {details?.length > 0 && (
        <ul>
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </>
  );
}

import { CareerSummary as CareerSummaryType } from "../../Information";

interface CareerSummaryProps {
  careerSummary: CareerSummaryType;
}

export default function CareerSummary({
  careerSummary: { headline, highlights },
}: CareerSummaryProps) {
  return (
    <>
      <h3>SUMMARY</h3>
      <p>{headline}</p>
      <ul>
        {highlights.length > 0 &&
          highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
    </>
  );
}

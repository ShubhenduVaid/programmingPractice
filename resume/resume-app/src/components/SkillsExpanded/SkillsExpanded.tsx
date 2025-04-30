import { SkillsExpanded as SkillsExpandedType } from "../../Information";
import "./SkillsExpanded.css";

interface SkillsExpandedProps {
  skillsExpanded: SkillsExpandedType;
}

export default function SkillsExpanded({
  skillsExpanded: { skillType, skills },
}: SkillsExpandedProps) {
  return (
    <div className="skills-expanded-container">
      <strong>{skillType}</strong>

      {skills.length > 0 &&
        skills.map(({ detail1, detail2, detail3 }) => (
          <p key={detail1}>
            {detail1}
            <br />
            {detail2}
            <br />
            {detail3}
          </p>
        ))}
    </div>
  );
}

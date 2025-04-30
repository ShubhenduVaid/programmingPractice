import { Skills as SkillsType } from "../../Information";
import "./skills.css";

interface SkillsProps {
  skills: SkillsType;
}

export default function Skills({ skills: { skillType, skills } }: SkillsProps) {
  return (
    <div className="skillsContainer">
      <strong>{skillType}</strong>
      <div className="skills-grid">
        {skills.length > 0 &&
          skills.map((skill) => <div key={skill}>{skill}</div>)}
      </div>
    </div>
  );
}

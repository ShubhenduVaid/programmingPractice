import "./App.css";
import CareerSummary from "./components/CareerSummary";
import FindMeOnline from "./components/FindMeOnline";
import Header from "./components/Header";
import JobDetails from "./components/JobDetails";
import Skills from "./components/Skills";
import SkillsExpanded from "./components/SkillsExpanded";
import { information } from "./config";

function App() {
  const {
    header: { name, designation, contactInfo },
    jobDescriptionList,
    careerSummary,
    techSkills,
    softSkills,
    findMeOnline,
    education,
  } = information;
  return (
    <div className="container">
      <Header name={name} designation={designation} contactInfo={contactInfo} />
      <div className="content">
        <div className="left-column">
          <h3>EXPERIENCE</h3>
          {jobDescriptionList.length > 0 && (
            <JobDetails jobDetails={jobDescriptionList} />
          )}
        </div>
        <div className="right-column">
          <CareerSummary careerSummary={careerSummary} />
          <Skills skills={techSkills} />
          <Skills skills={softSkills} />
          <FindMeOnline findMeOnline={findMeOnline} />
          <SkillsExpanded skillsExpanded={education} />
        </div>
      </div>
    </div>
  );
}

export default App;

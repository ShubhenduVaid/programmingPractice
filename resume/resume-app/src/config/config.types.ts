export type ResumeType = {
  header: Header;
  jobDescriptionList: Array<JobDetail>;
  careerSummary: CareerSummary;
  techSkills: Skills;
  softSkills: Skills;
  findMeOnline: FindMeOnline;
  education: SkillsExpanded;
};

export type Header = {
  name: string;
  designation: string;
  contactInfo: {
    email: string;
    phoneNumber: string;
  };
};

export type JobDetail = {
  title: string;
  detail: {
    companyName: string;
    from: string;
    to: string;
    location: string;
  };
  details: Array<string>;
};

export type CareerSummary = {
  headline: string;
  highlights: Array<string>;
};

export type Skills = {
  skillType: string;
  skills: Array<string>;
};

export type FindMeOnline = {
  heading: string;
  links: Array<{ name: string; url: string }>;
};

export type SkillsExpanded = {
  skillType: string;
  skills: Array<{ detail1: string; detail2: string; detail3: string }>;
};

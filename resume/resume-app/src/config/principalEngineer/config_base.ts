import {
  CareerSummary,
  FindMeOnline,
  JobDetail,
  ResumeType,
  Skills,
  SkillsExpanded,
} from "../config.types";

const header = {
  name: "Shubhendu Vaid",
  designation: "Principal Engineer",
  contactInfo: {
    email: "vaidshubhendu@gmail.com",
    phoneNumber: "07835735172",
  },
};

const jobDescriptionList: Array<JobDetail> = [
  {
    title: "Principal Engineer",
    detail: {
      companyName: "BT Group",
      from: "08/2023",
      to: "Present",
      location: "London",
    },
    details: [
      "Rebuilt Sales/Renew experience for telco/techco products using a scalable tech stack (Next.js, React, Node.js, Java, AWS), achieving increased conversion and zero order loss.",
      "Worked with cross-functional teams for building recommendation's for products and working on an LLM based help bot.",
      "Overseeing the Sales Convergence Tribe(8 engineering squads), defining the technical strategy and roadmaps.",
    ],
  },
  {
    title: "Software Engineering Manager",
    detail: {
      companyName: "BT Group",
      from: "04/2022",
      to: "07/2023",
      location: "Birmingham",
    },
    details: [
      "Developed transaction journeys(e-commerce) on business.bt.com using Next.js, React, and Typescript, improving page load times by 5x.",
      "Designed and led AWS migration, enhancing scalability and performance for cloud-based solutions.",
      "Hired and led a team of 7 engineers, introducing automated testing and CI/CD to reduce time-to-market.",
    ],
  },
  {
    title: "Lead Software Engineer",
    detail: {
      companyName: "JPMorgan Chase & Co",
      from: "03/2021",
      to: "03/2022",
      location: "Glasgow",
    },
    details: [
      "Engineered a sophisticated digital platform catering to the investment banking sector, encompassing web and native applications.",
      "Streamlined integration among apps to facilitate the smooth transfer of large volumes of data.",
      "Mentored junior engineers, promoting knowledge-sharing and best practices.",
      "Contributed to architecture discussions, focusing on scalability and performance optimization.",
    ],
  },
  {
    title: "Lead Software Engineer",
    detail: {
      companyName: "Pwc",
      from: "03/2020",
      to: "02/2021",
      location: "Poland",
    },
    details: [
      "Designed a KYC solution from scratch, scaling APIs to handle 6,000 requests per minute using Java and MongoDB.",
      "Led a team of 4 developers, implementing TDD and observability for robust performance.",
    ],
  },
  {
    title: "Senior Software Engineer",
    detail: {
      companyName: "EPAM Systems",
      from: "03/2018",
      to: "02/2020",
      location: "Poland",
    },
    details: [
      "Built a web application for health insurance claim processing using JavaScript and React, increasing efficiency by 5%.",
      "Focused on performance optimization and scalability for high-availability systems.",
    ],
  },
  {
    title: "Senior Software Engineer",
    detail: {
      companyName: "Bharti Airtel Services",
      from: "02/2016",
      to: "02/2018",
      location: "India",
    },
    details: [
      "Developed a custom CRM and chatbot solution, reducing call handling times by 30% nationwide.",
      "Led POCs for workflow automation, enhancing operational efficiency.",
    ],
  },
  {
    title: "Senior Software Engineer",
    detail: {
      companyName: "Ingenuity Gaming",
      from: "07/2014",
      to: "02/2016",
      location: "India",
    },
    details: [
      "Created a slot game (Hi-Lo Roller) for Sigma using JavaScript and event-driven design.",
    ],
  },
  {
    title: "Software Engineer",
    detail: {
      companyName: "Commelius Solutions",
      from: "07/2010",
      to: "06/2014",
      location: "India",
    },
    details: [
      "Developed a framework for bespoke e-learning solutions, focusing on reusable components.",
    ],
  },
];

const careerSummary: CareerSummary = {
  headline:
    "Engineering Leader with 14+ years of experience delivering scalable, high-quality software.",
  highlights: [
    "Passionate about coaching, mentoring, and pair programming.",
    "Experienced in delivering customer centric solutions.",
    "Working with event-driven, globally distributed systems with high availability.",
    "Worked for FinTech, Telco, Risk and Insurance software domains.",
  ],
};

const techSkills: Skills = {
  skillType: "Technical Skills",
  skills: [
    "Next.js",
    "React",
    "Node.js",
    "AWS",
    "CDN",
    "Observability",
    "Unit Testing",
    "BDD",
    "TDD",
    "Event Driven Systems",
    "Microservices",
    "Nx Workspaces",
    "TypeScript",
    "JavaScript",
    "Java",
    "MongoDB",
    "PostgreSQL",
    "CI/CD",
    "Electron",
    "Vector DB",
    "LLM",
  ],
};

const softSkills: Skills = {
  skillType: "Soft Skills",
  skills: [
    "Communication",
    "Collabration",
    "Adaptability",
    "Problem Solving",
    "Emotional Intelligence",
    "Leadership",
    "Agile Mindset",
    "Team Management",
  ],
};

const findMeOnline: FindMeOnline = {
  heading: "Find Me Online",
  links: [
    {
      name: "linkedin.com/in/shubhendu-vaid-ba74a997",
      url: "https://www.linkedin.com/in/shubhendu-vaid-ba74a997/",
    },
    {
      name: "github.com/ShubhenduVaid",
      url: "https://github.com/ShubhenduVaid",
    },
  ],
};

const education: SkillsExpanded = {
  skillType: "Education",
  skills: [
    {
      detail1: "Bachelor of Technology in Computer Science",
      detail2: "2009",
      detail3: "India",
    },
  ],
};

export const information: ResumeType = {
  header: header,
  jobDescriptionList: jobDescriptionList,
  careerSummary: careerSummary,
  techSkills: techSkills,
  softSkills: softSkills,
  findMeOnline: findMeOnline,
  education: education,
};

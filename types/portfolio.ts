export type ProjectMetric = {
  label: string;
  value: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  valueProposition: string;
  description: string;
  image: string;
  imageAlt: string;
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl: string;
  githubUrl: string;
  overview: {
    problem: string;
    solution: string;
    role: string;
    timeline: string;
    team: string;
  };
  designProcess: string[];
  architecture: string[];
  performance: string[];
  accessibility: string[];
  seo: string[];
  challenges: string[];
  results: ProjectMetric[];
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export type TimelineItem = {
  period: string;
  title: string;
  organization: string;
  description: string;
  tags: string[];
};

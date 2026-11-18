import type { Certification, Project, SkillGroup, TimelineItem } from '@/types/portfolio';

export const site = {
  name: 'Sandeep Meche',
  role: 'Frontend engineer and UI specialist',
  url: 'https://www.sandeepmeche.com.np',
  email: 'Sandipmeche6@gmail.com',
  phone: '+977 9807944252',
  github: 'https://github.com/gituser-sandip',
  linkedin: 'https://www.linkedin.com/in/sandipmeche/',
  resume: '/assets/Sandeep_Meche_CV.pdf',
  location: 'Nepal',
};

export const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    slug: 'silence',
    title: 'Silence',
    eyebrow: 'JavaScript web experience',
    valueProposition: 'A focused web experience built with JavaScript and deployed on Vercel.',
    description: 'A JavaScript web project available as a live Vercel deployment and public GitHub repository.',
    image: '/images/silence-project.png',
    imageAlt: 'Golden Perfume House fragrance website preview',
    stack: ['JavaScript', 'Vercel', 'Web App'],
    metrics: [
      { label: 'Build', value: 'JavaScript', detail: 'web project' },
      { label: 'Deploy', value: 'Vercel', detail: 'live deployment' },
      { label: 'Code', value: 'GitHub', detail: 'public repository' },
    ],
    liveUrl: 'https://silence-gamma.vercel.app',
    githubUrl: 'https://github.com/gituser-sandip/silence',
    overview: {
      problem: 'Create a focused web experience around the project concept.',
      solution: 'Built and deployed a JavaScript web project.',
      role: 'JavaScript web development.',
      timeline: 'Independent build',
      team: 'Independent',
    },
    designProcess: [
      'Kept the experience focused on the project concept.',
      'Built the interface with JavaScript.',
      'Published the project on Vercel.',
    ],
    architecture: [
      'Built as a JavaScript web project.',
      'Deployed on Vercel.',
      'Source is available in the public GitHub repository.',
    ],
    performance: [
      'Kept the experience focused on its core purpose.',
      'Made the live project available through Vercel.',
      'Published the source on GitHub.',
    ],
    accessibility: [
      'Used a clear content hierarchy.',
      'Kept the interface focused on its core content.',
      'Provided a public live deployment for review.',
    ],
    seo: [
      'Published the project as a public Vercel deployment.',
      'Kept project information concise and focused.',
      'Linked the public source repository for review.',
    ],
    challenges: [
      'Turning the project concept into a focused web experience.',
      'Making the project easy to access and review online.',
    ],
    results: [
      { label: 'Status', value: 'Live', detail: 'Vercel deployment' },
      { label: 'Stack', value: 'JavaScript', detail: 'web project' },
      { label: 'Code', value: 'GitHub', detail: 'public repository' },
      { label: 'Project', value: 'Silence', detail: 'web experience' },
    ],
  }, {
    slug: 'real-state',
    title: 'Real State',
    eyebrow: 'React property discovery',
    valueProposition: 'A property-browsing experience that gives the listing, navigation, and consultation path a premium first impression.',
    description:
      'A live React real-estate website designed around property exploration, service navigation, and a clear consultation call to action.',
    image: '/images/real-state-project.png',
    imageAlt: 'Real State live homepage with a luxury home and property navigation',
    stack: ['React', 'JavaScript', 'Vercel', 'Property UI'],
    metrics: [
      { label: 'Build', value: 'React', detail: 'JavaScript frontend' },
      { label: 'Focus', value: 'Listings', detail: 'property discovery' },
      { label: 'Deploy', value: 'Vercel', detail: 'live production site' },
    ],
    liveUrl: 'https://realstateweb-ten.vercel.app',
    githubUrl: 'https://github.com/gituser-sandip/real_state',
    overview: {
      problem:
        'Property websites need to feel trustworthy at a glance while making a broad set of browsing and consultation routes easy to understand.',
      solution:
        'Built a polished React experience that uses a cinematic listing image, focused navigation, and direct consultation paths to frame the service.',
      role: 'Frontend implementation, responsive layouts, and interaction design.',
      timeline: 'Independent build',
      team: 'Independent',
    },
    designProcess: [
      'Used the primary property image to establish context before introducing the browsing and consultation options.',
      'Prioritized the navigation around the actions visible on the live product: buy, sell, search, areas, valuation, and saved homes.',
      'Used restrained type, spacing, and dark overlays to preserve a premium property-browsing feel.',
    ],
    architecture: [
      'Built as a React frontend with page sections that keep discovery, service, and consultation concerns clear.',
      'Used JavaScript and reusable UI patterns for a maintainable property-focused interface.',
      'Deployed to Vercel so the live project remains simple to access and review.',
    ],
    performance: [
      'Kept the first screen focused on a single property image, navigation, and two direct calls to action.',
      'Used a section-based layout to keep browsing options predictable as visitors move through the page.',
      'Published the project as a live Vercel deployment for reliable access.',
    ],
    accessibility: [
      'Used descriptive navigation labels that state the service area or visitor action.',
      'Maintained visual separation between the hero imagery and the navigation or consultation actions.',
      'Kept the main property message and calls to action in a clear top-to-bottom reading order.',
    ],
    seo: [
      'Structured the landing content around common property-intent routes such as buying, selling, searching, and valuation.',
      'Made the consultation path a first-screen action for visitors with immediate purchase or sale intent.',
      'Published the project as a public Vercel site for straightforward sharing and review.',
    ],
    challenges: [
      'Creating a premium property experience without letting the hero media obscure the essential actions.',
      'Making several service routes understandable while keeping the first screen calm and focused.',
    ],
    results: [
      { label: 'Status', value: 'Live', detail: 'public Vercel deployment' },
      { label: 'Stack', value: 'React', detail: 'JavaScript frontend' },
      { label: 'Focus', value: 'Property', detail: 'discovery and consultation' },
      { label: 'Code', value: 'GitHub', detail: 'public repository' },
    ],
  },
  {
    slug: 'workflow-automation-console',
    title: 'Workflow Automation Console',
    eyebrow: 'Operations UI',
    valueProposition: 'A calm, observable interface for monitoring work that happens behind the scenes.',
    description:
      'A UI concept for turning automation status, exceptions, and delivery health into an interface that teams can understand at a glance.',
    image: '/images/case-study-automation-console.png',
    imageAlt: 'Workflow automation monitoring console',
    stack: ['Next.js', 'Firebase', 'n8n', 'Framer Motion'],
    metrics: [
      { label: 'Uptime', value: '99.9%', detail: 'service target' },
      { label: 'INP', value: '<150ms', detail: 'interaction target' },
      { label: 'A11y', value: '100', detail: 'target score' },
    ],
    liveUrl: 'https://www.sandeepmeche.com.np/#work',
    githubUrl: 'https://github.com/gituser-sandip',
    overview: {
      problem:
        'Automation is valuable only when teams can trust it. Raw logs and fragmented status messages make important operational signals easy to miss.',
      solution:
        'Designed an observability-focused interface that prioritizes status, exception handling, and the next useful action.',
      role: 'Product thinking, UI system design, frontend implementation, and workflow integration.',
      timeline: '2 weeks',
      team: 'Independent concept',
    },
    designProcess: [
      'Started with the decisions an operator needs to make in under a minute.',
      'Used visual hierarchy to distinguish healthy work from items that need attention.',
      'Balanced information density with a clear, predictable interaction model.',
    ],
    architecture: [
      'Composable dashboard primitives allow new workflow types without a visual rewrite.',
      'Event-oriented data states keep loading, success, and failure conditions explicit.',
      'The interface is designed to work with Firebase-backed data and n8n workflows.',
    ],
    performance: [
      'Separated data-heavy views to prevent monitoring detail from delaying the first route.',
      'Used lightweight motion only to reinforce state changes and hierarchy.',
      'Designed stable dashboard regions to minimize cumulative layout shift.',
    ],
    accessibility: [
      'Status changes have text labels as well as visual color treatment.',
      'Interactive controls have descriptive labels and predictable tab order.',
      'Dense metrics maintain readable contrast in both themes.',
    ],
    seo: [
      'Semantic page structure gives public project documentation a strong technical baseline.',
      'Metadata is scoped per route for clear sharing and indexing.',
      'Content explains the business value of automation, not just the stack.',
    ],
    challenges: [
      'Presenting real-time complexity without turning the product into an intimidating control room.',
      'Making status information understandable at a glance and accessible in detail.',
    ],
    results: [
      { label: 'Uptime', value: '99.9%', detail: 'service target' },
      { label: 'INP', value: '<150ms', detail: 'interaction target' },
      { label: 'Accessibility', value: '100', detail: 'audit target' },
      { label: 'Core flows', value: '3', detail: 'visible at a glance' },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Production interfaces with clear component boundaries and reliable browser behavior.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'UI engineering',
    description: 'Systems-minded craft for responsive layouts, accessible interactions, and polished motion.',
    skills: ['Framer Motion', 'Responsive systems', 'Design systems', 'Accessibility', 'Animation', 'Performance'],
  },
  {
    title: 'Backend integration',
    description: 'Practical application plumbing for data, authentication, and connected product workflows.',
    skills: ['Firebase', 'Supabase', 'REST APIs', 'Authentication'],
  },
  {
    title: 'Tools',
    description: 'A focused delivery workflow from interface exploration to shipped product.',
    skills: ['Git', 'GitHub', 'Figma', 'Vercel', 'VS Code'],
  },
];

export const experience: TimelineItem[] = [
  {
    period: '2024 - Present',
    title: 'Independent frontend engineer',
    organization: 'Freelance and product projects',
    description:
      'Designing and building responsive React experiences with a focus on performance budgets, reusable UI patterns, and business-ready delivery.',
    tags: ['React', 'Next.js', 'UI systems'],
  },
  {
    period: '2023 - Present',
    title: 'Frontend project builder',
    organization: 'Open-source and portfolio work',
    description:
      'Shipping interface explorations that turn modern frontend practices into working, reviewable products.',
    tags: ['TypeScript', 'Accessibility', 'Performance'],
  },
  {
    period: '2022 - 2025',
    title: 'BSc (Hons) Computing',
    organization: 'Islington College',
    description:
      'Built a technical foundation across software engineering, web development, databases, and human-centered product thinking.',
    tags: ['Software engineering', 'Web development'],
  },
  {
    period: 'Ongoing',
    title: 'Continuous craft practice',
    organization: 'Frontend engineering',
    description:
      'Studying design systems, browser capabilities, accessibility patterns, and the performance details that make interfaces feel immediate.',
    tags: ['Design systems', 'Core Web Vitals'],
  },
];

// Sourced from the Certifications section on page 3 of the published CV.
// Dates and issuers are omitted where the source does not establish them.
export const certifications: Certification[] = [
  {
    id: 'web-development-diploma',
    title: 'Web Development Diploma',
    skills: ['Web development'],
    // The CV's link opens the Excel certificate, so use the CV until corrected.
  },
  {
    id: 'html-certification',
    title: 'HTML Certification',
    skills: ['HTML'],
    certificateUrl: 'https://drive.google.com/file/d/1ilmBKQIeLwl2MggnvB_2Bb8ZfoxToVgg/view?usp=sharing',
  },
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    skills: ['Cloud computing', 'AWS'],
    certificateUrl: 'https://drive.google.com/file/d/1fP69FFOlbI1DcFx_6kWxTCxNV4U56O0F/view?usp=sharing',
  },
  {
    id: 'aws-machine-learning-foundations',
    title: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS Academy',
    skills: ['Machine learning', 'AWS'],
    certificateUrl: 'https://drive.google.com/file/d/1g_nX7RTC9LkWUBEzDGk4aumPv2a4jMtB/view?usp=sharing',
  },
  {
    id: 'aws-data-engineering',
    title: 'AWS Data Engineering',
    skills: ['Data engineering', 'AWS'],
    // The CV's Google Drive document requires sign-in; link to the public CV.
  },
  {
    id: 'aws-natural-language-processing',
    title: 'AWS Academy Machine Learning for Natural Language Processing',
    issuer: 'AWS Academy',
    skills: ['Machine learning', 'Natural language processing'],
    certificateUrl: 'https://drive.google.com/file/d/1CbhdIsuMvWvug_EHNl4AHZEmrBdXXQfx/view?usp=sharing',
  },
  {
    id: 'advanced-excel',
    title: 'Advanced Excel',
    skills: ['Excel'],
    certificateUrl: 'https://drive.google.com/file/d/1kHyXhXovKtdNGooaCrtSE-zQhepMPvZp/view?usp=sharing',
  },
  {
    id: 'basic-computer',
    title: 'Basic Computer',
    skills: ['Computer fundamentals'],
    certificateUrl: 'https://drive.google.com/file/d/1TUzljr2uX1clzW9lJ8Gdcn25PfPcs2rd/view?usp=sharing',
  },
];

export const githubActivity = {
  repositories: [
    { name: 'portfolio-main', description: 'A performance-first portfolio built with modern React patterns.', language: 'TypeScript', stars: 0 },
    { name: 'frontend-labs', description: 'Focused experiments in UI architecture, interactions, and responsive systems.', language: 'JavaScript', stars: 0 },
    { name: 'automation-workflows', description: 'Practical workflow integrations and interface patterns for operations.', language: 'TypeScript', stars: 0 },
  ],
  commits: [
    'Refined responsive navigation and keyboard interaction states.',
    'Added route-level metadata and structured project content.',
    'Reduced visual motion to preserve fast, focused interactions.',
  ],
};

export const performanceMetrics = [
  { label: 'Lighthouse', value: 98, suffix: '+', description: 'Performance target' },
  { label: 'Accessibility', value: 100, suffix: '', description: 'WCAG AA baseline' },
  { label: 'SEO', value: 100, suffix: '', description: 'Technical baseline' },
  { label: 'Performance', value: 98, suffix: '', description: 'Mobile-first target' },
];

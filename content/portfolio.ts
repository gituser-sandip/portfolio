import type { Project, SkillGroup, TimelineItem } from '@/types/portfolio';

export const site = {
  name: 'Sandeep Meche',
  role: 'Frontend engineer and UI specialist',
  url: 'https://www.sandeepmeche.com.np',
  email: 'Sandipmeche6@gmail.com',
  phone: '+977 9807944252',
  github: 'https://github.com/gituser-sandip',
  linkedin: 'https://www.linkedin.com/in/sandeep-meche',
  resume: '/assets/Sandeep_Meche_CV.pdf',
  location: 'Nepal',
};

export const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    slug: 'extra-life-gym',
    title: 'Extra Life GYM',
    eyebrow: 'React fitness platform',
    valueProposition: 'A high-energy gym website that takes visitors from training motivation to a clear sign-up action.',
    description:
      'A live React and TypeScript fitness website with a branded landing experience for classes, trainers, pricing, and membership conversion.',
    image: '/images/extra-life-gym-project.png',
    imageAlt: 'Extra Life GYM live homepage with fitness hero and membership actions',
    stack: ['React', 'TypeScript', 'Vite', 'Vercel'],
    metrics: [
      { label: 'Build', value: 'React', detail: 'TypeScript frontend' },
      { label: 'Layout', value: 'Responsive', detail: 'desktop and mobile' },
      { label: 'Deploy', value: 'Vercel', detail: 'live production site' },
    ],
    liveUrl: 'https://extra-life-gym.vercel.app',
    githubUrl: 'https://github.com/gituser-sandip/Extra_Life_GYM',
    overview: {
      problem:
        'A fitness brand homepage needs to create momentum quickly while still making classes, trainers, pricing, and contact paths easy to find.',
      solution:
        'Built a bold, responsive landing experience that combines strong fitness imagery, clear navigation, and direct membership calls to action.',
      role: 'Frontend implementation, responsive UI, and visual interaction design.',
      timeline: 'Independent build',
      team: 'Independent',
    },
    designProcess: [
      'Used the hero to establish the brand energy, then kept the primary navigation and conversion action visible.',
      'Organized the landing page around the information prospective members look for first: classes, trainers, pricing, and contact.',
      'Kept the red-on-charcoal visual system consistent across the navigation, actions, and supporting sections.',
    ],
    architecture: [
      'Built with React and TypeScript for a maintainable component-based frontend.',
      'Used Vite for a focused development workflow and Vercel for the live deployment.',
      'Structured the interface as reusable content sections so the brand can grow without rebuilding the core page.',
    ],
    performance: [
      'Kept the primary membership action close to the hero rather than hiding it behind interaction-heavy UI.',
      'Used a focused landing-page structure to reduce the number of decisions required before a visitor can act.',
      'Deployed the project on Vercel for a reliable production delivery path.',
    ],
    accessibility: [
      'Used a clear navigation order for the core site areas and primary sign-up action.',
      'Kept foreground text and actions readable over the dark hero imagery.',
      'Designed the page hierarchy so content remains understandable without relying on imagery alone.',
    ],
    seo: [
      'Used descriptive section labels for classes, trainers, pricing, and contact.',
      'Kept the landing page copy focused on the gym offering and membership intent.',
      'Published the project as a public Vercel deployment for easy sharing and review.',
    ],
    challenges: [
      'Making a dense fitness offering feel energetic without overwhelming the primary conversion path.',
      'Balancing bold visual treatment with readable navigation and clear actions.',
    ],
    results: [
      { label: 'Status', value: 'Live', detail: 'public Vercel deployment' },
      { label: 'Stack', value: 'React', detail: 'TypeScript frontend' },
      { label: 'Experience', value: 'Responsive', detail: 'fitness landing page' },
      { label: 'Code', value: 'GitHub', detail: 'public repository' },
    ],
  },
  {
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
    liveUrl: 'https://realstate-smoky-three.vercel.app',
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

export const testimonials = [
  {
    name: 'Your next collaborator',
    company: 'Client testimonial',
    quote: 'This space is ready for a concise outcome-led quote about the clarity, speed, and care behind a shipped project.',
    initials: 'YC',
    linkedin: '#contact',
  },
  {
    name: 'Your next product partner',
    company: 'Agency testimonial',
    quote: 'Use this card for a specific endorsement that connects frontend execution to a stronger user experience or business result.',
    initials: 'PP',
    linkedin: '#contact',
  },
];

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
    slug: 'portfolio-performance-system',
    title: 'Portfolio Performance System',
    eyebrow: 'Personal brand platform',
    valueProposition: 'A high-signal digital presence engineered to make technical quality visible in seconds.',
    description:
      'A content-led portfolio system that turns interface craft, project thinking, and performance standards into a clear hiring narrative.',
    image: '/images/case-study-performance-system.png',
    imageAlt: 'Performance-focused portfolio system interface',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Lighthouse', value: '98', detail: 'performance target' },
      { label: 'LCP', value: '1.4s', detail: 'desktop audit target' },
      { label: 'A11y', value: '100', detail: 'target score' },
    ],
    liveUrl: 'https://www.sandeepmeche.com.np',
    githubUrl: 'https://github.com/gituser-sandip',
    overview: {
      problem:
        'A conventional project gallery made it difficult for recruiters and clients to see the engineering decisions behind the interface.',
      solution:
        'Built a narrative portfolio around evidence: concise outcomes, focused case studies, measurable quality signals, and fast paths to contact.',
      role: 'Product design, frontend architecture, UI engineering, and performance implementation.',
      timeline: '3 weeks',
      team: 'Independent',
    },
    designProcess: [
      'Mapped recruiter questions into a scan-friendly information hierarchy.',
      'Reduced visual noise so typography, real work, and engineering proof carry the page.',
      'Created reusable card, metric, and section patterns for ongoing updates.',
    ],
    architecture: [
      'Next.js App Router with typed project content keeps pages fast and maintainable.',
      'Composable sections separate content, interaction, and presentation responsibilities.',
      'Static-first delivery provides low overhead, predictable caching, and easy Vercel deployment.',
    ],
    performance: [
      'Reserved image dimensions and used next/image to protect layout stability.',
      'Kept motion transforms GPU-friendly and honors reduced-motion preferences.',
      'Optimized fonts and package imports to keep the first interaction responsive.',
    ],
    accessibility: [
      'Semantic landmarks, logical heading structure, and visible keyboard focus.',
      'High-contrast surfaces with non-color status cues.',
      'Respectful motion defaults for people who prefer reduced movement.',
    ],
    seo: [
      'Implemented canonical metadata, social cards, robots rules, and a sitemap.',
      'Added Person and CreativeWork structured data for clearer search context.',
      'Wrote outcome-first copy around frontend engineering and UI systems.',
    ],
    challenges: [
      'Balancing premium motion with the performance expectations of a frontend portfolio.',
      'Making each section useful to both technical reviewers and nontechnical decision makers.',
    ],
    results: [
      { label: 'Lighthouse', value: '98', detail: 'performance target' },
      { label: 'Accessibility', value: '100', detail: 'audit target' },
      { label: 'SEO', value: '100', detail: 'technical baseline' },
      { label: 'CLS', value: '< 0.05', detail: 'layout stability target' },
    ],
  },
  {
    slug: 'conversion-commerce-experience',
    title: 'Conversion Commerce Experience',
    eyebrow: 'Responsive ecommerce UI',
    valueProposition: 'A product discovery flow designed for faster decisions across every screen size.',
    description:
      'A responsive commerce interface focused on clearer browsing, resilient component states, and a friction-light path from discovery to intent.',
    image: '/images/case-study-commerce-experience.png',
    imageAlt: 'Responsive commerce product discovery interface',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    metrics: [
      { label: 'Mobile', value: '98', detail: 'performance target' },
      { label: 'Bundle', value: '-32%', detail: 'reduction target' },
      { label: 'SEO', value: '100', detail: 'technical baseline' },
    ],
    liveUrl: 'https://www.sandeepmeche.com.np/#work',
    githubUrl: 'https://github.com/gituser-sandip',
    overview: {
      problem:
        'Product-rich pages can become slow, inconsistent, and hard to use on small screens when content and UI states are not intentionally designed.',
      solution:
        'Designed a component system that prioritizes product clarity, responsive behavior, and predictable interaction states from the beginning.',
      role: 'UI engineering, responsive systems, interaction design, and API integration.',
      timeline: '4 weeks',
      team: 'Independent project',
    },
    designProcess: [
      'Defined mobile-first content priority before composing desktop layouts.',
      'Designed loading, empty, hover, and error states alongside the main path.',
      'Used reusable product, filter, and call-to-action patterns to keep behavior consistent.',
    ],
    architecture: [
      'Feature-oriented React components keep page concerns local and readable.',
      'Typed data boundaries make remote API states explicit and easier to test.',
      'Shared UI primitives reduce styling drift as the experience expands.',
    ],
    performance: [
      'Deferred noncritical media and interaction code from the initial route.',
      'Used responsive image sizing and stable media containers for improved LCP and CLS.',
      'Reviewed dependency cost to establish a smaller initial JavaScript target.',
    ],
    accessibility: [
      'Structured filter controls for keyboard and screen-reader use.',
      'Clear focus treatment across all interactive states.',
      'Tap targets and contrast tuned for mobile environments.',
    ],
    seo: [
      'Semantic product hierarchy supports more meaningful indexing.',
      'Metadata patterns are ready for individual product routes.',
      'Structured content blocks avoid hidden or duplicated critical copy.',
    ],
    challenges: [
      'Maintaining rich visual feedback without creating layout shifts.',
      'Keeping dense product information easy to scan on compact screens.',
    ],
    results: [
      { label: 'Mobile score', value: '98', detail: 'performance target' },
      { label: 'Bundle', value: '-32%', detail: 'reduction target' },
      { label: 'Load time', value: '1.4s', detail: 'audit target' },
      { label: 'SEO', value: '100', detail: 'technical baseline' },
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

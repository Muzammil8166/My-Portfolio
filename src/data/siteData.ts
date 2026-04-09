import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import resumePdf from '../assets/Muzammil_Kureshi_Resume.pdf'

export type ThemeMode = 'dark' | 'light'

export type NavSectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'github'
  | 'contact'

export type SocialLink = {
  label: string
  href: string
  icon: IconType
}

export type Skill = { name: string; level: number }
export type SkillGroup = { title: string; skills: Skill[] }

export type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
}

export type ExperienceItem = {
  company: string
  role: string
  duration: string
  achievements: string[]
  tech: string[]
}

export const SITE = {
  name: 'Muzammil',
  role: 'Junior MERN Stack Developer',
  location: 'Surat',
  email: 'muzammilkureshi.in@gmail.com',
  tagline:
    'I build fast, scalable web products with delightful UX—React on the frontend, Node on the backend, and pragmatic architecture everywhere.',
  typingPhrases: [
    'React + TypeScript',
    'Node.js + Express',
    'MongoDB + PostgreSQL',
    'Performance + UX',
    'Code. Create. Deploy.'
  ],
  resumeUrl: resumePdf as string,
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'muzammil8166',
}

export const NAV: { id: NavSectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/muzammil8166', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muzammil-kureshi-0395432a5', icon: FaLinkedin },
  { label: 'Twitter/X', href: 'https://x.com/Muzammil_8166', icon: FaXTwitter },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Redux', level: 80 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 90 },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 78 },
      { name: 'AWS', level: 72 },
      { name: 'CI/CD', level: 75 },
      { name: 'Vercel', level: 85 },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    title: 'LuxeMart E-commerce',
    description:
      'A production-grade storefront with auth, cart/checkout, admin dashboards, and search—optimized for performance and conversion.',
    image: '/luxemart.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/muzammil8166/',
    liveUrl: 'https://example.com',
  },

]

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Company Name',
    role: 'Senior MERN Stack Developer',
    duration: '2023 — Present',
    achievements: [
      'Led the redesign of a multi-tenant SaaS dashboard, improving task completion by 28%.',
      'Introduced performance budgets and profiling workflows, reducing LCP by 35%.',
      'Built a reusable component library and patterns for scalable feature delivery.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    company: 'Previous Company',
    role: 'Full Stack Developer',
    duration: '2020 — 2023',
    achievements: [
      'Shipped real-time collaboration features using websockets and event-driven services.',
      'Implemented CI/CD pipelines and automated quality gates across repositories.',
    ],
    tech: ['React', 'Express', 'PostgreSQL', 'Docker', 'CI/CD'],
  },
]


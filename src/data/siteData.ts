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
  role: 'MERN Stack Developer',
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
      { name: 'TypeScript', level: 75 },
      { name: 'Next.js', level: 70 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 80 },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 90 },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 78 },
      { name: 'Vercel', level: 85 },
    ],
  },
]

export const PROJECTS: Project[] = [
    {
    title: 'Point of Sale System',
    description:
      'A production-grade storefront with auth, cart/checkout, admin dashboards, and search—optimized for performance and conversion.',
    image: '/pos.png',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'TailwindCSS'],
    githubUrl: 'https://github.com/muzammil8166/',
    liveUrl: 'http://pos.mjal.me/',
  },
  {
    title: 'LuxeMart',
    description:
      'A production-grade storefront with auth, cart/checkout, admin dashboards, and search—optimized for performance and conversion.',
    image: '/luxemart.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/muzammil8166/Luxemart',
    liveUrl: 'https://google.com',
  },
  {
    title: 'Thunderboltt',
    description:
      'A production-grade storefront with auth, cart/checkout, admin dashboards, and search—optimized for performance and conversion.',
    image: '/thunderboltt.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/muzammil8166/ThunderBoltt',
    liveUrl: 'https://google.com',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Iqonic Design',
    role: 'Intern MERN Stack Developer',
    duration: 'Jan 2026 — April 2026',
    achievements: [
      'Built a full-stack MERN Point of Sale system with admin panel, inventory management, and CRUD operations.',
      'Worked on scalable project architecture, backend integration, and performance optimization to deliver efficient full-stack solutions.',
      'Experienced in React, Redux, and API integration to create responsive and optimized web applications.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS', 'Docker'],
  },
  {
    company: 'Freelancer',
    role: 'Full Stack Developer',
    duration: '2021 — 2026',
    achievements: [
      'MERN Stack Developer with hands-on experience building full-stack web applications using MongoDB, Express.js, React, and Node.js.',
      'Delivered scalable, user-friendly solutions with optimized performance and responsive UI tailored to client requirements.',
    ],
    tech: ['React', 'Express', 'MySQL', 'Vercel',],
  },
  
]


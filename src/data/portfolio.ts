import { FileText } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

export const portfolioData = {
  personalInfo: {
    name: "Naman Jain",
    role: "Full Stack Developer",
    secondaryRole: "& DevOps Enthusiast",
    location: "Rajkot, Gujarat, India",
    email: "naman.jain.udp04@gmail.com", // [cite: 3]
    bio: "I am a learnaholic Full Stack Developer with a passion for building scalable web applications. Currently diving deep into Cloud & DevOps to bridge the gap between development and operations. When I'm not coding, you'll find me singing, writing, or binge-watching K-dramas and movies.",
    tagline: "Bytes and Beyond: Navigating Tech and Life", // Sourced from your YT channel context
  },

  socials: [
    { name: "GitHub", url: "https://github.com/Naman13112004", icon: FaGithub }, // [cite: 3]
    { name: "LinkedIn", url: "https://www.linkedin.com/in/naman-jain-b65428285/", icon: FaLinkedin }, // [cite: 3]
    { name: "Twitter (X)", url: "https://x.com/NamanJain1304", icon: FaXTwitter }, // [cite: 3]
    { name: "YouTube", url: "https://youtube.com/@TechyUDP", icon: FaYoutube }, // Added per request
    { name: "Instagram", url: "https://www.instagram.com/techyudp/", icon: FaInstagram },
    { name: "Resume", url: "/assets/Naman Jain Resume.pdf", icon: FileText },
  ],

  skills: [
    {
      category: "Frontend Engineering",
      items: [
        { name: "Next.js (App Router, Server Actions)", level: 95 },
        { name: "React.js (Hooks, Context, Architecture)", level: 95 },
        { name: "JavaScript (ES6+, Async Patterns)", level: 95 },
        { name: "TailwindCSS", level: 95 },
        { name: "TypeScript (Strict Typing, Generics)", level: 90 },
        { name: "Responsive & Accessible UI Design", level: 90 },
        { name: "Client & Server Rendering (SSR/CSR/ISR)", level: 80 },
      ]
    },

    {
      category: "Backend Engineering & APIs",
      items: [
        { name: "Node.js", level: 95 },
        { name: "Express.js", level: 95 },
        { name: "REST API Design & Versioning", level: 90 },
        { name: "Authentication & Authorization (JWT, Clerk)", level: 90 },
        { name: "API Integration (AI & Third-party APIs)", level: 90 },
        { name: "MVC & Modular Backend Architecture", level: 80 },
        { name: "WebSockets & Real-time Communication", level: 70 },
      ]
    },

    {
      category: "Languages & Tooling",
      items: [
        { name: "Git & GitHub (PRs, Collaboration)", level: 90 },
        { name: "C++ (DSA, CLI Tools)", level: 75 },
        { name: "Java (OOPS)", level: 75 },
        { name: "CLI Application Development", level: 75 },
        { name: "Python (Scripting & Tooling)", level: 40 }
      ]
    },

    {
      category: "State, Forms & Validation",
      items: [
        { name: "Zustand (Global State Management)", level: 85 },
        { name: "React Hook Form (Complex & Multi-step Forms)", level: 85 },
        { name: "Zod (Schema Validation & Runtime Safety)", level: 85 }
      ]
    },

    {
      category: "Databases & ORMs",
      items: [
        { name: "PostgreSQL / SQL", level: 80 },
        { name: "MongoDB (Schema Design, Indexing)", level: 80 },
        { name: "Prisma ORM (Type-safe DB Access)", level: 80 },
        { name: "Supabase (Postgres, Auth, Storage)", level: 75 }
      ]
    },

    {
      category: "AI & Applied Intelligence",
      items: [
        { name: "AI API Integration (OpenAI, Gemini)", level: 85 },
        { name: "Prompt Engineering (Text & Image)", level: 80 },
        { name: "AI-assisted UX & Automation", level: 75 },
        { name: "Computer Vision Pipelines", level: 70 },
      ]
    },

    {
      category: "DevOps, Cloud & Systems",
      items: [
        { name: "Linux Command Line", level: 75 },
        { name: "Deployment (Vercel & Cloud Platforms)", level: 70 },
        { name: "DevOps Fundamentals", level: 60 },
        { name: "Docker (Containers & Images)", level: 50 },
        { name: "CI/CD Pipelines (GitHub Actions)", level: 45 },
        { name: "AWS (EC2, S3, IAM)", level: 40 },
        { name: "System Design Fundamentals", level: 40 }
      ]
    },
  ],

  projects: [
    {
      title: "Snap Attend - AI Attendance System",
      desc: "An open-source face-recognition attendance system built to explore real-world AI deployment beyond simple prototypes.",
      tech: [
        "Next.js",
        "Node.js",
        "FastAPI",
        "Computer Vision",
        "Microservices"
      ],
      github: "https://github.com/Naman13112004/picture-based-attendance",
      live: "https://snap-attend.vercel.app/",
      image: "/projects/snapattend.png",
      longDesc: "Features a polyglot backend separating application logic from ML inference workloads, tackling challenges around image processing latency and service orchestration."
    },
    {
      title: "RBAC Backend System",
      desc: "A secure, high-performance backend system built from scratch, focusing on authorization, reliability, and security. Implements robust Role-Based Access Control and JWT authentication.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "System Design"
      ],
      github: "https://github.com/Naman13112004/backend-rbac-task",
      live: "https://backend-rbac-task.vercel.app/",
      image: "/projects/rbac.png", // Make sure to add this image to your public folder
      longDesc: "Reduced API latency from ~2s to ~600ms using Redis caching and query optimization. Designed rate-limiting and security middleware to ensure stability under load simulations."
    },
    {
      title: "Federated Learning System",
      desc: "A decentralized machine learning pipeline enabling privacy-preserving AI training on non-IID client data without sharing raw medical images.",
      tech: [
        "Python",
        "Distributed ML",
        "Federated Learning",
        "Deep Learning"
      ],
      github: "https://github.com/Naman13112004/Lung-Tumor-FL",
      live: "", 
      image: "/projects/federated.png",
      longDesc: "Trained MobileNetV2 on ~15K medical images achieving 98.93% accuracy. Explored performance vs. privacy trade-offs, with research under paper submission."
    },
    {
      title: "MeetAI - AI Agent Video Call",
      desc: "A real-time video calling web application focused on intelligent meetings. Supports secure authentication, scheduled meetings, live video rooms, call recordings, AI-generated transcripts and summaries, and conversational agents.",
      tech: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Stream Video SDK",
        "OpenAI API",
      ],
      github: "https://github.com/Naman13112004/meetai",
      live: "https://meetai-rosy.vercel.app/",
      image: "/projects/meetai.png",
      longDesc: "Designed to explore the intersection of real-time communication and AI-assisted collaboration. Features include secure auth, room management, and live transcription."
    },
    {
      title: "Welth - Finance Manager",
      desc: "A full-stack finance tracking platform built for personal use, featuring income/expense tracking, budget alerts, financial dashboards, and AI-powered insights.",
      tech: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Prisma ORM",
        "Clerk Authentication",
        "Gemini API",
        "Dashboard & Data Visualization"
      ],
      github: "https://github.com/Naman13112004/welth",
      live: "https://welth-ashen-one.vercel.app/",
      image: "/projects/welth.png",
      longDesc: "Emphasizes clean data modeling, secure authentication, and actionable financial summaries with charts and AI analysis."
    },
    {
      title: "cliflow",
      desc: "A production-quality, cross-platform CLI tool written in modern C++ that analyzes shell history files to generate insightful usage statistics.",
      tech: [
        "C++ (C++11/14/17 compatible)",
        "STL (Standard Library Only)",
        "CLI Argument Parsing",
        "Modular Architecture",
        "Static Binary Distribution"
      ],
      github: "https://github.com/Naman13112004/cli-flow",
      live: "https://github.com/Naman13112004/cli-flow/releases",
      image: "/projects/cliflow.png",
      longDesc: "Designed with zero dependencies, high performance, and compatibility with older compilers. Includes automated CI/CD release workflows."
    }
  ]
};
import { FileText } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export const portfolioData = {
  personalInfo: {
    name: "Naman Jain",
    role: "Backend Software Engineer",
    secondaryRole: "Distributed Systems · AI Applications",
    headline: "Backend Software Engineer | Distributed Systems | AI Applications",
    status: "Final-year Computer Science student",
    location: "Rajkot, Gujarat, India",
    email: "naman.jain.udp04@gmail.com",
    bio: "Final-year Computer Science student focused on backend engineering, scalable APIs, distributed applications, and AI systems. Currently exploring cloud infrastructure, Docker, Kubernetes, and CI/CD while learning in public through technical content. Outside tech, I read widely—from mystery and thriller fiction to self-help and self-discovery and spend time writing and creating.",
    tagline: "Bytes and Beyond: Navigating Tech and Life",
    intro:
      "Final-year Computer Science student focused on backend engineering, scalable APIs, distributed applications, and AI systems.",
  },

  currentFocus: {
    primary: [
      "Cloud Infrastructure",
      "DevOps",
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
    ],
    statement:
      "Learning how software moves beyond development into deployment, infrastructure, reliability, and operations.",
  },

  learningInPublic: {
    primaryPlatform: "LinkedIn",
    active: true,
    series: "Docker + Kubernetes",
    description:
      "Regularly learning Docker and Kubernetes while sharing the learning journey and practical takeaways in public.",
    profileUrl: "https://www.linkedin.com/in/naman-jain-b65428285/",
  },

  codingStats: {
    leetCodeSolved: "205+",
    badges: ["50-Day LeetCode Badge", "HackerRank Gold 5-star Java", "HackerRank 1-star C++", "HackerRank 1-star Problem Solving"],
  },

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/Naman13112004",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/naman-jain-b65428285/",
      icon: FaLinkedin,
    },
    {
      name: "Twitter (X)",
      url: "https://x.com/NamanJain1304",
      icon: FaXTwitter,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@TechyUDP",
      icon: FaYoutube,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/techyudp/",
      icon: FaInstagram,
    },
    {
      name: "Resume",
      url: "/assets/Naman Jain Resume.pdf",
      icon: FileText,
    },
  ],

  experience: [
    {
      role: "Backend Developer Intern",
      company: "Shipturtle Apps Pvt. Ltd.",
      period: "July 2026 – Present",
      current: true,
      location: "India",
      highlights: [
        "Learned PHP and Laravel within one week to contribute to a production SaaS codebase.",
        "Developing backend features and RESTful APIs for a multi-vendor e-commerce marketplace platform.",
        "Working with Laravel, MySQL, and third-party integrations to implement scalable business logic.",
        "Debugging production issues, improving existing modules, and writing clean, maintainable backend code.",
        "Collaborating through code reviews, testing, and iterative feature development in an agile environment.",
      ],
      technologies: ["PHP", "Laravel", "MySQL", "REST APIs"],
    },
  ],

  education: [
    {
      institution: "Marwadi University",
      degree: "B.Tech Computer Science",
      period: "2023–2027",
      grade: "CGPA: 9.85/10.00",
    },
  ],

  achievements: [
    {
      title: "205+ LeetCode Problems",
      detail: "Solved 205+ problems and earned the 50-Day LeetCode Badge.",
      category: "Problem Solving",
    },
    {
      title: "HackerRank Badges",
      detail: "Gold 5-star Java, 1-star C++, and 1-star Problem Solving badges.",
      category: "Problem Solving",
    },
    {
      title: "Hacktoberfest 2024",
      detail:
        "Contributed code and fixes to ToolJet's open-source codebase.",
      category: "Open Source",
    },
    {
      title: "Technical Competitions",
      detail: "Winner of 2 technical competitions demonstrating engineering problem-solving.",
      category: "Competitions",
    },
    {
      title: "UCMAS",
      detail:
        "National and State-Level winner; solved 200 arithmetic problems in 8 minutes.",
      category: "Foundations",
    },
    {
      title: "Competitive Programming Club",
      detail: "Pseudo Core Committee Member.",
      category: "Community",
    },
  ],

  interests: {
    reading: [
      "Mystery & thriller fiction",
      "Self-help",
      "Self-discovery",
      "Wider fiction and nonfiction",
    ],
    creative: [
      "Writing",
      "Technical content creation",
    ],
  },

  content: {
    linkedin: {
      active: true,
      description:
        "Regularly publishing technical learning in public on LinkedIn.",
      currentSeries: "Docker + Kubernetes",
      seriesDescription:
        "Learning Docker and Kubernetes while simultaneously documenting and sharing the journey.",
      url: "https://www.linkedin.com/in/naman-jain-b65428285/",
    },
    youtube: {
      name: "TechyUDP",
      url: "https://youtube.com/@TechyUDP",
    },
    instagram: {
      handle: "@techyudp",
      url: "https://www.instagram.com/techyudp/",
    },
  },

  // Legacy skill data retained for backward compatibility with older components.
  // The redesigned UI should NOT display the numeric `level` values.
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
      ],
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
      ],
    },

    {
      category: "Languages & Tooling",
      items: [
        { name: "Git & GitHub (PRs, Collaboration)", level: 90 },
        { name: "C++ (DSA, CLI Tools)", level: 75 },
        { name: "Java (OOPS)", level: 75 },
        { name: "CLI Application Development", level: 75 },
        { name: "Python (Scripting & Tooling)", level: 40 },
      ],
    },

    {
      category: "State, Forms & Validation",
      items: [
        { name: "Zustand (Global State Management)", level: 85 },
        { name: "React Hook Form (Complex & Multi-step Forms)", level: 85 },
        { name: "Zod (Schema Validation & Runtime Safety)", level: 85 },
      ],
    },

    {
      category: "Databases & ORMs",
      items: [
        { name: "PostgreSQL / SQL", level: 80 },
        { name: "MongoDB (Schema Design, Indexing)", level: 80 },
        { name: "Prisma ORM (Type-safe DB Access)", level: 80 },
        { name: "Supabase (Postgres, Auth, Storage)", level: 75 },
      ],
    },

    {
      category: "AI & Applied Intelligence",
      items: [
        { name: "AI API Integration (OpenAI, Gemini)", level: 85 },
        { name: "Prompt Engineering (Text & Image)", level: 80 },
        { name: "AI-assisted UX & Automation", level: 75 },
        { name: "Computer Vision Pipelines", level: 70 },
      ],
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
        { name: "System Design Fundamentals", level: 40 },
      ],
    },
  ],

  // Resume-backed technical profile. Use this for the redesigned UI instead of skill percentages.
  technicalProfile: [
    {
      category: "Languages",
      items: ["C++", "Java", "PHP", "Python", "JavaScript", "TypeScript"],
    },
    {
      category: "Backend & Systems",
      items: [
        "Node.js",
        "Express.js",
        "Laravel",
        "FastAPI",
        "REST APIs",
        "WebSockets",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Prisma", "Redis"],
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "AWS", "GitHub Actions", "CI/CD", "Linux", "Git"],
    },
    {
      category: "AI & ML",
      items: [
        "OpenAI API",
        "Gemini API",
        "Federated Learning",
        "Computer Vision",
      ],
    },
    {
      category: "CS Foundations",
      items: ["Data Structures & Algorithms", "OOP", "OS", "DBMS", "CN", "System Design"],
    },
  ],


  // Technology-to-project relationships for the Overview evidence table.
  // Each row is backed by the project's `tech` list and `longDesc`.
  technicalEvidence: [
    {
      technology: "Redis",
      project: "Secure RBAC Backend System",
      note: "Caching + query optimization",
    },
    {
      technology: "FastAPI",
      project: "Snap Attend - AI Attendance System",
      note: "Isolated ML inference service",
    },
    {
      technology: "WebRTC",
      project: "MeetAI - Real-Time AI Collaboration Platform",
      note: "Low-latency communication",
    },
    {
      technology: "GitHub Actions",
      project: "CLIFlow - C++ Command Line Application",
      note: "Build · test · release",
    },
    {
      technology: "Docker",
      project: "Snap Attend - AI Attendance System",
      note: "Consistent service environments",
    },
  ],

  projects: [
    {
      title: "Snap Attend - AI Attendance System",
      shortTitle: "Snap Attend",
      domain: "AI attendance system",
      evidence:
        "Node.js and FastAPI separate application services from ML inference workloads, containerized with Docker.",
      featured: true,
      desc:
        "An open-source face-recognition attendance system designed around real-world AI deployment, scalable backend services, and reliable image-processing workflows.",
      tech: [
        "Next.js",
        "Node.js",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "Computer Vision",
        "Microservices",
      ],
      github: "https://github.com/Naman13112004/picture-based-attendance",
      live: "https://snap-attend.vercel.app/",
      image: "/projects/snapattend.png",
      longDesc:
        "Designed a microservice-based architecture using Node.js and FastAPI, separating application services from ML inference workloads. Developed secure REST APIs, database workflows, and image-processing pipelines for attendance tracking, then containerized services with Docker to improve environment consistency and support production-oriented deployment workflows.",
      architecture: [
        { label: "Frontend Application" },
        { label: "Node.js API" },
        { label: "FastAPI ML Inference" },
        { label: "PostgreSQL Database" }
      ]
    },

    {
      title: "Secure RBAC Backend System",
      shortTitle: "Secure RBAC Backend System",
      domain: "Authentication · authorization · API reliability",
      evidence:
        "Redis caching, database optimization, and efficient query design improved API performance.",
      metric: "~2s → ~600ms",
      featured: true,
      desc:
        "A production-style backend system focused on authentication, authorization, API security, reliability, and measurable performance improvements.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "JWT",
        "REST APIs",
        "System Design",
      ],
      github: "https://github.com/Naman13112004/backend-rbac-task",
      live: "https://backend-rbac-task.vercel.app/",
      image: "/projects/rbac.png",
      longDesc:
        "Engineered JWT authentication, role-based authorization, REST APIs, rate limiting, validation, password hashing, and security-focused middleware. Improved API performance from approximately 2s to 600ms through Redis caching, database optimization, and efficient query design, then validated the system with API testing, debugging, and load simulations.",
      metrics: [
        { label: "API Latency Reduction", value: "~2s → ~600ms" }
      ],
      architecture: [
        { label: "Client Request" },
        { label: "API / Rate Limiting" },
        { label: "Auth / RBAC Middleware" },
        { label: "Redis Cache" },
        { label: "MongoDB" }
      ]
    },

    {
      title: "MeetAI - Real-Time AI Collaboration Platform",
      shortTitle: "MeetAI",
      domain: "Real-time AI collaboration",
      evidence:
        "Event-driven real-time communication with AI-powered transcription, meeting summaries, scheduling, and subscriptions.",
      desc:
        "A real-time collaboration platform combining low-latency communication with AI-powered transcription, summaries, and meeting workflows.",
      tech: [
        "Next.js",
        "WebRTC",
        "WebSockets",
        "OpenAI",
        "TypeScript",
        "Stream Video SDK",
      ],
      github: "https://github.com/Naman13112004/meetai",
      live: "https://meetai-rosy.vercel.app/",
      image: "/projects/meetai.png",
      longDesc:
        "Developed a real-time collaboration platform using WebSockets and event-driven architecture for concurrent users and low-latency communication. Integrated AI-powered transcription and meeting summarization, and built authentication, scheduling, subscription, and modular backend workflows while debugging real-time synchronization and reliability issues across application services.",
    },

    {
      title: "CLIFlow - C++ Command Line Application",
      shortTitle: "CLIFlow",
      domain: "C++ command-line tooling",
      evidence:
        "Automated build, testing, and release workflows using GitHub Actions.",
      desc:
        "A high-performance, cross-platform C++ CLI application that analyzes shell history using optimized data structures and memory-efficient algorithms.",
      tech: [
        "C++",
        "GitHub Actions",
        "Algorithms",
        "CLI",
        "Modular Architecture",
      ],
      github: "https://github.com/Naman13112004/cli-flow",
      live: "https://github.com/Naman13112004/cli-flow/releases",
      image: "/projects/cliflow.png",
      longDesc:
        "Built a modular, memory-efficient command-line application focused on performance, maintainability, structured logging, and cross-platform behavior. Automated build, testing, and release workflows using GitHub Actions CI/CD to reduce manual deployment effort.",
    },

    {
      title: "Welth - AI Powered Finance Management",
      shortTitle: "Welth",
      domain: "AI-powered finance management",
      evidence:
        "Rate limiting, backend validation, and relational PostgreSQL data modelling with Prisma.",
      desc:
        "A modular full-stack finance platform combining structured financial data, secure backend workflows, interactive dashboards, and AI-powered insights.",
      tech: [
        "Next.js",
        "Prisma",
        "PostgreSQL",
        "TypeScript",
        "Gemini API",
        "Authentication",
      ],
      github: "https://github.com/Naman13112004/welth",
      live: "https://welth-ashen-one.vercel.app/",
      image: "/projects/welth.png",
      longDesc:
        "Built a modular SaaS application with authentication, financial data management, REST APIs, rate limiting, backend validation, and AI-powered insights. Designed relational PostgreSQL schemas with Prisma while focusing on maintainability, efficient queries, data consistency, and scalable dashboard architecture.",
    },

    {
      title: "Federated Learning System",
      shortTitle: "Federated Learning System",
      domain: "Privacy-preserving distributed ML",
      evidence:
        "MobileNetV2 trained on approximately 15,000 medical images, achieving 98.93% accuracy.",
      metric: "98.93%",
      desc:
        "A distributed machine learning pipeline exploring collaborative training on decentralized, non-IID data without sharing raw medical images.",
      tech: [
        "Python",
        "PyTorch",
        "FedAvg",
        "FedProx",
        "Distributed ML",
        "Privacy-Preserving AI",
      ],
      github: "https://github.com/Naman13112004/Lung-Tumor-FL",
      live: "",
      image: "/projects/federated.png",
      longDesc:
        "Implemented a distributed learning pipeline using FedAvg and FedProx, with reproducible experiments for non-IID client data and analysis of communication efficiency and model convergence. Trained MobileNetV2 on approximately 15,000 medical images and achieved 98.93% accuracy while studying privacy-preserving AI architectures and engineering trade-offs.",
      metrics: [
        { label: "Training Dataset", value: "~15,000 images" },
        { label: "Model Accuracy", value: "98.93%" }
      ]
    },
  ],
};

import type { GraphNode, GraphEdge } from "./types";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Derive the Explore graph from the same source data used by Overview.
// Relationships are data-driven rather than hardcoded.
export function deriveGraphData(data: typeof portfolioData) {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const identityId = "identity-naman";
  nodes.push({
    id: identityId,
    type: "identity",
    label: data.personalInfo.name,
  });

  // Current learning direction comes directly from portfolio data.
  data.currentFocus.primary.forEach((focus) => {
    const id = `exp-${slugify(focus)}`;

    nodes.push({
      id,
      type: "exploring",
      label: focus,
    });
  });

  const techSet = new Set<string>();

  data.projects.forEach((project) => {
    const projectId = `project-${slugify(project.title)}`;

    nodes.push({
      id: projectId,
      type: "project",
      label: project.title,
    });

    edges.push({
      source: identityId,
      target: projectId,
    });

    project.tech.forEach((tech) => {
      const techId = `tech-${slugify(tech)}`;

      if (!techSet.has(techId)) {
        techSet.add(techId);

        nodes.push({
          id: techId,
          type: "tech",
          label: tech,
        });
      }

      edges.push({
        source: projectId,
        target: techId,
      });
    });
  });

  return { nodes, edges };
}
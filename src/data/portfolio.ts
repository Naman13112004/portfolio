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
    { name: "Instagram", url: "https://www.instagram.com/naman.jain2004/", icon: FaInstagram },
    { name: "Resume", url: "/assets/Naman Jain Resume.pdf", icon: FileText },
  ],
  skills: {
  expert: [
    // Frontend & Full-Stack Core
    "Next.js (App Router, Server Actions, Middleware)",
    "React.js (Hooks, Context, Component Architecture)",
    "TypeScript (Strict Typing, Generics, API Contracts)",
    "JavaScript (ES6+, Async Patterns)",
    "TailwindCSS",
    "Responsive & Accessible UI Design",
    "Client-Server Rendering Strategies (SSR, CSR, ISR)",

    // Backend & APIs
    "Node.js",
    "Express.js",
    "REST API Design & Versioning",
    "Authentication & Authorization (JWT, Clerk, OAuth basics)",
    "API Integration (Third-party services, AI APIs)",

    // State & Forms
    "Zustand (Global State Management)",
    "React Hook Form (Complex Forms, Multi-Step Flows)",
    "Zod (Schema Validation, Runtime Type Safety)",

    // Tooling
    "Git & GitHub (Version Control, Collaboration, PRs)",
  ],

  intermediate: [
    // Databases & ORMs
    "MongoDB (Schema Design, Indexing, Aggregations)",
    "SQL (Relational Modeling, Queries, Joins)",
    "Prisma ORM (Type-Safe Database Access)",
    "Supabase (PostgreSQL, Auth, Storage)",

    // Real-time & Performance
    "WebSockets & Real-time Communication",
    "Event-driven Architectures (Basic)",
    "Backend Performance Optimization (Early-stage)",

    // AI / Applied ML
    "AI API Integration (Gemini Vision, OpenAI, Freepik AI)",
    "Prompt Engineering (Image & Text Generation Pipelines)",

    // Systems & Languages
    "Java (OOP, DSA, Academic + Practical Use)",
    "C++ (DSA, Memory Awareness, Systems Thinking)",
    "CLI Application Development",

    // Architecture
    "MVC & Modular Backend Architecture",
    "Service-Layer Architecture (Scalable Codebases)",
  ],

  beginner: [
    "DevOps Fundamentals",
    "Docker (Containers, Images, Basic Compose)",
    "AWS (EC2, S3, IAM - Conceptual & Early Practical)",
    "Deployment Pipelines (Vercel, Cloud Platforms)",
    "Linux Command Line",
    "Python (Scripting, Tooling, Learning Phase)",
    "System Design Fundamentals",
    "Scalability & Performance Basics"
  ]
},
  learning: {
    title: "Currently Exploring & Leveling Up",
    items: [
      "DevOps Pipelines (CI/CD, GitHub Actions)",
      "Cloud Architecture (AWS – Compute, Storage, Networking)",
      "System Design (Scalable Web Systems)",
      "Backend Performance & Reliability",
      "Low-Level & Systems Programming Concepts",
      "Production-grade Deployment Practices"
    ],
    description: "Actively transitioning from building applications to understanding how systems are deployed, scaled, monitored, and maintained in real-world production environments."
  },
  projects: [
    {
      title: "MeetAI - AI-Powered Video Collaboration Platform",
      desc: "A real-time video calling web application focused on intelligent meetings. Supports secure authentication, scheduled meetings, live video rooms, call recordings, AI-generated transcripts, and conversational agents. Designed to explore the intersection of real-time communication and AI-assisted collaboration.",
      tech: [
        "Next.js (App Router)",
        "React.js",
        "TypeScript",
        "Stream Video SDK",
        "OpenAI API",
        "Authentication & Authorization",
        "WebSockets & Real-time Events",
        "API Integration",
        "TailwindCSS",
        "Responsive UI Design"
      ],
      github: "https://github.com/Naman13112004/meetai",
      live: "https://meetai-rosy.vercel.app/",
      image: "/meetai.png"
    },
    {
      title: "Welth - Personal Finance Management Platform",
      desc: "A full-stack finance tracking platform built for personal use, featuring income/expense tracking, budget alerts, financial dashboards, and AI-powered insights. Emphasizes clean data modeling, secure authentication, and actionable financial summaries.",
      tech: [
        "Next.js",
        "TypeScript",
        "Prisma ORM",
        "SQL Databases",
        "Supabase",
        "Clerk Authentication",
        "Gemini API",
        "Server-Side Rendering",
        "Dashboard & Data Visualization",
        "TailwindCSS"
      ],
      github: "https://github.com/Naman13112004/welth",
      live: "https://welth-ashen-one.vercel.app/",
      image: "/welth.png"
    },
    {
      title: "MerchAI Restyler - AI-Powered Product Image Generator",
      desc: "An AI-powered web application that transforms basic product images into high-quality, marketing-ready visuals. Uses a two-step AI pipeline combining computer vision and image generation to help e-commerce brands create professional product imagery instantly.",
      tech: [
        "Next.js 14 (App Router)",
        "React.js",
        "TypeScript",
        "TailwindCSS",
        "Zustand",
        "Supabase (PostgreSQL + Storage)",
        "Zod (Runtime Validation)",
        "Google Gemini Vision",
        "Freepik AI",
        "Service-Layer Architecture"
      ],
      github: "https://github.com/Naman13112004/ai-merch-stylist",
      live: "https://merch-ai-restyler.vercel.app/",
      image: "/merchai.png"
    },
    {
      title: "Planly - Event Requirement Posting Flow",
      desc: "A full-stack web application designed to facilitate structured event requirement posting. Features a dynamic multi-step form where fields adapt based on the selected hiring category (Planner, Performer, Crew), with end-to-end type safety and clean architecture.",
      tech: [
        "Next.js",
        "React.js",
        "TypeScript",
        "Zustand (Global State)",
        "React Hook Form",
        "Zod (Validation)",
        "Node.js",
        "Express.js",
        "MongoDB (Mongoose)",
        "MVC Architecture"
      ],
      github: "https://github.com/Naman13112004/planly",
      live: "https://planly-three.vercel.app/",
      image: "/planly.png"
    },
    {
      title: "cliflow - CLI Shell History Analytics Tool",
      desc: "A production-quality, cross-platform CLI tool written in modern C++ that analyzes shell history files to generate insightful usage statistics. Designed with zero dependencies, high performance, and compatibility with older compilers.",
      tech: [
        "C++ (C++11/14/17 compatible)",
        "STL (Standard Library Only)",
        "CLI Argument Parsing",
        "Cross-Platform Development",
        "Performance-Oriented Design",
        "Modular Architecture",
        "Static Binary Distribution"
      ],
      github: "https://github.com/Naman13112004/cli-flow",
      live: "https://github.com/Naman13112004/cli-flow/releases",
      image: "/cliflow.png"
    }
  ]
};
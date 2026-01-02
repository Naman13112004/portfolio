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
    { name: "Resume", url: "https://drive.google.com/file/d/1pO6sDaibejVooqZxyiVVi2PEnDn06R8R/view?usp=sharing", icon: FileText },
  ],
  skills: {
    expert: [
      "Next.js (App Router, Server Actions, Middleware)",
      "React.js (Hooks, Context, Component Architecture)",
      "TypeScript (Strict Typing, Generics, API Contracts)",
      "JavaScript (ES6+, Async Patterns)",
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "Responsive & Accessible UI Design",
      "Client-Server Rendering Strategies"
    ],
    intermediate: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "Authentication & Authorization (JWT, Clerk, OAuth basics)",
      "MongoDB",
      "SQL (Relational Modeling, Queries)",
      "Prisma ORM",
      "Database Schema Design",
      "WebSockets & Real-time Communication",
      "Java (OOP, DSA, Academic + Practical Use)",
      "C++ (DSA, Low-level Thinking, Systems Orientation)",
      "Git & GitHub (Version Control, Collaboration)",
      "API Integration (Third-party services, AI APIs)"
    ],
    beginner: [
      "DevOps Fundamentals",
      "Docker (Containers, Images, Basic Compose)",
      "AWS (EC2, S3, IAM – Conceptual & Early Practical)",
      "Deployment Pipelines (Vercel, Cloud Platforms)",
      "Linux Command Line",
      "Python (Scripting, Tooling, Learning Phase)",
      "Supabase (Auth, Database, Backend as a Service)",
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
    }
  ]
};
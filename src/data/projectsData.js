import orbitImg from "../assets/projects/orbit.png";
import ottoImg from "../assets/projects/otto.png";
import cineflixImg from "../assets/projects/cineflix.png";

export const projectsData = [
  {
    index: "01",
    id: "orbit",
    title: "ORBIT",
    subtitle: "Subscription Tracker & Automation Platform",
    description: "End-to-end subscription lifecycle engine with automated renewal alerts and security defense. Features REST API architecture, JWT authentication, bcrypt password hashing, Arcjet bot defense and rate-limiting, MongoDB + Mongoose data layer, and automated email reminders before renewal deadlines.",
    tech: ["TypeScript", "Node.js", "Express.js", "MongoDB", "React.js", "Tailwind CSS", "Arcjet", "JWT"],
    github: "https://github.com/notsomohit/orbit-subscriptionTracker",
    live: "https://github.com/notsomohit/orbit-subscriptionTracker",
    image: orbitImg,
    category: "FULL-STACK PLATFORM"
  },
  {
    index: "02",
    id: "otto",
    title: "OTTO",
    subtitle: "AI Terms & Conditions Analyzer",
    description: "AI-powered browser extension built at Hackfest 2026. Analyzes dense legal Terms of Service documents in real-time, extracting high-risk clauses, data brokerage tracking policies, and arbitration waivers into digestible summaries.",
    tech: ["TypeScript", "Chrome Extension API", "NLP / AI", "Modern DOM"],
    github: "https://github.com/pushkarscripts/otto",
    live: "https://github.com/pushkarscripts/otto",
    image: ottoImg,
    category: "BROWSER EXTENSION • HACKFEST 2026"
  },
  {
    index: "03",
    id: "cineflix",
    title: "CINEFLIX",
    subtitle: "Movies & Anime Discovery Platform",
    description: "High-performance React web application for exploring global cinema and trending anime. Built with clean UI design, debounced search filtering, responsive media grids, and smooth transitions.",
    tech: ["JavaScript", "React.js", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/notsomohit/cineflix-v1",
    live: "https://github.com/notsomohit/cineflix-v1",
    image: cineflixImg,
    category: "REACT APPLICATION"
  }
];

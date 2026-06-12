export type Project = Readonly<{
  id: string;
  name: string;
  subtitle: string;
  url: string;
  deployedUrl?: string;
  description: string;
  features: readonly string[];
  tags: readonly string[];
  language: string;
  updated: string;
  linkText?: string;
  imageUrl?: string;
  inProgress?: boolean;
}>;

export type SkillGroup = Readonly<{
  title: string;
  items: readonly string[];
}>;

export const profile = {
  name: "Mayank Chaudhary",
  location: "India",
  email: "mayankchaudharyetw123@gmail.com",
  role: "Senior Software Developer & MERN Stack Expert building scalable web platforms, C++ systems, and DSA-focused tools.",
  bio: "Coding in MERN Stack, C++, and Python with a focus on practical products, clean systems, and real-world utility.",
  githubUrl: "https://github.com/qwertyuii7",
  githubUsername: "qwertyuii7",
  leetcodeUrl: "https://leetcode.com/u/chaudharymayank/",
  leetcodeUsername: "chaudharymayank",
  hackerRankUrl: "https://www.hackerrank.com/profile/mayankchaudhar31",
  hackerRankUsername: "mayankchaudhar31",
  avatarUrl: "https://avatars.githubusercontent.com/u/189455750?v=4",
  heroImage: "/assets/mayank-hero.jpg",
  journeyImage: "/assets/mayank-journey.jpg",
  repos: 20,
  following: 1,
  joined: "Nov 2024",
  lastUpdated: "May 31, 2026",
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Terminal", href: "#terminal" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
] as const;

export const skillGroups: readonly SkillGroup[] = [
  { title: "Languages", items: ["C++", "Python", "JavaScript", "TypeScript", "HTML", "CSS", "GDScript"] },
  { title: "MERN Stack", items: ["MongoDB", "Express.js", "React", "Node.js"] },
  { title: "Tools & Core", items: ["Git", "GitHub", "Godot", "File I/O", "Authentication"] },
  { title: "Web Systems", items: ["APIs", "Maps Integration", "Dashboards", "Responsive UI"] },
];

export const projects: readonly Project[] = [
  {
    id: "01",
    name: "MEDIGUARD",
    subtitle: "Fake Medicine Detection & Healthcare Safety Platform",
    url: "https://github.com/qwertyuii7/MEDIGUARD_FINAL",
    deployedUrl: "https://mediguard-frontend-nine.vercel.app/",
    description: "A public-health focused platform for identifying counterfeit medicine, reporting unsafe drugs, and locating verified nearby chemists.",
    features: [
      "Fake medicine identification engine",
      "Report and escalation flow for counterfeit drugs",
      "Nearby chemist locator with maps integration",
    ],
    tags: ["JavaScript", "Web", "Maps API", "Healthcare"],
    language: "JavaScript",
    updated: "May 2026",
    imageUrl: "/assets/mediguard_preview.png"
  },
  {
    id: "02",
    name: "AI Resume Builder",
    subtitle: "AI-Powered Resume Optimization Platform",
    url: "https://github.com/qwertyuii7/AI-Resume-Builder",
    deployedUrl: "https://airesume-builder-one.vercel.app/#",
    description: "Build an AI-optimized resume that gets results. Leverage advanced AI to generate professional resumes tailored perfectly to job descriptions in minutes.",
    features: [
      "ATS-friendly templates",
      "AI-driven content generation",
      "Real-time resume preview",
    ],
    tags: ["React", "TypeScript", "AI", "Tailwind CSS"],
    language: "TypeScript",
    updated: "Jun 2026",
    imageUrl: "/assets/airesume_preview.png"
  },
  {
    id: "03",
    name: "Smart Home Automation",
    subtitle: "Voice & Command-Driven Home Management",
    url: "https://github.com/qwertyuii7/Smarthome_automation",
    description: "A command-first home management interface for controlling lights, appliances, routines, and automation states.",
    features: [
      "Command-based device control interface",
      "Home state management dashboard",
      "Automation rules and scheduling",
    ],
    tags: ["HTML", "CSS", "JavaScript", "IoT", "Automation"],
    language: "HTML",
    updated: "May 2026",
    inProgress: true,
  },
  {
    id: "04",
    name: "Developer League",
    subtitle: "Global Developer Ranking Platform",
    url: "https://github.com/qwertyuii7/Developer-league",
    description: "A competitive ranking platform that scores developers across coding platforms including LeetCode, CodeChef, HackerRank, and GitHub.",
    features: [
      "Cross-platform performance aggregation",
      "Global leaderboard with live ranking concept",
      "Hustle score across diverse developer metrics",
    ],
    tags: ["TypeScript", "Web", "APIs", "Leaderboard"],
    language: "TypeScript",
    updated: "Mar 2026",
  },
  {
    id: "05",
    name: "Pine Adventure",
    subtitle: "Trending 2D Game Built as a Hobby",
    url: "https://gamejolt.com/games/Trending_2d_Game_Pine-Adventure/1066369",
    description: "A trendy 2D platformer game developed out of curiosity to explore game mechanics, physics, and interactive storytelling.",
    features: [
      "2D platforming mechanics",
      "Interactive levels and storytelling",
      "Custom physics implementation",
    ],
    tags: ["Godot", "GDScript", "Game Dev", "2D"],
    language: "GDScript",
    updated: "2026",
    linkText: "Play on GameJolt",
    imageUrl: "/assets/pine_adventure_preview.png"
  },
  {
    id: "06",
    name: "Banking System",
    subtitle: "Terminal-Based Core Banking Engine",
    url: "https://github.com/qwertyuii7/Banking-System_in_cpp",
    description: "A C++ banking engine built around clean logic, persistent records, transaction safety, and account integrity.",
    features: [
      "Deposits, withdrawals, and fund transfers",
      "Balance integrity enforcement",
      "File-based persistent storage",
    ],
    tags: ["C++", "File I/O", "System Design", "Data Integrity"],
    language: "C++",
    updated: "Apr 2026",
  },
  {
    id: "07",
    name: "Secure Auth System",
    subtitle: "Terminal-Based Authentication Engine",
    url: "https://github.com/qwertyuii7/Login-and-Registration-System",
    description: "A pure C++ login and registration system focused on authentication fundamentals, local persistence, and modular flow.",
    features: [
      "Password hashing and PIN verification",
      "File-based session persistence",
      "Clean modular architecture",
    ],
    tags: ["C++", "File I/O", "Authentication", "Security"],
    language: "C++",
    updated: "Apr 2026",
  },
];

export const githubStats = [
  { label: "Public Repos", value: "20" },
  { label: "Primary Stack", value: "C++ / Web" },
  { label: "Recent Push", value: "Jun 2026" },
  { label: "Profile Since", value: "2024" },
] as const;

export const leetcodeRows = [
  { label: "Easy",   value: "49",  pct: 36 },   // 49 / 135 ≈ 36%
  { label: "Medium", value: "81",  pct: 60 },   // 81 / 135 ≈ 60%
  { label: "Hard",   value: "5",   pct: 4  },   // 5  / 135 ≈ 4%
] as const;

export const platformLinks = [
  { label: "GitHub", handle: "qwertyuii7", url: profile.githubUrl },
  { label: "LeetCode", handle: "chaudharymayank", url: profile.leetcodeUrl },
  { label: "HackerRank", handle: "mayankchaudhar31", url: profile.hackerRankUrl },
] as const;

export const journeyItems = [
  {
    year: "2024",
    title: "Started public build log",
    body: "Opened the GitHub profile and began turning learning into visible repositories.",
  },
  {
    year: "2025",
    title: "Systems and fundamentals",
    body: "Built C++ banking, authentication, file persistence, and DSA practice foundations.",
  },
  {
    year: "2026",
    title: "Product-focused platforms",
    body: "Shipped web-first ideas across healthcare safety, developer rankings, and automation.",
  },
  {
    year: "Now",
    title: "Recruiter-ready direction",
    body: "Focused on clean product engineering, real-world utility, and measurable coding discipline.",
  },
] as const;

export const terminalCommands = [
  "help",
  "whoami",
  "github",
  "leetcode",
  "hackerrank",
  "projects",
  "stack",
  "clear",
] as const;

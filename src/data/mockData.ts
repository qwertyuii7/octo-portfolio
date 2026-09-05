export type Project = Readonly<{
  id: string;
  name: string;
  subtitle: string;
  url: string;
  deployedUrl?: string;
  videoUrl?: string;
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
  role: "MERN Stack Dev building scalable web platforms, C++ systems, and DSA-focused tools.",
  bio: "Coding in MERN Stack, C++, and Python with a focus on practical products, clean systems, and real-world utility.",
  githubUrl: "https://github.com/qwertyuii7",
  githubUsername: "qwertyuii7",
  leetcodeUrl: "https://leetcode.com/u/chaudharymayank/",
  leetcodeUsername: "chaudharymayank",
  hackerRankUrl: "https://www.hackerrank.com/profile/mayankchaudhar31",
  hackerRankUsername: "mayankchaudhar31",
  geeksForGeeksUrl: "https://www.geeksforgeeks.org/profile/mayankchaudpalk",
  geeksForGeeksUsername: "mayankchaudpalk",
  avatarUrl: "https://avatars.githubusercontent.com/u/189455750?v=4",
  heroImage: "/assets/mayank-hero.jpg",
  journeyImage: "/assets/mayank-journey.jpg",
  repos: 40,
  following: 1,
  joined: "Nov 2024",
  lastUpdated: "May 31, 2026",
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Terminal", href: "#terminal" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
] as const;

export const skillGroups: readonly SkillGroup[] = [
  { title: "LANGUAGES", items: ["JavaScript (ES6+)", "TypeScript", "C++", "Python"] },
  { title: "FRONTEND", items: ["React", "Vite", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion", "GSAP"] },
  { title: "BACKEND", items: ["AI Agents", "Payment Integrations", "Node.js", "Express.js", "REST APIs", "JWT Authentication", "Socket.io"] },
  { title: "DATABASE", items: ["MongoDB", "Supabase"] },
  { title: "TOOLS", items: ["AI Agents", "Model Context Protocol (MCP)", "Git", "GitHub", "Postman", "Cursor", "VS Code", "Warp", "npm", "Figma", "Canva"] },
  { title: "CLOUD & DEPLOYMENT", items: ["Vercel", "Render", "GitHub Actions"] },
  { title: "CURRENTLY EXPLORING", items: ["System Design", "WebSockets", "Redis", "3D Web Experiences", "Three.js Ecosystem"] },
];

export const projects: readonly Project[] = [
  {
    id: "01",
    name: "MEDIGUARD",
    subtitle: "Fake Medicine Detection & Healthcare Safety Platform",
    url: "https://github.com/qwertyuii7/MEDIGUARD_FINAL",
    deployedUrl: "https://mediguard-frontend-nine.vercel.app/",
    videoUrl: "https://youtu.be/FQeNMtZWOcE?si=4mHjiPSWZQGPG4RO",
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
    name: "Project Omega",
    subtitle: "High-Performance Ecommerce API & Admin Interface",
    url: "https://github.com/qwertyuii7/omega",
    deployedUrl: "https://client-gamma-orcin.vercel.app/?view=grid",
    description: "Built a cursor-based pagination Express.js + MongoDB API handling 200,000+ products with consistent sub-second response times.",
    features: [
      "Designed a composite (created_at, _id) MongoDB index to eliminate skip-based query slowdowns at scale.",
      "Built a React 18 + Vite admin interface on top of the API for browsing and managing product data.",
      "Deployed the frontend on Vercel and the backend API on Render."
    ],
    tags: ["React", "Vite", "Node.js", "Express.js", "MongoDB"],
    language: "TypeScript",
    updated: "Jul 2026",
    imageUrl: "/assets/omega_preview.png"
  },
  {
    id: "03",
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
    id: "04",
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
    deployedUrl: "https://smarthome-automation.vercel.app/",
    imageUrl: "/assets/smarthome_preview.png",
  },
  {
    id: "05",
    name: "Aurum Genève | Fine Timepieces",
    subtitle: "Premium 3D Scroll Watch Site",
    url: "https://classic-3d-watch-site-7jfb.vercel.app/",
    deployedUrl: "https://classic-3d-watch-site-7jfb.vercel.app/",
    description: "A premium 3D scroll website for fine timepieces built using GSAP.",
    features: [
      "3D scroll-based animations",
      "Premium UI/UX design",
      "GSAP-powered interactions"
    ],
    tags: ["GSAP", "Web", "3D", "UI/UX"],
    language: "JavaScript",
    updated: "2026",
  },
  {
    id: "06",
    name: "Elementum",
    subtitle: "Strategic Design & Development Agency",
    url: "https://github.com/qwertyuii7/ui-ux_elementum.git",
    deployedUrl: "https://assignment-beta-lac-83.vercel.app/",
    description: "A responsive React application first crafted in figma then converted into a functional static web interface. Built with React and Vite, featuring custom typography, responsive layouts, and clean component architecture.",
    features: [
      "Fully responsive layout optimized across Desktop, Tablet, and Mobile devices.",
      "Integrates custom Gerbil font and Satoshi for body text.",
      "Micro-interactions including hover transformations and animated underlines."
    ],
    tags: ["React", "Vite", "Vanilla CSS", "Figma"],
    language: "React",
    updated: "Jul 2026",
    imageUrl: "/assets/elementum_preview.png"
  },
  {
    id: "07",
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
    imageUrl: "/assets/developer_league_preview.png",
    deployedUrl: "https://developer-league.vercel.app/",
  },
  {
    id: "08",
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
    id: "09",
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
    id: "10",
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
  { label: "Public Repos", value: "40+" },
  { label: "Primary Stack", value: "C++ / Web" },
  { label: "Recent Push", value: "Jun 2026" },
  { label: "Profile Since", value: "2024" },
] as const;

export const leetcodeRows = [
  { label: "Easy",   value: "80",  pct: 38 },   // 80 / 210 ≈ 38%
  { label: "Medium", value: "110", pct: 52 },   // 110 / 210 ≈ 52%
  { label: "Hard",   value: "20",  pct: 10 },   // 20  / 210 ≈ 10%
] as const;

export const platformLinks = [
  { label: "GitHub", handle: "qwertyuii7", url: profile.githubUrl },
  { label: "LeetCode", handle: "chaudharymayank", url: profile.leetcodeUrl },
  { label: "HackerRank", handle: "mayankchaudhar31", url: profile.hackerRankUrl },
  { label: "GeeksforGeeks", handle: "mayankchaudpalk", url: profile.geeksForGeeksUrl },
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

export const milestoneCarouselItems = [
  {
    src: "/assets/events/google-devfest-2025-lucknow.jpg",
    title: "Google DevFest 2025 · Lucknow",
    alt: "Mayank at Google DevFest Lucknow 2025",
  },
  {
    src: "/assets/events/foss-2026.jpg",
    title: "FOSS United · Community Meetup 2026",
    alt: "FOSS United community event 2026",
  },
  {
    src: "/assets/events/foss-february-meetup-2026.jpg",
    title: "FOSS February Meetup · Lucknow",
    alt: "FOSS February meetup in Lucknow 2026",
  },
  {
    src: "/assets/events/gdg-agentic-premier-league-2026.jpeg",
    title: "GDG Agentic Premier League Hackathon",
    alt: "GDG Agentic Premier League Hackathon 2026",
  },
  {
    src: "/assets/events/gdg-api-hackathon-finale-2026.png",
    title: "GDG API Hackathon · Finale 2026",
    alt: "GDG API Hackathon finale 2026",
  },
  {
    src: "/assets/events/gdg-product-builder-day-2026.jpg",
    title: "GDG Product Builder Day 2026",
    alt: "Google Developer Group Product Builder Day 2026",
  },
  {
    src: "/assets/events/sih-2025.jpeg",
    title: "Smart India Hackathon 2025",
    alt: "Mayank at Smart India Hackathon 2025",
  },
  {
    src: "/assets/events/google-devfest-2025.jpeg",
    title: "Google DevFest 2025",
    alt: "Mayank at Google DevFest 2025",
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

export const terminalCommandResponses: Record<string, string> = {
  help:          "Available Commands:\n  • whoami    — Short bio & current focus\n  • stack     — Technical skills & technologies\n  • projects  — Overview of shipped products\n  • skills    — Core engineering competencies\n  • contact   — Direct communication channels\n  • about     — Quick background & experience\n  • github    — Visit my GitHub profile (@qwertyuii7)\n  • leetcode  — Visit my LeetCode stats (@chaudharymayank)\n  • matrix    — Trigger the full-page Matrix effect\n  • ls        — List portfolio directories & files\n  • uname -a  — System kernel & OS information\n  • cat bio   — Display full biography\n  • date      — Current system time & timestamp\n  • clear     — Clear terminal screen",
  whoami:        "Mayank Chaudhary — CS Engineering Student @ Lucknow University.\nBuilds in C++, Python & Web. Open to freelance work and exciting opportunities.",
  stack:         "LANGUAGES          : JavaScript (ES6+), TypeScript, C++, Python\nFRONTEND           : React, Vite, Tailwind CSS, HTML5, CSS3, Framer Motion, GSAP\nBACKEND            : AI Agents, Payment Integrations, Node.js, Express.js, REST APIs, JWT Authentication, Socket.io\nDATABASE           : MongoDB, Supabase\nTOOLS              : AI Agents, Model Context Protocol (MCP), Git, GitHub, Postman, Cursor, VS Code, Warp, npm, Figma, Canva\nCLOUD & DEPLOYMENT : Vercel, Render, GitHub Actions\nCURRENTLY EXPLORING: System Design, WebSockets, Redis, 3D Web Experiences, Three.js Ecosystem",
  projects:      "1. MEDIGUARD       — Healthcare safety & emergency response platform\n2. DEVELOPER LEAGUE — Global dev ranking & analytical dashboard\n3. SMART HOME AUTO — Command-driven home automation interface\n4. BANKING SYSTEM  — C++ terminal-based core banking engine\n5. SECURE AUTH     — C++ authentication & file persistence system",
  skills:        "LANGUAGES          : JavaScript (ES6+), TypeScript, C++, Python\nFRONTEND           : React, Vite, Tailwind CSS, HTML5, CSS3, Framer Motion, GSAP\nBACKEND            : AI Agents, Payment Integrations, Node.js, Express.js, REST APIs, JWT Authentication, Socket.io\nDATABASE           : MongoDB, Supabase\nTOOLS              : AI Agents, Model Context Protocol (MCP), Git, GitHub, Postman, Cursor, VS Code, Warp, npm, Figma, Canva\nCLOUD & DEPLOYMENT : Vercel, Render, GitHub Actions\nCURRENTLY EXPLORING: System Design, WebSockets, Redis, 3D Web Experiences, Three.js Ecosystem",
  contact:       "Email    : contact@mayankchaudhary.dev\nGitHub   : github.com/qwertyuii7\nLeetCode : leetcode.com/u/chaudharymayank/\nLocation : Lucknow, India · Open for Freelance",
  about:         "CS Engineering Student entering 3rd year at Lucknow University.\nPassionate about low-level C++ systems and modern, high-performance web applications.",
  github:        "→ Redirecting to github.com/qwertyuii7 ...",
  leetcode:      "→ Redirecting to leetcode.com/u/chaudharymayank/ ...",
  matrix:        "MATRIX_MODE=ON",
  clear:         "",
  ls:            "drwxr-xr-x  2 mayank mayank  4096 Jul 08 17:30 projects/\ndrwxr-xr-x  2 mayank mayank  4096 Jul 08 17:30 skills/\ndrwxr-xr-x  2 mayank mayank  4096 Jul 08 17:30 achievements/\n-rw-r--r--  1 mayank mayank  1337 Jul 08 17:30 bio.txt\n-rw-r--r--  1 mayank mayank   512 Jul 08 17:30 resume.pdf",
  "uname -a":    "Linux portfolio-os 6.8.0-mayank #1 SMP PREEMPT_DYNAMIC Mon Jul 8 17:30:00 UTC 2026 x86_64 GNU/Linux",
  uname:         "Linux portfolio-os 6.8.0-mayank x86_64",
  date:          new Date().toUTCString(),
  pwd:           "/home/mayank/portfolio",
  "cat bio":     "Mayank Chaudhary is a dedicated computer science engineering student based in Lucknow, India. Known for building clean terminal apps in C++ and state-of-the-art web applications in React & TypeScript.",
  "cat bio.txt": "Mayank Chaudhary is a dedicated computer science engineering student based in Lucknow, India. Known for building clean terminal apps in C++ and state-of-the-art web applications in React & TypeScript.",
  top:           "Tasks: 42 total, 1 running, 41 sleeping\nCPU usage: 1.2% us, 0.4% sy, 98.4% id\nMem: 16384M total, 4120M used, 12264M free\nPID USER     PR  NI    VIRT    RES  %CPU %MEM     TIME+ COMMAND\n  1 mayank   20   0  152704  45024   0.8  0.3   0:12.45 portfolio-os",
  df:            "Filesystem     1K-blocks      Used Available Use% Mounted on\n/dev/root      102400000  24580000  77820000  24% /\ntmpfs            8192000      4120   8187880   1% /run",
  free:          "               total        used        free      shared  buff/cache   available\nMem:        16384000     4120000    10264000      128000     2000000    12000000\nSwap:        4194304           0     4194304",
  ifconfig:      "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.108  netmask 255.255.255.0  broadcast 192.168.1.255\n        RX packets 1337  bytes 1048576 (1.0 MiB)\n        TX packets 420   bytes 512000 (500.0 KiB)",
  ping:          "PING mayankchaudhary.dev (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.245 ms\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.198 ms\n--- mayankchaudhary.dev ping statistics ---\n2 packets transmitted, 2 packets received, 0.0% packet loss",
  sudo:          "mayank is already running as root/superuser. All permissions granted.",
  history:       "1  help\n2  whoami\n3  stack\n4  projects\n5  skills\n6  contact\n7  matrix",
};

export const aboutHighlights = [
  { value: "3+",   label: "Years of Coding",     sub: "Self-taught since school" },
  { value: "5",    label: "Shipped Products",    sub: "Web · C++ · Python" },
];

export const earlyExperiences = [
  {
    year: "2022",
    title: "Completed 12th (PCM)",
    org: "Jawahar Navodaya Vidyalaya, Etawah",
    desc: "Science stream with Physics, Chemistry & Mathematics.",
  },
  {
    year: "2024 – Present",
    title: "CS Engineering Student",
    org: "Lucknow University, Lucknow",
    desc: "Currently entering 3rd year. Building projects in C++, Python, and Web technologies alongside academics.",
  },
  {
    year: "Jul 2026 – Present",
    title: "Full Stack Developer",
    org: "mastertej.com",
    desc: "Working as a developer building scalable solutions and web applications.",
  },
  {
    year: "Now  ◉",
    title: "Finding work as a Freelancer",
    org: "Open to opportunities",
    desc: "Available for freelance web development, product engineering, and open-source collaboration.",
  },
];

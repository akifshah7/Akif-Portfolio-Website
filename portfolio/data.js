/* Content data for the portfolio. Edit freely. */
window.PORTFOLIO = {
  name: "Akif Shah",
  initials: "AS",
  roles: ["production-grade APIs", "real-time systems", "full stack web apps"],
  lede: "Full Stack Engineer with 3+ years building production systems at high-growth startups. I ship IoT platforms, payment integrations, and real-time WebRTC systems — all tied directly to revenue and operational efficiency.",
  email: "akifshah7@gmail.com",

  stats: [
    { n: 3, suffix: "+", label: "Years building" },
    { n: 200, suffix: "+", label: "Vehicles tracked" },
    { n: 1000, suffix: "+", label: "Customers served" },
    { n: 60, suffix: "%", label: "Deployment time cut" },
  ],

  about: [
    { type: "lead", text: "I'm a Full Stack Engineer who thrives at the intersection of <em>product impact and engineering ownership</em>." },
    { type: "muted", text: "Over the last 3 years I've helped high-growth startups ship IoT fleet tracking, automated WhatsApp communication pipelines, real-time WebRTC systems, and payment integrations — all directly tied to revenue and operational efficiency. I care about building things fast without cutting corners: scalable backends, clean APIs, and interfaces that ops and sales teams actually want to use." },
  ],

  facts: [
    { k: "BASED IN", v: "Delhi · Remote", accent: false },
    { k: "FOCUS", v: "Full Stack · Systems", accent: true },
    { k: "STACK", v: "Node.js · React · TS", accent: false },
    { k: "STATUS", v: "Open to work", accent: true },
  ],

  marquee: ["Node.js", "React", "TypeScript", "Next.js", "Vue.js", "PostgreSQL", "Redis", "Docker", "WebRTC", "GraphQL", "BullMQ", "Tailwind"],

  skills: [
    { cat: "01", title: "Languages", items: ["JavaScript", "TypeScript", "Python", "HTML5 / CSS3"] },
    { cat: "02", title: "Frontend", items: ["React.js", "Vue.js", "Next.js", "Tailwind CSS"] },
    { cat: "03", title: "Backend", items: ["Node.js / Express.js", "REST APIs / GraphQL", "WebRTC", "Redis / BullMQ"] },
    { cat: "04", title: "Infra & Data", items: ["PostgreSQL", "Docker", "DigitalOcean", "CI/CD · GitHub Actions"] },
  ],

  projects: [
    { num: "01", badge: "AI Tool", title: "DocMind", desc: "Multi-PDF research assistant that lets you upload documents and ask questions across all of them — returning cited answers with source page numbers. Built with an agentic RAG pipeline, OCR support for scanned PDFs, and a clean React UI.", tags: ["Python", "FastAPI", "LangGraph", "ChromaDB", "React"], slot: "proj1", img: "../docmind.png", link: "https://github.com/akifshah7/DocMind---Multi-PDF-Research-Assistant" },
    { num: "02", badge: "CLI / AI", title: "AI Storyteller", desc: "Interactive terminal-based text adventure powered by Google Gemini 2.0 Flash. Generates branching narratives that respond to your choices in real time — with mood-aware color themes and five genre options.", tags: ["TypeScript", "Node.js", "Vercel AI SDK", "Gemini"], slot: "proj2", img: "../Ai_storyteller.png", link: "https://github.com/akifshah7/Ai-Storyteller" },
    { num: "03", badge: "Game", title: "15 Puzzle", desc: "A polished web-based sliding puzzle with shuffle, solvability checking, arrow key and swipe controls, and responsive design — built in React and TypeScript.", tags: ["TypeScript", "React", "CSS"], slot: "proj3", img: "../15_puzzle_game.png", link: "https://github.com/akifshah7/15-puzzle-game" },
  ],

  experience: [
    { when: "APR 2025 — PRESENT", role: "Full Stack Developer", org: "<b>Home Mechanic</b> · Delhi", desc: "Built real-time WebRTC video inspections, automated WhatsApp pipelines via BullMQ/Redis for 500+ customers, integrated Razorpay payments for 1,000+ customers, rebuilt the site in Next.js, and built an in-house CRM managing 500+ monthly leads." },
    { when: "DEC 2023 — MAY 2025", role: "Software Developer", org: "<b>FuelBuddy</b> · Gurugram", desc: "Built delivery slot allocation APIs improving scheduling efficiency by 25%, engineered bulk order automation for 500+ orders in under 30 seconds, developed IoT fleet tracking APIs for 200+ vehicles, and shipped React dashboards for ops and sales teams." },
    { when: "MAY 2023 — DEC 2023", role: "Front-End Intern", org: "<b>FuelBuddy</b> · Gurugram", desc: "Built Vue.js dashboards, integrated GraphQL APIs, implemented Google Maps API for real-time fleet location tracking across 200+ vehicles, and set up JWT authentication." },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/akifshah7" },
    { label: "LinkedIn", href: "https://linkedin.com/in/akifshah" },
    { label: "Twitter / X", href: "#" },
    { label: "Read.cv", href: "#" },
  ],
};

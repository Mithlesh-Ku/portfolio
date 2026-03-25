import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   PORTFOLIO DATA  — edit everything here
══════════════════════════════════════════════════════════════════════════════ */
const ME = {
  name:       "Mithlesh Kumar",
  role:       "Full-Stack Developer",
  subRole:    "CS Student · Gen AI Enthusiast · DSA Grinder",
  summary:    "I build intelligent, user-centric web applications using the MERN stack and emerging AI technologies. Currently pursuing B.Tech in CSE at LPU, I thrive at the intersection of clean code, machine learning, and real-world impact.",
  email:      "mithleshkumar3867@gmail.com",
  phone:      "+91-7488455949",
  github:     "https://github.com/Mithlesh-Ku",
  linkedin:   "https://linkedin.com/in/mithlesh-kumar-593857289/",
  // ↓ Place your photo in public/ folder as "profile.jpg" (or update path)
  photo:      "/profile-pic.jpeg",
  resumeUrl:  "/Mithlesh_kumarCV.docx",
  location:   "Phagwara, Punjab, India",
};

const SKILLS = [
  {
    category: "Languages",
    icon: "⌨️",
    color: "from-violet-500 to-purple-700",
    glow: "shadow-purple-500/30",
    items: ["Python","Java","SQL / MySQL","OOPs"],
  },
  {
    category: "Web Development",
    icon: "🌐",
    color: "from-cyan-400 to-blue-600",
    glow: "shadow-cyan-500/30",
    items: ["React.js","Node.js","Express.js","Flask","MongoDB","HTML5","CSS3","Tailwind CSS"],
  },
  {
    category: "AI & Machine Learning",
    icon: "🤖",
    color: "from-emerald-400 to-teal-600",
    glow: "shadow-teal-500/30",
    items: ["TensorFlow","Scikit-learn","LSTM","LangChain","RAG","LLM APIs","NLP","Vector Embeddings"],
  },
  {
    category: "Tools & DevOps",
    icon: "🛠️",
    color: "from-orange-400 to-amber-600",
    glow: "shadow-orange-500/30",
    items: ["Docker","Git / GitHub","Maven","Matplotlib","Seaborn","Jupyter","REST APIs","JWT"],
  },
];

const PROJECTS = [
  {
    title:    "StorySprout",
    subtitle: "AI Story Generating Chatbot",
    emoji:    "📖",
    period:   "Jun '25 – Aug '25",
    accent:   "#7c3aed",
    accentLight: "#ede9fe",
    desc:     "A MERN-based generative storytelling platform that creates interactive, AI-driven narratives through conversational prompts. Features JWT auth, session history, and real-time story generation.",
    bullets: [
      "MERN stack with Generative AI API integration",
      "JWT auth + session-based story history",
      "RESTful API architecture with Express.js",
    ],
    tech:     ["MongoDB","Express.js","React.js","Node.js","Gen AI API","JWT","ECharts","REST APIs"],
    github:   "https://github.com/Mithlesh-Ku",
    demo:     "#",
  },
  {
    title:    "AQI Explorer",
    subtitle: "Real-Time Air Quality EDA",
    emoji:    "🌿",
    period:   "Sept '25 – Oct '25",
    accent:   "#059669",
    accentLight: "#d1fae5",
    desc:     "Comprehensive EDA on real-time AQI datasets. Cleaned and preprocessed environmental data, performed statistical and correlation analysis to uncover pollutant trends.",
    bullets: [
      "EDA on PM2.5, PM10, NO₂, CO datasets",
      "Statistical & correlation analysis",
      "Rich visualizations with Seaborn + Matplotlib",
    ],
    tech:     ["Python","Pandas","NumPy","Matplotlib","Seaborn","Jupyter Notebook"],
    github:   "https://github.com/Mithlesh-Ku",
    demo:     "#",
  },
];

const EXPERIENCE = [
  {
    role:     "MERN Stack with Gen AI Intern",
    company:  "W3grads",
    period:   "Jun 2025 – Jul 2025",
    type:     "Internship",
    color:    "bg-violet-500",
    bullets: [
      "Built a Story Generating Chatbot using MERN stack + Generative AI, enabling AI-driven narrative creation via prompt-based conversations.",
      "Integrated JWT authentication and secure session management for protected access to chatbot features.",
    ],
    tech: ["MongoDB","Express.js","React.js","Node.js","ECharts","RESTful APIs"],
  },
  {
    role:     "Web Content Developer",
    company:  "Asha – Lata Viklang Vikas Kendra",
    period:   "Jun 2024 – Jul 2024",
    type:     "Internship",
    color:    "bg-cyan-500",
    bullets: [
      "Revamped the WordPress website for visually impaired students, improving navigation and accessibility.",
      "Published and optimized 5+ posts and pages, improving content discoverability.",
      "Standardized UI layout to align with the organization's mission and branding.",
    ],
    tech: ["WordPress","HTML","CSS"],
  },
];

const CERTS = [
  { title:"MERN Stack with Generative AI",  org:"W3grads",                    year:"2025", icon:"🏅", color:"from-violet-500 to-purple-600"},
  { title:"Advanced Python Programming",    org:"iHUB DivyaSampark | IIT Roorkee", year:"2024", icon:"🐍", color:"from-yellow-500 to-orange-500"},
  { title:"Hardware & Operating Systems",   org:"IBM",                         year:"2024", icon:"💻", color:"from-blue-500 to-cyan-500"},
  { title:"Fundamentals of Marketing",      org:"Upgrad",                      year:"2023", icon:"📈", color:"from-pink-500 to-rose-500"},
  { title:"Machine Learning with Data Science", org:"Upgrad",                  year:"2026", icon:"🤖", color:"from-emerald-500 to-teal-500" },
];

const COMPETITIVE = [
  { platform:"LeetCode",  stat:"350+",  label:"Problems Solved",        icon:"⚡", color:"from-yellow-400 to-orange-500", bg:"bg-yellow-50 dark:bg-yellow-900/20" },
  { platform:"GFG",       stat:"Active",label:"Contributor",            icon:"🟢", color:"from-green-400 to-emerald-600", bg:"bg-green-50 dark:bg-green-900/20" },
  { platform:"HackerRank",stat:"5★",    label:"Problem Solving",        icon:"⭐", color:"from-teal-400 to-cyan-600",     bg:"bg-teal-50 dark:bg-teal-900/20" },
  { platform:"Hackathon", stat:"Lead",  label:"Vehicle Tracking System 2024", icon:"🏆", color:"from-purple-400 to-violet-600", bg:"bg-purple-50 dark:bg-purple-900/20" },
];

const EDU = [
  { school:"Lovely Professional University", loc:"Phagwara, Punjab", degree:"B.Tech – CSE", score:"CGPA 7.23", period:"Aug 2023 – Present", icon:"🎓" },
  { school:"Sree Ayyappa Public School",      loc:"Bokaro, Jharkhand", degree:"Intermediate (XII)", score:"82.4%", period:"2021 – 2023", icon:"📚" },
  { school:"Sree Ayyappa Public School",      loc:"Bokaro, Jharkhand", degree:"Matriculation (X)", score:"89.2%", period:"2020 – 2021", icon:"🏫" },
];

/* ══════════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES injected into <head>
══════════════════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0a0f;
    --bg2:       #111118;
    --bg3:       #18181f;
    --surface:   #1e1e28;
    --border:    rgba(255,255,255,0.07);
    --text:      #f0f0f5;
    --muted:     #8b8b9e;
    --accent:    #7c6ff7;
    --accent2:   #38bdf8;
    --glow:      rgba(124,111,247,0.35);
    --card-bg:   #15151e;
  }
  .light {
    --bg:        #f7f7fb;
    --bg2:       #f0f0f6;
    --bg3:       #e8e8f0;
    --surface:   #ffffff;
    --border:    rgba(0,0,0,0.08);
    --text:      #0f0f1a;
    --muted:     #6b6b7e;
    --accent:    #6153e8;
    --accent2:   #0284c7;
    --glow:      rgba(97,83,232,0.2);
    --card-bg:   #ffffff;
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    transition: background 0.4s, color 0.4s;
  }

  h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);    opacity:0.6; }
    100% { transform: scale(1.6);  opacity:0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes gradient-shift {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
  }

  .animate-fadeUp  { animation: fadeUp 0.7s ease forwards; }
  .animate-float   { animation: float 4s ease-in-out infinite; }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
  .cursor-blink    { animation: blink 1s step-start infinite; }

  .reveal { opacity:0; transform:translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }

  .gradient-text {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gradient-border {
    position: relative;
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .card-hover {
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 20px 60px -15px var(--glow);
  }

  /* noise overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
    z-index: 0;
  }

  /* Photo placeholder */
  .photo-ring {
    background: conic-gradient(var(--accent), var(--accent2), var(--accent));
    animation: spin-slow 6s linear infinite;
  }

  /* Nav glass */
  .nav-glass {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background: rgba(10,10,15,0.75);
    border-bottom: 1px solid var(--border);
  }
  .light .nav-glass {
    background: rgba(247,247,251,0.85);
  }

  /* tag pill */
  .tech-pill {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--bg3);
    color: var(--muted);
    border: 1px solid var(--border);
    transition: all 0.2s;
  }
  .tech-pill:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

  .section-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
  }

  /* Timeline line */
  .timeline-line {
    position: absolute;
    left: 20px;
    top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--accent2), transparent);
  }

  /* Contact input */
  .form-input {
    width: 100%;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: var(--text);
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .form-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--glow);
  }
  .form-input::placeholder { color: var(--muted); }

  /* skill bar */
  .skill-bar-fill {
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, var(--accent), var(--accent2));
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 1s cubic-bezier(0.34,1.3,0.64,1);
  }
  .skill-bar-fill.active { transform: scaleX(1); }
`;

/* ══════════════════════════════════════════════════════════════════════════════
   UTILITY HOOKS
══════════════════════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ══════════════════════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════════════════════ */
const Icon = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  External: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════════════════ */
const NAV_ITEMS = ["About","Skills","Projects","Certs","Experience","Competitive","Contact"];

function Navbar({ light, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.4s",
        ...(scrolled ? {} : { background: "transparent", borderBottom: "none" }),
      }}
      className={scrolled ? "nav-glass" : ""}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.35rem", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="gradient-text">MK</span>
          <span style={{ color: "var(--muted)", marginLeft: 2 }}>.</span>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hide-mobile">
          {NAV_ITEMS.map(n => (
            <button key={n} onClick={() => go(n)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontFamily: "DM Sans", fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s", padding: "4px 0" }}
              onMouseEnter={e => e.target.style.color = "var(--accent)"}
              onMouseLeave={e => e.target.style.color = "var(--muted)"}>{n}</button>
          ))}
          <button onClick={toggle}
            style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 10px", cursor: "pointer", color: "var(--text)", display: "flex", alignItems: "center", transition: "all 0.2s" }}>
            {light ? <Icon.Moon /> : <Icon.Sun />}
          </button>
        </nav>

        {/* Mobile */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="show-mobile">
          <button onClick={toggle}
            style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 10px", cursor: "pointer", color: "var(--text)" }}>
            {light ? <Icon.Moon /> : <Icon.Sun />}
          </button>
          <button onClick={() => setMobileOpen(o => !o)}
            style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 10px", cursor: "pointer", color: "var(--text)" }}>
            {mobileOpen ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map(n => (
            <button key={n} onClick={() => go(n)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontFamily: "DM Sans", fontSize: "0.95rem", fontWeight: 500, padding: "12px 0", textAlign: "left", borderBottom: "1px solid var(--border)" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Full-Stack Developer", "Gen AI Builder", "MERN Stack Dev", "DSA Enthusiast"];
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    let t;
    if (!deleting && typed.length < word.length) {
      t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
    } else if (!deleting && typed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      t = setTimeout(() => setTyped(typed.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setWIdx(i => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, wIdx]);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
      {/* Background glow blobs */}
      <div style={{ position: "absolute", top: "10%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,247,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }} className="hero-grid">

          {/* Left: text */}
          <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
            {/* Status badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(124,111,247,0.12)", border: "1px solid rgba(124,111,247,0.3)", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse-ring 2s ease-out infinite", display: "block" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a78bfa", letterSpacing: "0.06em" }}>OPEN TO OPPORTUNITIES</span>
            </div>

            <h1 style={{ fontFamily: "Syne", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
              Hi, I'm <br />
              <span className="gradient-text">{ME.name}</span>
            </h1>

            <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 500, marginBottom: 20, height: "1.8em", color: "var(--text)" }}>
              <span>{typed}</span>
              <span className="cursor-blink" style={{ color: "var(--accent)", marginLeft: 2 }}>|</span>
            </div>

            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", maxWidth: 520, marginBottom: 36 }}>
              {ME.summary}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, fontFamily: "Syne", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", boxShadow: "0 8px 24px -4px var(--glow)", transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                View Projects ↓
              </button>
              <a href={ME.resumeUrl} download
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, fontFamily: "Syne", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", cursor: "pointer", background: "transparent", color: "var(--text)", border: "1px solid var(--border)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}>
                <Icon.Download /> Resume
              </a>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, fontFamily: "Syne", fontWeight: 700, fontSize: "0.9rem", border: "1px solid var(--border)", cursor: "pointer", background: "var(--bg3)", color: "var(--text)", transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                Contact Me
              </button>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {[
                { href: ME.github,   icon: <Icon.Github />,   label: "GitHub" },
                { href: ME.linkedin, icon: <Icon.Linkedin />, label: "LinkedIn" },
                { href: `mailto:${ME.email}`, icon: <Icon.Mail />, label: "Email" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderRadius: 10, background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 500, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Profile photo */}
          <div className="hero-photo" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "fadeUp 1s ease 0.2s forwards", opacity: 0 }}>
            <ProfilePhoto />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{ME.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center", marginTop: 4, color: "var(--muted)", fontSize: "0.8rem" }}>
                <Icon.MapPin /> {ME.location}
              </div>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 60, animation: "float 3s ease-in-out infinite" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: "0.75rem", cursor: "pointer" }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            <span>Scroll Down</span>
            <div style={{ width: 24, height: 40, border: "2px solid var(--border)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
              <div style={{ width: 3, height: 8, background: "var(--accent)", borderRadius: 2, animation: "float 1.5s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PROFILE PHOTO COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{ position: "relative", width: 220, height: 220 }}>
      {/* Spinning gradient ring */}
      <div className="photo-ring"
        style={{ position: "absolute", inset: -4, borderRadius: "50%", padding: 3, zIndex: 0 }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg)" }} />
      </div>
      {/* Glow */}
      <div style={{ position: "absolute", inset: -16, borderRadius: "50%", background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      {/* Orbiting dot */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 12, height: 12, marginTop: -6, marginLeft: -6, animation: "orbit 5s linear infinite" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent2)", boxShadow: "0 0 8px var(--accent2)" }} />
        </div>
      </div>
      {/* Photo or placeholder */}
      <div style={{ position: "absolute", inset: 3, borderRadius: "50%", overflow: "hidden", zIndex: 1, border: "3px solid var(--bg)" }}>
        {!imgError ? (
          <img
            src={ME.photo}
            alt={ME.name}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
    </div>
  );
}

function PhotoPlaceholder() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, var(--bg3) 0%, var(--surface) 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8, cursor: "default",
    }}>
      <svg viewBox="0 0 80 80" width="70" height="70" fill="none">
        <circle cx="40" cy="30" r="18" fill="var(--accent)" opacity="0.25"/>
        <circle cx="40" cy="30" r="18" stroke="var(--accent)" strokeWidth="1.5"/>
        <ellipse cx="40" cy="66" rx="26" ry="14" fill="var(--accent)" opacity="0.2"/>
        <ellipse cx="40" cy="66" rx="26" ry="14" stroke="var(--accent)" strokeWidth="1.5"/>
      </svg>
      <span style={{ fontSize: "0.65rem", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.1em", textAlign: "center", padding: "0 12px" }}>
        ADD PHOTO<br/>
        <span style={{ fontWeight: 400, opacity: 0.6 }}>public/profile.jpg</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   SECTION WRAPPER
══════════════════════════════════════════════════════════════════════════════ */
function Section({ id, label, title, children, alt }) {
  return (
    <section id={id} style={{ padding: "100px 0", background: alt ? "var(--bg2)" : "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p className="section-label" style={{ marginBottom: 10 }}>{label}</p>
          <h2 style={{ fontFamily: "Syne", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.15 }}>{title}</h2>
          <div style={{ width: 48, height: 3, background: "linear-gradient(to right, var(--accent), var(--accent2))", borderRadius: 2, marginTop: 14 }} />
        </div>
        {children}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <Section id="about" label="01 — WHO I AM" title="About Me">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="two-col">
        {/* Left */}
        <div className="reveal">
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--muted)", marginBottom: 24 }}>
            I'm a Computer Science Engineering student at <strong style={{ color: "var(--text)" }}>Lovely Professional University</strong>, passionate about building full-stack web applications, training ML models, and solving algorithmic challenges.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--muted)", marginBottom: 32 }}>
            I thrive at the intersection of clean engineering, thoughtful UX, and cutting-edge AI. Whether it's a MERN chatbot powered by generative AI or a deep exploratory data analysis — I approach every project with intellectual curiosity and craft.
          </p>

          {/* Interest pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["💻 Software Development","🧠 ML & Generative AI","⚡ DSA & Problem Solving","🌐 Full-Stack Web","📊 Data Science"].map(t => (
              <span key={t} style={{ padding: "8px 16px", borderRadius: 999, fontSize: "0.82rem", fontWeight: 500, background: "rgba(124,111,247,0.1)", border: "1px solid rgba(124,111,247,0.25)", color: "#a78bfa" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right: Education */}
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ fontFamily: "Syne", fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>Education</h3>
          {EDU.map((e, i) => (
            <div key={i} className="gradient-border"
              style={{ padding: "20px 22px", borderRadius: 16, background: "var(--card-bg)", display: "flex", alignItems: "flex-start", gap: 14, transition: "transform 0.3s" }}
              onMouseEnter={ev => ev.currentTarget.style.transform = "translateX(4px)"}
              onMouseLeave={ev => ev.currentTarget.style.transform = "translateX(0)"}>
              <span style={{ fontSize: "1.5rem" }}>{e.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{e.school}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: 2 }}>{e.degree}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: "0.78rem", padding: "3px 10px", borderRadius: 999, background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", fontWeight: 600 }}>{e.score}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{e.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════════════════════════════ */
function Skills() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll(".skill-bar-fill").forEach(b => b.classList.add("active")); }),
      { threshold: 0.3 }
    );
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <Section id="skills" label="02 — WHAT I KNOW" title="Skills & Technologies" alt>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        {SKILLS.map((sk, i) => (
          <div key={sk.category} ref={el => refs.current[i] = el} className="reveal card-hover"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
            {/* Top gradient strip */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${sk.color.replace("from-","").replace(" to-",",").split(" ")[0].replace("from-","")})`, backgroundImage: `linear-gradient(to right, var(--accent), var(--accent2))` }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, rgba(124,111,247,0.2), rgba(56,189,248,0.2))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                {sk.icon}
              </div>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{sk.category}</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {sk.items.map(item => (
                <span key={item} className="tech-pill">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <Section id="projects" label="03 — WHAT I BUILT" title="Featured Projects">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
        {PROJECTS.map(p => (
          <div key={p.title} className="reveal card-hover"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Card header banner */}
            <div style={{ padding: "32px 28px 24px", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${p.accent}15, ${p.accent}05)` }} />
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 54, height: 54, borderRadius: 14, background: `${p.accent}20`, border: `1.5px solid ${p.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>{p.emoji}</div>
                  <span style={{ fontSize: "0.75rem", padding: "5px 12px", borderRadius: 999, background: "var(--bg3)", color: "var(--muted)", border: "1px solid var(--border)" }}>{p.period}</span>
                </div>
                <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: 4 }}>{p.title}</h3>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: p.accent, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.subtitle}</p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--muted)" }}>{p.desc}</p>
              </div>
            </div>

            {/* Bullets */}
            <div style={{ padding: "0 28px 20px" }}>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.bullets.map(b => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", color: "var(--muted)" }}>
                    <span style={{ color: p.accent, marginTop: 1, flexShrink: 0 }}>▸</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div style={{ padding: "0 28px 20px", display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}30` }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ padding: "16px 28px 28px", display: "flex", gap: 12, borderTop: "1px solid var(--border)" }}>
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, background: "var(--bg3)", color: "var(--text)", textDecoration: "none", fontSize: "0.83rem", fontWeight: 600, border: "1px solid var(--border)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = p.accent; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <Icon.Github /> GitHub
              </a>
              <a href={p.demo} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, background: "transparent", color: "var(--muted)", textDecoration: "none", fontSize: "0.83rem", fontWeight: 600, border: "1px solid var(--border)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = p.accent; e.currentTarget.style.borderColor = p.accent; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <Icon.External /> Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════════════════════════════════════════════ */
function Certs() {
  return (
    <Section id="certs" label="04 — CREDENTIALS" title="Certifications & Courses" alt>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        {CERTS.map((c, i) => (
          <div key={i} className="reveal card-hover"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "24px", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundImage: `linear-gradient(to right, var(--accent), var(--accent2))` }} />
            <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", background: "var(--bg3)", marginBottom: 16 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4, color: "var(--text)", marginBottom: 8 }}>{c.title}</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>{c.org}</p>
            <span style={{ fontSize: "0.73rem", fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff" }}>{c.year}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════════════════════════════ */
function Experience() {
  return (
    <Section id="experience" label="05 — WHERE I'VE WORKED" title="Work Experience">
      <div style={{ position: "relative", paddingLeft: 52 }}>
        <div className="timeline-line" />
        {EXPERIENCE.map((ex, i) => (
          <div key={i} className="reveal"
            style={{ position: "relative", marginBottom: i < EXPERIENCE.length - 1 ? 40 : 0, paddingLeft: 32 }}>
            {/* Timeline dot */}
            <div style={{ position: "absolute", left: -44, top: 18, width: 20, height: 20, borderRadius: "50%", background: `linear-gradient(135deg, var(--accent), var(--accent2))`, boxShadow: "0 0 12px var(--glow)", border: "3px solid var(--bg)" }} />

            <div className="card-hover gradient-border"
              style={{ background: "var(--card-bg)", borderRadius: 20, padding: "28px 28px", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: `${ex.color} opacity-20`, color: "#fff", background: "linear-gradient(135deg, var(--accent), var(--accent2))", marginBottom: 10, display: "inline-block" }}>{ex.type}</span>
                  <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.15rem", color: "var(--text)", marginTop: 8 }}>{ex.role}</h3>
                  <p style={{ fontWeight: 700, color: "var(--accent)", fontSize: "0.9rem", marginTop: 4 }}>{ex.company}</p>
                </div>
                <span style={{ fontSize: "0.8rem", padding: "6px 14px", borderRadius: 10, background: "var(--bg3)", color: "var(--muted)", border: "1px solid var(--border)", flexShrink: 0 }}>{ex.period}</span>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginTop: 18, marginBottom: 20 }}>
                {ex.bullets.map(b => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.9rem", lineHeight: 1.6, color: "var(--muted)" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>▸</span>{b}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ex.tech.map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   COMPETITIVE
══════════════════════════════════════════════════════════════════════════════ */
function Competitive() {
  return (
    <Section id="competitive" label="06 — ACHIEVEMENTS" title="Competitive Programming" alt>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
        {COMPETITIVE.map((c, i) => (
          <div key={i} className="reveal card-hover"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,111,247,0.05), transparent)", pointerEvents: "none" }} />
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{c.icon}</div>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "2rem", background: `linear-gradient(135deg, var(--accent), var(--accent2))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 4 }}>
              {c.stat}
            </div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: 8 }}>{c.platform}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Training section */}
      <div className="reveal" style={{ marginTop: 40 }}>
        <div className="gradient-border"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
            <div style={{ flex: "0 0 auto", width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg, rgba(124,111,247,0.2), rgba(56,189,248,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>📘</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "baseline" }}>
                <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>Machine Learning with Data Science</h3>
                <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 999, background: "rgba(124,111,247,0.2)", color: "#a78bfa", border: "1px solid rgba(124,111,247,0.3)" }}>In Progress</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600, marginTop: 4 }}>Upgrad — Jan 2026 – Present</p>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginTop: 10, lineHeight: 1.7 }}>
                Supervised & unsupervised ML models, NLP, data cleaning with Python/Excel, EDA with Seaborn & Matplotlib. Building hands-on industry projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sent

  const submit = e => {
    e.preventDefault();
    const link = `mailto:${ME.email}?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.open(link, "_blank");
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <Section id="contact" label="07 — LET'S TALK" title="Get In Touch">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="two-col">

        {/* Left */}
        <div className="reveal">
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--muted)", marginBottom: 36 }}>
            I'm always open to discussing exciting projects, internship opportunities, or collaborations. Send me a message — I'll get back to you within 24 hours!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: <Icon.Mail />,     label: "Email",    val: ME.email,   href: `mailto:${ME.email}` },
              { icon: <Icon.Github />,   label: "GitHub",   val: "Mithlesh-Ku", href: ME.github },
              { icon: <Icon.Linkedin />, label: "LinkedIn", val: "Mithlesh Kumar", href: ME.linkedin },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="card-hover"
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 16, background: "var(--card-bg)", border: "1px solid var(--border)", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(124,111,247,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{item.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="reveal">
          <form onSubmit={submit}
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 24, padding: "36px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-grid">
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                <input className="form-input" placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
              <textarea className="form-input" rows={6} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required style={{ resize: "vertical" }} />
            </div>
            <button type="submit"
              style={{ padding: "15px 28px", borderRadius: 12, fontFamily: "Syne", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer", background: status === "sent" ? "#22c55e" : "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", boxShadow: "0 8px 24px -4px var(--glow)", transition: "all 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              {status === "sent" ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)", padding: "36px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div>
          <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.2rem", marginBottom: 4 }}>
            <span className="gradient-text">Mithlesh Kumar</span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>© {new Date().getFullYear()} · All rights reserved</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { href: ME.github,   icon: <Icon.Github />,   title: "GitHub" },
            { href: ME.linkedin, icon: <Icon.Linkedin />, title: "LinkedIn" },
            { href: `mailto:${ME.email}`, icon: <Icon.Mail />, title: "Email" },
          ].map(s => (
            <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
              style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════════════════════════════════ */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 46, height: 46, borderRadius: 12,
        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
        border: "none", cursor: "pointer", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 24px -4px var(--glow)",
        opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
      <Icon.ChevronUp />
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   RESPONSIVE STYLE TAG
══════════════════════════════════════════════════════════════════════════════ */
const RESPONSIVE_CSS = `
  .hide-mobile { display: flex !important; }
  .show-mobile { display: none !important; }
  .hero-grid { grid-template-columns: 1fr auto !important; }
  .hero-photo { display: flex !important; }
  .two-col { grid-template-columns: 1fr 1fr !important; }
  .form-grid { grid-template-columns: 1fr 1fr !important; }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-photo { display: none !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .form-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ══════════════════════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [light, setLight] = useState(false);
  useReveal();

  useEffect(() => {
    // Inject global CSS once
    if (!document.getElementById("portfolio-css")) {
      const s = document.createElement("style");
      s.id = "portfolio-css";
      s.textContent = GLOBAL_CSS + RESPONSIVE_CSS;
      document.head.appendChild(s);
    }
    const root = document.documentElement;
    if (light) { root.classList.add("light"); }
    else { root.classList.remove("light"); }
  }, [light]);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar light={light} toggle={() => setLight(l => !l)} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certs />
      <Experience />
      <Competitive />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

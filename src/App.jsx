import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import SpotlightCard from './components/SpotlightCard';
import RippleGridBackground from './components/RippleGridBackground';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';

// ==========================================
// 1. MASSIVE TYPOGRAPHY LOADING SCREEN
// ==========================================
const LoadingScreen = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 800);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} 
      className="fixed inset-0 z-[100] bg-[#030712] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712]"></div>
      <motion.div 
        animate={isComplete ? { scale: 1.1, opacity: 0, filter: "blur(10px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }} 
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative text-[15vw] md:text-[12vw] font-black tracking-tighter uppercase whitespace-nowrap text-blue-950 select-none z-10"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          SMIT PUJARA
        </motion.div>
        <motion.div 
          className="absolute top-0 left-0 text-blue-400 overflow-hidden whitespace-nowrap drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: "105%" }} // 105% ensures it fully covers the right-most edge of the font glyph
          transition={{ duration: 2.5, ease: [0.77, 0, 0.175, 1] }}
        >
          SMIT PUJARA
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 3. SYSTEM NAV (Active State Tracking)
// ==========================================
const SysNav = () => {
  const [active, setActive] = useState("home");
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });
    
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(s => observer.observe(s));
    
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-white/5 bg-[#030712]/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center font-mono text-xs uppercase tracking-widest text-zinc-400">
      <div>SYS.PORTFOLIO // V1.0</div>
      <div className="hidden md:flex gap-8">
        <a href="#home" className={`transition-all duration-300 ${active === "home" ? "text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "hover:text-blue-400"}`}>INIT</a>
        <a href="#about" className={`transition-all duration-300 ${active === "about" ? "text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "hover:text-blue-400"}`}>PROFILE</a>
        <a href="#modules" className={`transition-all duration-300 ${active === "modules" ? "text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "hover:text-blue-400"}`}>MODULES</a>
        <a href="#uplink" className={`transition-all duration-300 ${active === "uplink" ? "text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "hover:text-blue-400"}`}>UPLINK</a>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <span className="text-blue-400">ONLINE</span>
      </div>
    </nav>
  );
};

// ==========================================
// 4. HERO SECTION (Fixed Typography & Background)
// ==========================================
const HeroSection = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-end relative overflow-hidden z-10 bg-[#030712]">
      
      {/* Parallax Background Constrained to Hero */}
      <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-0 pointer-events-auto">
        <RippleGridBackground 
          gridColor="#1e3a8a" 
          rippleIntensity={0.06}
          gridSize={24.0}
          gridThickness={8.0}
          glowIntensity={0.1} // Increased from 0.05 for more glow
          fadeDistance={0.6} // Increased from 0.3 for a wider radius
          vignetteStrength={1.5} // Slightly stronger vignette
          mouseInteraction={true}
        />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      </motion.div>

      {/* Parallax Content Container */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 w-full h-full min-h-screen pt-32 pb-16 flex flex-col justify-end px-6 lg:px-12 pointer-events-none">
        
        {/* Right Side Image (Restored to absolute to allow intentional text overlap) */}
        <div className="absolute top-[24%] right-[5%] lg:right-[10%] w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border border-white/10 rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 z-10 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] pointer-events-auto">
          <img src="https://smit134.github.io/Smit-Portfolio/me.webp" alt="Smit Pujara" className="w-full h-full object-cover opacity-100" />
          <div className="absolute inset-0 bg-blue-500 mix-blend-overlay opacity-20 hover:opacity-0 transition-opacity duration-700"></div>
        </div>

        {/* Left Side Info (In normal flow to safely stack above bottom text) */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="hidden md:flex flex-col gap-6 pointer-events-auto max-w-xs relative z-20 mb-6 mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Available for Deployments</span>
          </div>
          <p className="font-mono text-sm text-zinc-500 leading-relaxed border-l-2 border-blue-500/50 pl-4">
            Engineering high-performance backend systems. Specializing in C++, Java architecture, and scalable databases.
          </p>
        </motion.div>
        
        <div className="relative w-full pt-8 pointer-events-auto shrink-0">
          <hr className="absolute top-0 left-0 w-full border-t border-white/10 m-0 p-0 z-0" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="font-mono text-sm text-blue-400 mb-4 tracking-widest uppercase relative z-20">
            ID: SMIT PUJARA // SPECIALTY: BACKEND & DISTRIBUTED SYSTEMS
          </motion.p>
          
          <h1 className="flex flex-col relative z-20 m-0 p-0">
            <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="block overflow-hidden py-1">
              <span className="block text-[10vw] leading-none font-black tracking-tight uppercase text-white hover:text-blue-400 transition-colors cursor-default text-shadow-sm">ENGINEERING</span>
            </motion.span>
            <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }} className="block overflow-hidden py-1">
              <span className="block text-[10vw] leading-none font-black tracking-tight uppercase text-white hover:text-blue-400 transition-colors cursor-default text-right">SYSTEMS</span>
            </motion.span>
          </h1>
        </div>
      </motion.div>
    </section>
  );
};

// ==========================================
// 5. PROFILE, DIRECTIVES & ARSENAL
// ==========================================
const ProfileSection = () => {
  const directives = [
    { title: "Distributed Systems", desc: "Building resilient architectures. Fascinated by network protocols and efficient data routing.", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30 hover:border-blue-500" },
    { title: "Low-Level Design", desc: "Writing close to the metal. Focused on manual memory management and algorithmic efficiency.", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30 hover:border-purple-500" },
    { title: "Database Engineering", desc: "Constructing normalized schemas, complex joins, and ensuring ACID properties in SQL.", icon: "M4 6c0 1.6 3.6 3 8 3s8-1.4 8-3-3.6-3-8-3-8 1.4-8 3z M4 12c0 1.6 3.6 3 8 3s8-1.4 8-3 M4 18c0 1.6 3.6 3 8 3s8-1.4 8-3", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30 hover:border-emerald-500" }
  ];

  const techData = [
    { name: "C++", val: "98%", color: "bg-blue-500" },
    { name: "JAVA", val: "94%", color: "bg-orange-500" },
    { name: "PYTHON", val: "88%", color: "bg-yellow-500" },
    { name: "SQL", val: "92%", color: "bg-cyan-500" }
  ];

  return (
    <section id="about" className="py-32 px-6 lg:px-12 relative z-10 border-t border-white/5 bg-[#030712]/50">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Row: Bio & Arsenal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <SpotlightCard className="p-10" spotlightColor="rgba(59, 130, 246, 0.2)">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-white">System Profile</h2>
              <p className="text-lg text-zinc-300 leading-relaxed font-light relative z-10 mb-4">
                I am an engineer obsessed with understanding how systems work from the ground up. I bridge the gap between low-level performance and scalable high-level architecture.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed font-light relative z-10">
                My engineering philosophy focuses on absolute precision, whether I am managing memory in C++ or designing distributed node networks in Java.
              </p>
            </motion.div>
          </SpotlightCard>

          <SpotlightCard className="p-10 flex flex-col justify-center" spotlightColor="rgba(168, 85, 247, 0.15)">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-8 text-white">Technical Arsenal</h3>
              <div className="flex flex-col gap-6">
                {techData.map(t => (
                  <div key={t.name} className="relative z-10">
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-white font-bold">{t.name}</span>
                      <span className="text-zinc-500">{t.val}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: t.val }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${t.color} shadow-[0_0_10px_currentColor]`}></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </SpotlightCard>

        </div>

        {/* Bottom Row: Core Directives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directives.map((spec, i) => (
            <SpotlightCard key={spec.title} className="p-8 group" spotlightColor="rgba(255, 255, 255, 0.05)">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-start relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${spec.bg} ${spec.color} border ${spec.border}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={spec.icon}></path></svg>
                </div>
                <h4 className="text-lg font-bold mb-3 text-white uppercase tracking-tight">{spec.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{spec.desc}</p>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================
// 6. SCROLL-TELLING MODULES (Native Stack Effect)
// ==========================================
const ModulesSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projects = [
    { title: "Secure Connect", desc: "Enterprise messaging system built to master networking and systems programming. Nodes establish connection dynamically.", tags: ["C++", "Java", "Networking"], link: "https://github.com/smit134/SecureConnect-Server.git" },
    { title: "Banking Software", desc: "Command-line banking software handling strict user authentication and safe persistence.", tags: ["C++", "Security", "File I/O"], link: "https://github.com/smit134/Banking-Software.git" },
    { title: "Maze Master", desc: "Advanced logic using Recursive Backtracking (DFS) with strict manual memory management in C.", tags: ["C", "Algorithms", "Memory"], link: "https://github.com/smit134/Maze-Master.git" },
    { title: "Virtual Stock Engine", desc: "Multi-threaded Java application simulating real-time market data, ensuring thread safety.", tags: ["Java", "Multithreading"], link: "https://github.com/smit134/Virtual-Stock-Engine.git" },
    { title: "Incredible India", desc: "Precise front-end tourism portal focusing on DOM manipulation and SEO standards.", tags: ["HTML", "CSS", "UI/UX"], link: "https://smit134.github.io/Incredible-India/" }
  ];

  return (
    <section id="modules" className="relative z-20 border-t border-white/5 bg-[#030712]">
      
      {/* DESKTOP: 600vh Scroll-Telling with Stack Effect */}
      <div ref={containerRef} className="hidden lg:block h-[600vh] w-full">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-row">
          
          {/* Left Side: Scroll Stack Cards */}
          <div className="w-[45%] h-full pt-20 px-16 pb-16 flex flex-col border-r border-white/5 relative z-10 bg-[#030712]/90 backdrop-blur-md shadow-2xl">
            <h2 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-12 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-blue-500"></span> Data Modules
            </h2>
            <div className="relative flex-1 w-full mt-8">
              {projects.map((p, i) => {
                const step = 1 / projects.length; // 0.2
                const startIn = i * step; 
                const endIn = startIn + 0.05;
                // Stack Effect logic: new card slides in from bottom.
                // Cards are grouped in pairs (0 & 1, 2 & 3, etc.) so alternating tabs align perfectly on the same visual row!
                const pairIndex = Math.floor(i / 2);
                const finalY = pairIndex * 45;
                const yTrans = useTransform(scrollYProgress, [startIn, endIn], [800, finalY]);
                
                // Scale down slightly each time a new card comes in
                const scaleInput = [0, startIn, endIn];
                const scaleOutput = [1, 1, 1];
                for (let j = i + 1; j < projects.length; j++) {
                  scaleInput.push(j * step, j * step + 0.05);
                  const prev = scaleOutput[scaleOutput.length - 1];
                  scaleOutput.push(prev, prev - 0.03); // shrink 3% each time
                }
                const scaleTrans = useTransform(scrollYProgress, scaleInput, scaleOutput);
                
                // No blur so they stay perfectly crisp
                const blurTrans = "blur(0px)";
                
                const pointerEvents = useTransform(scrollYProgress, [startIn, endIn], ["none", "auto"]);
                
                const isEven = i % 2 === 0;

                return (
                  <motion.div 
                    key={i} 
                    style={{ y: yTrans, scale: scaleTrans, filter: blurTrans, pointerEvents, zIndex: i }} 
                    className="absolute top-0 left-0 w-full h-[45vh] origin-top will-change-transform flex flex-col"
                  >
                    {/* Folder Tab */}
                    <div className={`h-10 w-32 bg-[#0a0a0a] border-t border-l border-r border-white/10 rounded-t-2xl relative z-20 flex items-center justify-center -mb-[1px] ${isEven ? 'self-start' : 'self-end'}`}>
                      <span className="font-mono text-[10px] font-bold text-blue-400 tracking-widest">MOD_0{i+1}</span>
                    </div>
                    {/* Folder Body */}
                    <SpotlightCard className={`flex-1 p-10 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 bg-black rounded-3xl ${isEven ? 'rounded-tl-none' : 'rounded-tr-none'}`} spotlightColor="rgba(59, 130, 246, 0.1)">
                      <div className="relative z-10">
                        <h3 className="text-4xl 2xl:text-5xl font-black uppercase tracking-tighter mb-6 text-white leading-none">{p.title}</h3>
                        <p className="text-zinc-400 leading-relaxed mb-8 max-w-md font-mono text-sm xl:text-base">{p.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {p.tags.map(t => <span key={t} className="px-2 py-1 border border-white/10 rounded-sm text-xs font-mono text-zinc-400 bg-white/5">{t}</span>)}
                        </div>
                      </div>
                      <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white font-mono text-xs font-bold uppercase hover:text-blue-400 transition-colors w-fit border-b border-white/20 pb-1 mt-auto relative z-10">
                        [ VIEW_SOURCE ]
                      </a>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Right Side: SVGs perfectly isolated to avoid stacking */}
          <div className="w-[55%] h-full flex items-center justify-center relative bg-gradient-to-br from-blue-900/10 to-[#030712] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02]"></div>
            
            <div className="relative w-[90%] max-w-[600px] aspect-square flex items-center justify-center">
              
              {/* 1. Secure Connect: [0, 0.2] */}
              <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]), zIndex: useTransform(scrollYProgress, [0, 0.2], [10, -1]) }}>
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none">
                  <rect x="150" y="200" width="100" height="200" rx="4" stroke="#3b82f6" strokeWidth="4" />
                  <line x1="170" y1="240" x2="230" y2="240" stroke="#3b82f6" strokeWidth="4" />
                  <line x1="170" y1="280" x2="230" y2="280" stroke="#3b82f6" strokeWidth="4" />
                  <line x1="170" y1="320" x2="230" y2="320" stroke="#3b82f6" strokeWidth="4" />
                  <rect x="550" y="220" width="120" height="90" rx="4" stroke="#8b5cf6" strokeWidth="4" />
                  <line x1="610" y1="310" x2="610" y2="350" stroke="#8b5cf6" strokeWidth="4" />
                  <line x1="580" y1="350" x2="640" y2="350" stroke="#8b5cf6" strokeWidth="4" />
                  
                  <motion.path style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }} d="M250 300 L550 300" stroke="#60a5fa" strokeWidth="2" strokeDasharray="10 10" />
                  <motion.circle style={{ cx: useTransform(scrollYProgress, [0, 0.15], [250, 550]) }} cy="300" r="10" fill="#60a5fa" />
                </svg>
              </motion.div>
              
              {/* 2. Banking Vault (ATM Card Insertion): [0.2, 0.4] */}
              <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]), zIndex: useTransform(scrollYProgress, [0.2, 0.4], [10, -1]) }}>
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none">
                  <rect x="250" y="150" width="300" height="400" rx="10" stroke="#10b981" strokeWidth="4" />
                  <rect x="300" y="200" width="200" height="120" rx="5" stroke="#10b981" strokeWidth="2" fill="#030712" />
                  <rect x="300" y="360" width="80" height="80" rx="5" stroke="#10b981" strokeWidth="2" />
                  <circle cx="320" cy="380" r="5" fill="#10b981" /> <circle cx="340" cy="380" r="5" fill="#10b981" /> <circle cx="360" cy="380" r="5" fill="#10b981" />
                  <circle cx="320" cy="400" r="5" fill="#10b981" /> <circle cx="340" cy="400" r="5" fill="#10b981" /> <circle cx="360" cy="400" r="5" fill="#10b981" />
                  <circle cx="320" cy="420" r="5" fill="#10b981" /> <circle cx="340" cy="420" r="5" fill="#10b981" /> <circle cx="360" cy="420" r="5" fill="#10b981" />
                  
                  <rect x="420" y="380" width="80" height="10" rx="2" stroke="#34d399" strokeWidth="4" fill="#030712" />
                  <circle cx="410" cy="385" r="4" fill="#34d399" className="animate-pulse" />
                  
                  <motion.rect style={{ y: useTransform(scrollYProgress, [0.2, 0.25], [0, 190]) }} x="430" y="180" width="60" height="90" rx="4" fill="#3b82f6" />
                  <motion.rect style={{ y: useTransform(scrollYProgress, [0.2, 0.25], [0, 190]) }} x="430" y="190" width="60" height="15" fill="#1e3a8a" />
                  <rect x="415" y="390" width="90" height="120" fill="#030712" />
                </svg>
              </motion.div>
              
              {/* 3. Maze Engine: [0.4, 0.6] */}
              <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]), zIndex: useTransform(scrollYProgress, [0.4, 0.6], [10, -1]) }}>
                <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none">
                  <path d="M10 10 H90 V90 H10 Z" stroke="#3f3f46" strokeWidth="1" />
                  <path d="M30 10 V70 M50 90 V30 M70 10 V70" stroke="#3f3f46" strokeWidth="1" />
                  <motion.path style={{ pathLength: useTransform(scrollYProgress, [0.4, 0.55], [0, 1]) }} d="M20 20 V80 H40 V20 H60 V80 H80 V20" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
  
              {/* 4. Virtual Stock Engine: [0.6, 0.8] */}
              <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]), zIndex: useTransform(scrollYProgress, [0.6, 0.8], [10, -1]) }}>
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none">
                  <line x1="150" y1="200" x2="650" y2="200" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="150" y1="300" x2="650" y2="300" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="150" y1="400" x2="650" y2="400" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="150" y1="500" x2="650" y2="500" stroke="#475569" strokeWidth="4" />
                  
                  <motion.line style={{ pathLength: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]) }} x1="250" y1="200" x2="250" y2="450" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                  <motion.rect style={{ scaleY: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]), originY: "100%" }} x="230" y="280" width="40" height="130" fill="#22c55e" />
                  
                  <motion.line style={{ pathLength: useTransform(scrollYProgress, [0.65, 0.75], [0, 1]) }} x1="400" y1="180" x2="400" y2="380" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                  <motion.rect style={{ scaleY: useTransform(scrollYProgress, [0.65, 0.75], [0, 1]), originY: 0 }} x="380" y="230" width="40" height="120" fill="#ef4444" />
                  
                  <motion.line style={{ pathLength: useTransform(scrollYProgress, [0.7, 0.75], [0, 1]) }} x1="550" y1="120" x2="550" y2="350" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                  <motion.rect style={{ scaleY: useTransform(scrollYProgress, [0.7, 0.75], [0, 1]), originY: "100%" }} x="530" y="200" width="40" height="110" fill="#22c55e" />
                </svg>
              </motion.div>
  
              {/* 5. Web Wireframe (India): [0.8, 1.0] */}
              <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: useTransform(scrollYProgress, [0.8, 0.85, 1, 1], [0, 1, 1, 1]), zIndex: useTransform(scrollYProgress, [0.8, 1], [10, 10]) }}>
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none">
                  <motion.rect style={{ pathLength: useTransform(scrollYProgress, [0.8, 0.95], [0, 1]) }} x="150" y="150" width="500" height="350" stroke="#64748b" strokeWidth="4" rx="8" />
                  <motion.line style={{ pathLength: useTransform(scrollYProgress, [0.8, 0.95], [0, 1]) }} x1="150" y1="190" x2="650" y2="190" stroke="#64748b" strokeWidth="2" />
                  <circle cx="170" cy="170" r="6" stroke="#f43f5e" strokeWidth="2" />
                  <circle cx="190" cy="170" r="6" stroke="#eab308" strokeWidth="2" />
                  <circle cx="210" cy="170" r="6" stroke="#22c55e" strokeWidth="2" />
                  
                  <motion.rect style={{ pathLength: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }} x="180" y="220" width="440" height="100" stroke="#475569" strokeWidth="2" strokeDasharray="5 5" />
                  <motion.rect style={{ pathLength: useTransform(scrollYProgress, [0.88, 0.95], [0, 1]) }} x="180" y="340" width="130" height="130" stroke="#475569" strokeWidth="2" />
                  <motion.rect style={{ pathLength: useTransform(scrollYProgress, [0.90, 0.95], [0, 1]) }} x="335" y="340" width="130" height="130" stroke="#475569" strokeWidth="2" />
                  <motion.rect style={{ pathLength: useTransform(scrollYProgress, [0.92, 0.95], [0, 1]) }} x="490" y="340" width="130" height="130" stroke="#475569" strokeWidth="2" />
                </svg>
              </motion.div>
  
            </div>
          </div>
        </div>
      </div>
      
      {/* MOBILE: Vertical Scroll Stack Effect */}
      <div className="lg:hidden w-full pt-16 px-6 bg-[#030712] relative z-20 pb-32">
        <h2 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-blue-500"></span> Data Modules
        </h2>
        <div className="flex flex-col relative mt-8">
          {projects.map((p, i) => {
            const isEven = i % 2 === 0;
            const pairIndex = Math.floor(i / 2);
            return (
            <div key={i} className="sticky w-full transition-all duration-300 flex flex-col" style={{ top: `${100 + pairIndex * 45}px`, zIndex: i }}>
              {/* Folder Tab */}
              <div className={`h-10 w-28 bg-[#0a0a0a] border-t border-l border-r border-white/10 rounded-t-2xl relative z-20 flex items-center justify-center -mb-[1px] ${isEven ? 'self-start' : 'self-end'}`}>
                <span className="font-mono text-[10px] font-bold text-blue-400 tracking-widest">MOD_0{i+1}</span>
              </div>
              {/* Folder Body */}
              <SpotlightCard className={`p-6 min-h-[35vh] flex flex-col justify-between mb-12 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 bg-black rounded-3xl ${isEven ? 'rounded-tl-none' : 'rounded-tr-none'}`} spotlightColor="rgba(59, 130, 246, 0.1)">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white leading-none">{p.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 font-mono text-sm">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map(t => <span key={t} className="px-2 py-1 border border-white/10 rounded-sm text-xs font-mono text-zinc-400 bg-white/5">{t}</span>)}
                  </div>
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white font-mono text-xs font-bold uppercase hover:text-blue-400 transition-colors w-fit border-b border-white/20 pb-1 mt-auto relative z-10">
                  [ VIEW_SOURCE ]
                </a>
              </SpotlightCard>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 7. CLEAN GLASSMORPHISM UPLINK (Contact)
// ==========================================
const UplinkSection = ({ handleSubmit, formStatus }) => (
  <section id="uplink" className="py-32 px-6 lg:px-12 relative z-10 border-t border-white/5 bg-[#030712]/50 flex justify-center">
    <div className="w-full max-w-4xl text-center">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase text-white">Establish Uplink</motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-zinc-400 text-lg mb-12">Available for technical discussions and engineering roles.</motion.p>
      
      <SpotlightCard className="p-8 md:p-12" spotlightColor="rgba(59, 130, 246, 0.1)">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-300 ml-1">Name</label>
              <input type="text" name="name" required className="w-full bg-black border border-white/10 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 rounded-xl px-5 py-4 text-white transition-all text-sm placeholder-zinc-600" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-zinc-300 ml-1">Email</label>
              <input type="email" name="email" required className="w-full bg-black border border-white/10 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 rounded-xl px-5 py-4 text-white transition-all text-sm placeholder-zinc-600" placeholder="john@company.com" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-bold text-zinc-300 ml-1">Message</label>
            <textarea name="message" rows="5" required className="w-full bg-black border border-white/10 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 rounded-xl px-5 py-4 text-white resize-none transition-all text-sm placeholder-zinc-600" placeholder="Let's build something..."></textarea>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-blue-400 text-sm font-mono">{formStatus}</div>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] uppercase tracking-widest text-sm z-10 transition-all hover:scale-105 active:scale-95">
              Send Transmission
            </button>
          </div>
        </form>
      </SpotlightCard>
    </div>
  </section>
);

// ==========================================
// MAIN APP
// ==========================================
function App() {
  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll(); // Global scroll progress for top bar

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setFormStatus('STATUS: TRANSMITTING...');
    try {
      const response = await fetch('https://formspree.io/f/mlgwwgok', {
        method: 'POST', body: data, headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setFormStatus('STATUS: SUCCESS. TRANSMITTED.'); form.reset(); } 
      else setFormStatus('STATUS: ERROR. TRANSMISSION FAILED.');
    } catch { setFormStatus('STATUS: ERROR. NETWORK OFFLINE.'); }
  };

  return (
    <div className="bg-[#030712] text-white selection:bg-blue-500/30 selection:text-blue-200 min-h-screen relative font-sans">
      
      {/* 1. Interactive Custom Cursor */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      {/* 2. Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-[100]" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Note: RippleGridBackground is now rendered exclusively inside HeroSection */}

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <div id="main-content" className="relative z-10 flex flex-col">
          <SysNav />
          <HeroSection />
          <ProfileSection />
          <ModulesSection />
          <UplinkSection handleSubmit={handleSubmit} formStatus={formStatus} />
          
          <footer className="p-6 border-t border-white/5 flex justify-between font-mono text-xs text-zinc-500 uppercase bg-[#030712] relative z-10">
            <span>&copy; 2026 SMIT PUJARA</span>
            <div className="flex gap-6">
              <a href="https://github.com/smit134" target="_blank" rel="noreferrer" className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GITHUB
              </a>
              <a href="https://www.linkedin.com/in/smitpujara-/" target="_blank" rel="noreferrer" className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LINKEDIN
              </a>
              <a href="https://www.instagram.com/smitpujara" target="_blank" rel="noreferrer" className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                INSTAGRAM
              </a>
            </div>
            <span className="hidden md:inline">SYSTEM ONLINE</span>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;

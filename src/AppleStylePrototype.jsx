import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AppleStylePrototype() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: Hero
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Section 2: Big Text Reveal
  const text1Y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);

  // Section 3: Hardware / Low Level
  const hardwareScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.2]);
  const hardwareOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
  const hardwareTextY = useTransform(scrollYProgress, [0.4, 0.5], [50, 0]);
  
  // Section 4: Projects Grid
  const gridY = useTransform(scrollYProgress, [0.6, 0.8], [200, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="h-[400vh] bg-black text-white relative">
      
      {/* Fixed Viewport for Cinematic Effects */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* HERO */}
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h1 className="text-[12vw] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 to-zinc-700">
            ENGINEER.
          </h1>
          <p className="text-2xl mt-4 text-zinc-500 font-medium tracking-wide">SMIT PUJARA</p>
        </motion.div>

        {/* BIG TEXT REVEAL */}
        <motion.div 
          style={{ y: text1Y, opacity: text1Opacity }}
          className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none"
        >
          <p className="text-5xl md:text-7xl font-semibold max-w-5xl text-center leading-tight tracking-tight text-zinc-100">
            Building logic that <br/>
            <span className="text-zinc-500">powers the unseen.</span>
          </p>
        </motion.div>

        {/* HARDWARE / LOW LEVEL (Mac Pro style) */}
        <motion.div 
          style={{ scale: hardwareScale, opacity: hardwareOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Abstract texture background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-50"></div>
          
          <motion.div style={{ y: hardwareTextY }} className="relative z-10 text-center flex flex-col items-center">
            <div className="w-48 h-48 rounded-full border-[0.5px] border-zinc-700 flex items-center justify-center mb-8 bg-zinc-950 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              <span className="text-6xl font-mono text-zinc-300">C++</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tighter mb-4 text-white">Bare Metal Performance.</h2>
            <p className="text-xl text-zinc-400 max-w-lg">
              Optimized memory management, pointer arithmetic, and algorithmic efficiency at its absolute core.
            </p>
          </motion.div>
        </motion.div>

        {/* PROJECTS GRID */}
        <motion.div 
          style={{ y: gridY, opacity: gridOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-black"
        >
          <h2 className="text-5xl font-bold mb-16 text-center text-white tracking-tighter">Deployed Systems.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            <div className="h-64 rounded-3xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-end overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10"></div>
              <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="text-3xl font-semibold mb-2 text-white">Secure Connect</h3>
                <p className="text-zinc-400">Enterprise messaging system built to master networking.</p>
              </div>
            </div>
            <div className="h-64 rounded-3xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-end overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10"></div>
              <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="text-3xl font-semibold mb-2 text-white">Virtual Stock Engine</h3>
                <p className="text-zinc-400">Multi-threaded Java application simulating real-time market data.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

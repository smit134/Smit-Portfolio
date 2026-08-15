import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ZAxisPrototype() {
  const containerRef = useRef(null);
  
  // The scroll progress of the entire container (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate Z translations for different layers
  // Layer 1 starts at 0, moves towards camera (positive Z)
  const layer1Z = useTransform(scrollYProgress, [0, 0.33], [0, 1000]);
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);

  // Layer 2 starts far away (-1000), comes to 0, then passes camera
  const layer2Z = useTransform(scrollYProgress, [0, 0.33, 0.66], [-1000, 0, 1000]);
  const layer2Opacity = useTransform(scrollYProgress, [0.1, 0.33, 0.58, 0.66], [0, 1, 1, 0]);

  // Layer 3 starts even further (-2000), comes to 0 at the end
  const layer3Z = useTransform(scrollYProgress, [0.33, 0.66, 1], [-2000, -1000, 0]);
  const layer3Opacity = useTransform(scrollYProgress, [0.4, 0.66, 0.9, 1], [0, 1, 1, 1]);

  return (
    <div ref={containerRef} className="h-[400vh] bg-neutral-950">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* Layer 1: Surface (UI/Frontend) */}
        <motion.div 
          style={{ z: layer1Z, opacity: layer1Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center transform-gpu"
        >
          <div className="p-12 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
            <h1 className="text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-4">
              Smit Pujara
            </h1>
            <p className="text-xl text-neutral-400 font-medium">Systems Engineer. Diving deeper.</p>
            <div className="mt-8 text-sm text-neutral-600 animate-pulse">Scroll to dive into the architecture ↓</div>
          </div>
        </motion.div>

        {/* Layer 2: Application / Object-Oriented */}
        <motion.div 
          style={{ z: layer2Z, opacity: layer2Opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu"
        >
          <div className="w-[80vw] max-w-4xl grid grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-blue-400 mb-4">Java Engine</h2>
              <p className="text-neutral-300">Multi-threaded applications, Virtual Stock Engine simulating real-time market data.</p>
            </div>
            <div className="p-8 rounded-2xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-purple-400 mb-4">Architecture</h2>
              <p className="text-neutral-300">Resilient client-server models, efficient data routing, and concurrent processing.</p>
            </div>
          </div>
        </motion.div>

        {/* Layer 3: The Core (C++ / Memory) */}
        <motion.div 
          style={{ z: layer3Z, opacity: layer3Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transform-gpu"
        >
          <div className="relative">
            {/* Glowing orb representing the core */}
            <div className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 p-12 rounded-full border border-red-500/30 bg-black/50 backdrop-blur-3xl flex flex-col items-center text-center w-[400px] h-[400px] justify-center">
              <h2 className="text-4xl font-bold text-red-500 mb-2">The Metal</h2>
              <p className="text-neutral-400 font-mono text-sm">C / C++</p>
              <div className="mt-6 space-y-2 text-left w-full text-xs font-mono text-neutral-500 bg-black/50 p-4 rounded-lg">
                <div>{`> malloc(sizeof(Logic))`};</div>
                <div>{`> Pointer arithmetic optimized.`}</div>
                <div>{`> Memory safe.`}</div>
                <div className="text-red-400 mt-2">Low-Level System Design.</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      
    </div>
  );
}

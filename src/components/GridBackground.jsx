import React from 'react';
import { motion } from 'framer-motion';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#030712] overflow-hidden pointer-events-none">
      
      {/* 1. Subtle Static Noise for Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }}></div>

      {/* 2. Technical Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Thicker Major Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 2px, transparent 2px),
            linear-gradient(to bottom, #3b82f6 2px, transparent 2px)
          `,
          backgroundSize: '200px 200px'
        }}
      />

      {/* 3. Deep Ambient Glow for Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>

      {/* 4. The "Awe" Scanline Animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_20px_4px_rgba(59,130,246,0.5)] opacity-50"
        animate={{
          y: ['-10%', '110%'],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 6,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Horizontal fade to hide hard edges of the grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] opacity-80"></div>
    </div>
  );
};

export default GridBackground;

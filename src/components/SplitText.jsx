import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SplitText = ({
  text,
  className = "",
  delay = 0,
  animationType = "letter",
  once = true,
  ease = [0.77, 0, 0.175, 1],
  duration = 0.8,
  stagger = 0.05
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const elements = animationType === "letter" ? text.split("") : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: duration,
        ease: ease,
      },
    },
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        type: "tween",
        duration: duration,
        ease: ease,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {elements.map((el, index) => (
        <span key={index} className="overflow-hidden inline-block">
          <motion.span className="inline-block" variants={child}>
            {el === " " ? "\u00A0" : el}
          </motion.span>
          {animationType === "word" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.div>
  );
};

export default SplitText;

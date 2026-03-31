"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-[72px] left-0 right-0 h-1.5 bg-brand-cyan z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
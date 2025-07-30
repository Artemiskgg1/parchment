"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 20]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/Hero.jpg')",
        }}
      />

      {/* Sticky white screen with BURN cutout */}
      <div className="sticky top-0 z-10 overflow-hidden">
        <motion.div
          className="w-full h-screen flex items-center justify-center"
          style={{
            scale: smoothScale,
            opacity: smoothOpacity,
            backgroundColor: "white",
            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cmask id='textMask'%3E%3Crect width='1920' height='1080' fill='white'/%3E%3Ctext x='960' y='590' text-anchor='middle' font-family='Arial Black, sans-serif' font-weight='900' font-size='200' fill='black'%3EABHA%3C/text%3E%3C/mask%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='white' mask='url(%23textMask)'/%3E%3C/svg%3E")`,
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cmask id='textMask'%3E%3Crect width='1920' height='1080' fill='white'/%3E%3Ctext x='960' y='590' text-anchor='middle' font-family='Arial Black, sans-serif' font-weight='900' font-size='200' fill='black'%3EABHA%3C/text%3E%3C/mask%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='white' mask='url(%23textMask)'/%3E%3C/svg%3E")`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;

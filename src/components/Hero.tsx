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

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // Enhanced top text animations - moves up then fades
  const topTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4],
    [1, 1, 0]
  );
  const smoothTopTextOpacity = useSpring(topTextOpacity, {
    stiffness: 120,
    damping: 25,
  });

  // Enhanced bottom text animations - moves down then fades
  const bottomTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4],
    [1, 1, 0]
  );
  const smoothBottomTextOpacity = useSpring(bottomTextOpacity, {
    stiffness: 120,
    damping: 25,
  });

  // Movement animations - top goes up, bottom goes down (increased distance)
  const topTextY = useTransform(scrollYProgress, [0, 0.4], [0, -250]);
  const bottomTextY = useTransform(scrollYProgress, [0, 0.4], [0, 200]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-white">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/Hero.jpg')",
        }}
      />

      <div className="sticky top-0 z-10 overflow-hidden h-screen">
        {/* Top Paragraphs - Moves UP and fades */}
        <motion.div
          className="absolute top-16 left-0 right-0 z-30 pointer-events-none"
          style={{
            opacity: smoothTopTextOpacity,
            y: topTextY,
          }}
        >
          <div className="text-center max-w-lg mx-auto px-8">
            <div className="text-sm font-unigeo leading-relaxed space-y-5 mt-18 font-medium tracking-wide text-black">
              <p className="drop-shadow-sm">I'm Abha — also Artemis.</p>
              <p className="drop-shadow-sm">
                The sky made me dream, and that's where I keep looking. There's
                something about it - so vast, so still - it pulls me away from
                the noise of the world.
              </p>
              <p className="drop-shadow-sm">
                The stars? Breathtaking. They give me space to feel free.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ABHA Mask - Enhanced positioning */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{
            scale: smoothScale,
            opacity: smoothOpacity,
            backgroundColor: "#dfdff2",
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

        {/* Bottom Paragraphs - Moves DOWN and fades */}
        <motion.div
          className="absolute bottom-36 left-0 right-0 z-30 pointer-events-none"
          style={{
            opacity: smoothBottomTextOpacity,
            y: bottomTextY,
          }}
        >
          <div className="text-center max-w-xl mx-auto px-8">
            <div className="text-sm font-unigeo leading-relaxed space-y-5 font-medium tracking-wide text-black">
              <p className="drop-shadow-sm">
                No matter how chaotic life gets, the sky never changes. Whether
                I'm here or far away, it's always there - calm, open, infinite.
              </p>
              <p className="drop-shadow-sm">
                The sky reminds me to dream - and live like I mean it.
              </p>
              <p className="drop-shadow-sm">Hope. Optimism. Possibility.</p>
              <p className="drop-shadow-sm">I look up, and I feel it.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

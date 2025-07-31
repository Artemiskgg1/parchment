"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 8, 25]);
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 50 });

  const maskOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
  const smoothMaskOpacity = useSpring(maskOpacity, {
    stiffness: 100,
    damping: 30,
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const smoothTextOpacity = useSpring(textOpacity, {
    stiffness: 120,
    damping: 25,
  });

  const welcomeY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const smoothWelcomeY = useSpring(welcomeY, { stiffness: 100, damping: 25 });
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const smoothWelcomeOpacity = useSpring(welcomeOpacity, {
    stiffness: 150,
    damping: 30,
  });

  const leftImageY = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const rightImageY = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const sideImagesOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/Hero.jpg')",
          filter: "contrast(1.1) saturate(1.2) brightness(1.1)",
        }}
      />

      <motion.div
        className="fixed left-0 top-0 bottom-0 z-15 hidden lg:block w-32"
        style={{ y: leftImageY, opacity: sideImagesOpacity }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <div className="relative h-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-xl"></div>
          <img
            src="/images/anime-strip-1.jpg"
            alt="Left decorative image"
            className="w-full h-full object-cover shadow-2xl group-hover:scale-[1.02] transition-all duration-700 ease-out filter brightness-110 contrast-105 saturate-110"
            style={{
              clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20"
            style={{
              clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
            style={{
              clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 border-r border-white/30"
            style={{
              clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </div>
      </motion.div>

      <motion.div
        className="fixed right-0 top-0 bottom-0 z-15 hidden lg:block w-32"
        style={{ y: rightImageY, opacity: sideImagesOpacity }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <div className="relative h-full group">
          <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent blur-xl"></div>
          <img
            src="/images/dev-strip-2.jpg"
            alt="Right decorative image"
            className="w-full h-full object-cover shadow-2xl group-hover:scale-[1.02] transition-all duration-700 ease-out filter brightness-110 contrast-105 saturate-110"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/20"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 border-l border-white/30"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </div>
      </motion.div>

      <div className="sticky top-0 z-10 overflow-hidden h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-30 mb-4"
          style={{ y: smoothWelcomeY, opacity: smoothWelcomeOpacity }}
        >
          <p className="text-[10px] tracking-[0.25em] text-black uppercase mt-[-10rem] font-clephons">
            Welcome to my lair
            <br />I Am
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ scale: smoothScale, opacity: smoothMaskOpacity }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: "#dfdff2",
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cmask id='textMask'%3E%3Crect width='1920' height='1080' fill='white'/%3E%3Ctext x='960' y='590' text-anchor='middle' font-family='Arial Black, sans-serif' font-weight='900' font-size='240' fill='black' letter-spacing='20'%3EABHA%3C/text%3E%3C/mask%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='white' mask='url(%23textMask)'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cmask id='textMask'%3E%3Crect width='1920' height='1080' fill='white'/%3E%3Ctext x='960' y='590' text-anchor='middle' font-family='Arial Black, sans-serif' font-weight='900' font-size='240' fill='black' letter-spacing='20'%3EABHA%3C/text%3E%3C/mask%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='white' mask='url(%23textMask)'/%3E%3C/svg%3E")`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 z-30 pb-8 px-8 mb-10"
          style={{ opacity: smoothTextOpacity }}
        >
          <div className="max-w-6xl mx-auto">
            {/* ALIGNED COLUMN TEXT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid md:grid-cols-2 gap-6 text-black/95 items-start"
            >
              <div className="font-unigeo space-y-3">
                <div className="min-h-[4.5rem]">
                  <p className="text-xs leading-relaxed font-light tracking-wide">
                    The sky has always been my sanctuary. Ever since I was
                    little, it's been a quiet reminder that no matter where I am
                    or how hard life gets, the sky stays the same. Constant.
                    Beautiful. Untouched.
                  </p>
                </div>
                <div className="min-h-[4.5rem]">
                  <p className="text-xs leading-relaxed font-extralight tracking-wide">
                    There's something magical about the clouds. They make me
                    feel like a child again — someone who can still dream
                    freely, believe deeply, and move forward with hope. The sky
                    fills me with optimism.
                  </p>
                </div>
                <div className="min-h-[4.5rem]">
                  <p className="text-xs leading-relaxed font-extralight tracking-wide ">
                    It gives me courage. Like the birds that glide through it, I
                    feel free. Free to chase my dreams, with no attachments
                    holding me back.
                  </p>
                </div>
              </div>
              <div className="font-unigeo space-y-3">
                <div className="min-h-[4.5rem]">
                  <p className="text-xs leading-relaxed font-light tracking-wide italic">
                    Even my spiritual path began with the sky. The first time I
                    saw the Milky Way from my village in the mountains of
                    Uttarakhand, I cried. It was breathtaking. That moment
                    shaped me. The sky didn't just inspire me — it became where
                    I draw my strength from.
                  </p>
                </div>
                <div className="min-h-[4.5rem]">
                  <p className="text-xs leading-relaxed font-extralight tracking-wide ">
                    Every sunrise brings new possibilities, every sunset teaches
                    me to let go. The endless expanse above reminds me that
                    there are no limits to what we can achieve when we dare to
                    look up and dream big.
                  </p>
                </div>
                <div className="min-h-[4.5rem]">
                  <p className="text-xs leading-relaxed font-extralight tracking-wide ">
                    This is why I create, why I explore, why I never stop
                    reaching for the stars that first called to me from those
                    mountain peaks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-8 w-px h-32 bg-black/20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-8 w-px h-32 bg-black/20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
      </div>
    </section>
  );
};

export default Hero;

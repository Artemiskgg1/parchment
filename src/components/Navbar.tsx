"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigRightDash, Github } from "lucide-react";

export const ZentryNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsAtTop(window.scrollY < 50);
    setLastScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 50);

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    const handleClickToEnableSound = () => {
      if (!hoverSoundRef.current) {
        hoverSoundRef.current = new Audio("/sounds/button-hover-click.mp3");
      }
      setSoundEnabled(true);
      document.removeEventListener("click", handleClickToEnableSound);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClickToEnableSound);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickToEnableSound);
    };
  }, [lastScrollY, isMounted]);

  const navItems = [
    { name: "HOME", href: "#home" },
    {
      name: "PROLOGUE",
      href: "#about",
      icon: <ArrowBigRightDash size={14} className="inline ml-1 mb-0.5" />,
    },
    {
      name: "PROJECTS",
      href: "#projects",
      icon: <ArrowBigRightDash size={14} className="inline ml-1 mb-0.5" />,
    },
    {
      name: "GITHUB",
      href: "https://github.com/",
      icon: <Github size={14} className="inline ml-1 mb-0.5" />,
    },
  ];

  const playHoverSound = () => {
    if (soundEnabled && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  if (!isMounted) return null;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-2 py-2"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`rounded-md px-6 py-2 backdrop-blur-sm transition-colors duration-300 ${
          isAtTop
            ? "border-black/20 bg-[#dfdff2]/60"
            : "border-white/20 bg-black"
        }`}
      >
        <div className="flex items-center justify-between font-unigeo relative">
          {/* Logo */}
          <Link href="/" className="relative block h-9 w-9 mb-2">
            <Image
              src={
                isAtTop
                  ? "/images/arte-logo-black.png"
                  : "/images/arte-logo-inner.png"
              }
              alt="Artemis Logo"
              width={27}
              height={27}
              className="object-contain hover:animate-spin-slower"
              priority
            />
          </Link>

          {/* Nav */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name === "GITHUB" ? "_blank" : "_self"}
                  onMouseEnter={playHoverSound}
                  className={`text-xs font-bold tracking-wider px-3 py-2 rounded-full transition-all duration-300 flex items-center gap-1 ${
                    isAtTop
                      ? "text-black hover:text-black hover:bg-white"
                      : "text-white hover:text-black hover:bg-white"
                  }`}
                >
                  {item.name}
                  {item.icon && item.icon}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isAtTop ? "text-black" : "text-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Items */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2 font-unigeo">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.name === "GITHUB" ? "_blank" : "_self"}
                onMouseEnter={playHoverSound}
                className={`text-sm font-medium tracking-wider px-3 py-2 rounded-full transition-colors duration-300 flex items-center gap-1 ${
                  isAtTop
                    ? "text-black/70 hover:text-black hover:bg-white"
                    : "text-white/70 hover:text-black hover:bg-white"
                }`}
              >
                {item.name}
                {item.icon && item.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default ZentryNavbar;

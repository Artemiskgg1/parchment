"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // shadcn button

export const ZentryNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMounted]);

  const navItems = [
    { name: "NEXUS", href: "#nexus" },
    { name: "VAULT", href: "#vault" },
    { name: "PROLOGUE", href: "#prologue" },
    { name: "ABOUT", href: "#about" },
    { name: "CONTACT", href: "#contact" },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-2 py-2"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`rounded-md  px-6 py-3 backdrop-blur-sm transition-colors duration-300 ${
          isAtTop ? "border-black/20 bg-white/60" : "border-white/20 bg-black"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className={`font-bold text-xl tracking-wider transition-colors duration-300 ${
              isAtTop ? "text-black" : "text-white"
            }`}
          >
            ZENTRY
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
                  isAtTop
                    ? "text-black hover:text-black"
                    : "text-white hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
            ENTER GAME
          </Button>

          {/* Mobile Menu Button */}
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

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wider px-2 py-1 rounded transition-colors duration-300 ${
                  isAtTop
                    ? "text-black/70 hover:text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default ZentryNavbar;

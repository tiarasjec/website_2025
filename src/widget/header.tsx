"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle resize events to ensure proper responsive behavior
  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e:any) => {
      if (!e.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);
  
  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/rules", label: "Rules" },
  ];

  if (!isMounted) return null; // Prevent hydration issues

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <nav className="w-full bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <a href="/" className="text-xl sm:text-2xl font-serif text-white tracking-wider hover:text-gray-200 transition-colors">
                Brand
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center">
              <div className="flex space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-200 hover:text-white px-2 py-1 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Register Button */}
            <div className="hidden md:block">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded-md text-sm font-medium text-white bg-white/5 hover:bg-white/15 backdrop-blur-lg transition-all shadow-sm"
              >
                Register
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Using absolute positioning for better overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-xl shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 pb-3">
                <a
                  href="/register"
                  className="block w-full text-center px-4 py-3 border border-white/20 rounded-md font-medium text-white bg-white/5 hover:bg-white/15 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
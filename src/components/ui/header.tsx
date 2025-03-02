"use client"

import Wave from "react-wavify"
import { tiaraFont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export const Header = () => {
  // State to store wave parameters
  const [waveParams, setWaveParams] = useState({
    height: 40,
    amplitude: 20,
    speed: 0.15,
    points: 7
  });

  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Update wave parameters based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint in Tailwind
        setWaveParams({
          height: 15, // smaller height for mobile
          amplitude: 10, // smaller amplitude for mobile
          speed: 0.15,
          points: 3// fewer points for mobile (smoother)
        });
      } else if (window.innerWidth < 1024) { // md breakpoint
        setWaveParams({
          height: 25,
          amplitude: 18,
          speed: 0.15,
          points: 5
        });
      } else { // large screens
        setWaveParams({
          height: 30,
          amplitude: 20,
          speed: 0.15,
          points: 7
        });
      }
    };

    // Set initial parameters
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Close menu when resizing to desktop
    const handleResizeForMenu = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResizeForMenu);
    
    // Prevent scrolling when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResizeForMenu);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 w-full">
      <Wave
        fill="url(#gradient)"
        paused={false}
        style={{ display: "flex", opacity: 0.8, transform: "rotate(180deg)" }}
        options={{
          height: waveParams.height,
          amplitude: waveParams.amplitude,
          speed: waveParams.speed,
          points: waveParams.points,
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B0000" />
            <stop offset="50%" stopColor="#000000" />
          </linearGradient>
        </defs>
      </Wave>
      
      {/* Text container positioned above the wave */}
      <div className="absolute inset-x-0 top-0 z-10 flex flex-row justify-between items-center p-4 w-full">
        {/* Logo and Name - positioned on the left */}
        <div className="flex order-1">
          <ul className="flex text-white items-center">
            <li className={cn("tracking-widest", tiaraFont.className)}>
              <span className="text-white transition-colors duration-500 hover:text-red-400">Ti</span>
              <span className="text-red-500 transition-colors duration-500 hover:text-white">ar</span>
              <span className="text-white transition-colors duration-500 hover:text-red-400">a</span>
              <span className="text-red-500 transition-colors duration-500 hover:text-white">&apos;</span>
              <span className="text-white transition-colors duration-500 hover:text-red-400">25</span>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu Button (visible on small screens) */}
        <div className="flex md:hidden order-2 ml-auto">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={24} className="animate-spin-once" />
            ) : (
              <Menu size={24} className="transform transition-transform duration-300 hover:rotate-12" />
            )}
          </button>
        </div>

        {/* Desktop Navigation - Original layout for larger screens */}
        <div className="hidden md:block order-2 ml-auto">
          <ul className={cn("flex flex-wrap justify-end text-white items-center tracking-wider", tiaraFont.className)}>
            <li className="mx-2 hover:text-red-600 text-sm relative group">
              <a href="#Home" className="transition-colors duration-300 ease-in-out">home</a>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="mx-2 hover:text-red-600 text-sm relative group">
              <a href="#About" className="transition-colors duration-300 ease-in-out">about</a>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="mx-2 hover:text-red-600 text-sm relative group">
              <a href="#Events" className="transition-colors duration-300 ease-in-out">events</a>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="mx-2 hover:text-red-600 text-sm relative group">
              <a href="#Schedule" className="transition-colors duration-300 ease-in-out">schedule</a>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="mx-2 text-sm">
              <button
                onClick={() => {}}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:scale-95"
              >
                rulebook
              </button>
            </li>
            <li className="mx-2 text-sm">
              <button
                onClick={() => {}}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:scale-95"
              >
                register
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu (animated slide-in) */}
        <div 
          className={`fixed inset-0 top-16 bg-black bg-opacity-95 z-20 transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className={cn("flex flex-col w-full h-full py-8 px-6 space-y-6 text-white overflow-auto tracking-wider", tiaraFont.className)}>
            <li className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "100ms" }}>
              <a href="#Home" onClick={toggleMenu} className="text-lg font-semibold block">home</a>
            </li>
            <li className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "150ms" }}>
              <a href="#About" onClick={toggleMenu} className="text-lg font-semibold block">about</a>
            </li>
            <li className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "200ms" }}>
              <a href="#Events" onClick={toggleMenu} className="text-lg font-semibold block">events</a>
            </li>
            <li className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "250ms" }}>
              <a href="#Schedule" onClick={toggleMenu} className="text-lg font-semibold block">schedule</a>
            </li>
            <li className="flex justify-center pt-4"
                style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "300ms" }}>
              <button
                onClick={() => {toggleMenu()}}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:scale-95 text-lg"
              >
                rulebook
              </button>
            </li>
            <li className="flex justify-center pt-4"
                style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "350ms" }}>
              <button
                onClick={() => {toggleMenu()}}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-md shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:scale-95 text-lg"
              >
                register
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}



export default Header
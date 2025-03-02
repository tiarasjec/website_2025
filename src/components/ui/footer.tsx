"use client"

import Wave from "react-wavify"
import { tiaraFont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const Footer = () => {
  // State to store wave parameters
  const [waveParams, setWaveParams] = useState({
    height: 40,
    amplitude: 20,
    speed: 0.15,
    points: 7
  });

  // Update wave parameters based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint in Tailwind
        setWaveParams({
          height: 25, // smaller height for mobile
          amplitude: 10, // smaller amplitude for mobile
          speed: 0.15,
          points: 3// fewer points for mobile (smoother)
        });
      } else if (window.innerWidth < 1024) { // md breakpoint
        setWaveParams({
          height: 35,
          amplitude: 18,
          speed: 0.15,
          points: 5
        });
      } else { // large screens
        setWaveParams({
          height: 40,
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
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full">
      {/* Text container positioned above the wave */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col sm:flex-row sm:justify-between items-center p-4 text-center w-full">
        {/* Logo and Copyright */}
        <ul className="flex text-white items-center mb-3 sm:mb-0">
          <li className={cn("tracking-widest", tiaraFont.className)}>
            <span className="text-white">Ti</span>
            <span className="text-red-500">ar</span>
            <span className="text-white">a</span>
            <span className="text-red-500">&apos;</span>
            <span className="text-white">25</span>
          </li>
          <li className="mx-2 sm:mx-4 text-xl sm:text-2xl">|</li>
          <li className="text-sm sm:text-base">&copy;{new Date().getFullYear()} SJEC</li>
        </ul>

        {/* For desktop: Original layout */}
        <ul className="hidden sm:flex flex-wrap justify-end text-white items-center">
          <li className="mx-2 sm:mx-4">
            <a
              href="#instagram"
              className="text-white hover:text-pink-500 transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </li>
          <li className="mx-2 sm:mx-4">
            <a
              href="#website"
              className="text-white hover:text-blue-500 transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Website"
            >
              <i className="fas fa-globe text-xl"></i>
            </a>
          </li>
          <li className="mx-2 sm:mx-4">
            <a
              href="mailto:contact@example.com"
              className="text-white hover:text-red-500 transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Email"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </li>
          <li className="mx-2 sm:mx-4">
            <a
              href="tel:+1234567890"
              className="text-white hover:text-green-500 transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Phone"
            >
              <i className="fas fa-phone text-xl"></i>
            </a>
          </li>
          <li className="mx-2 text-xl sm:text-2xl">|</li>
          <li className="mx-2 hover:text-red-600 text-lg">
            <a href="#About">Privacy Policy</a>
          </li>
          <li className="mx-2 hover:text-red-600 text-lg">
            <a href="#Support">Terms & Condition</a>
          </li>
          <li className="mx-2 hover:text-red-600 text-lg">
            <a href="#PrivacyPolicy">Refund</a>
          </li>
        </ul>

        {/* For mobile: Two-row layout */}
        <div className="flex sm:hidden flex-col w-full text-white">
          {/* Social Media Row */}
          <ul className="flex justify-center gap-5 mb-3">
            <li>
              <a
                href="#instagram"
                className="text-white hover:text-pink-500 transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-base"></i>
              </a>
            </li>
            <li>
              <a
                href="#website"
                className="text-white hover:text-blue-500 transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Website"
              >
                <i className="fas fa-globe text-base"></i>
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@example.com"
                className="text-white hover:text-red-500 transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Email"
              >
                <i className="fas fa-envelope text-base"></i>
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="text-white hover:text-green-500 transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Phone"
              >
                <i className="fas fa-phone text-base"></i>
              </a>
            </li>
          </ul>
          
          {/* Policy Links Row */}
          <ul className="flex justify-center gap-3 text-sm">
            <li className="hover:text-red-600">
              <a href="#About">Privacy Policy</a>
            </li>
            <li className="hover:text-red-600">
              <a href="#Support">Terms & Condition</a>
            </li>
            <li className="hover:text-red-600">
              <a href="#PrivacyPolicy">Refund</a>
            </li>
          </ul>
        </div>
      </div>

      <Wave
        fill="url(#gradient)"
        paused={false}
        style={{ display: "flex", opacity: 0.8 }}
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
    </footer>
  )
}

export default Footer
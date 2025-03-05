"use client"

import Wave from "react-wavify"
import { tiaraFont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Instagram, Globe, Mail, Phone } from "lucide-react"

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
          height: 10, // smaller height for mobile
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
    <footer className="relative bottom-0 w-full">
      {/* Wave background */}
      <div className="relative w-full">
        <Wave
          fill="url(#gradient)"
          paused={false}
          style={{ display: "flex", opacity: 0.5 }}
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
      </div>

      {/* Text container positioned above the wave with proper z-index */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col sm:flex-row sm:justify-between items-center p-4 text-center w-full">
        {/* Logo and Copyright */}
        <ul className="flex text-white items-center mb-3 sm:mb-0">
          <li className={cn("tracking-widest", tiaraFont.className)}>
            <span className="text-white">Ti</span>
            <span className="text-[#EB1C2C]">ar</span>
            <span className="text-white">a</span>
            <span className="text-[#EB1C2C]">&apos;</span>
            <span className="text-white">25</span>
          </li>
          <li className="mx-2 sm:mx-4 text-xl sm:text-2xl">|</li>
          <li className="text-sm sm:text-base">© Developed by <a className="hover:text-[#EB1C2C] cursor-pointer" href="https://gdg.community.dev/gdg-on-campus-st-joseph-engineering-college-mangaluru-india/">Google DG SJEC</a></li>
        </ul>

        {/* For desktop: Original layout */}
        <ul className="hidden sm:flex flex-wrap justify-end text-white items-center">
          <li className="mx-2 sm:mx-4">
            <a
              href="https://www.instagram.com/tiarasjec/"
              className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Instagram"
            >
              <Instagram size={21} />
            </a>
          </li>
          <li className="mx-2 sm:mx-4">
            <a
              href="https://sjec.ac.in/"
              className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Website"
            >
              <Globe size={21} />
            </a>
          </li>
          <li className="mx-2 sm:mx-4">
            <a
              href="mailto:tiarasjec@sjec.ac.in"
              className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Email"
            >
              <Mail size={21} />
            </a>
          </li>
          <li className="mx-2 sm:mx-4">
            <a
              href="tel:+91 8867656481 "
              className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
              aria-label="Phone"
            >
              <Phone size={21} />
            </a>
          </li>
          <li className="mx-2 text-xl sm:text-2xl">|</li>
          <li className="mx-2 hover:text-[#EB1C2C] text-sm sm:text-base">
            <a href="#About">Privacy Policy</a>
          </li>
          <li className="mx-2 hover:text-[#EB1C2C] text-sm sm:text-base">
            <a href="#Support">Terms & Conditions</a>
          </li>
          <li className="mx-2 hover:text-[#EB1C2C] text-sm sm:text-base">
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
                className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </li>
            <li>
              <a
                href="#website"
                className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@example.com"
                className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="text-white hover:text-[#EB1C2C] transition-all duration-200 transform hover:scale-110 inline-block"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </li>
          </ul>
          
          {/* Policy Links Row */}
          <ul className="flex justify-center gap-3 text-sm">
            <li className="hover:text-[#EB1C2C]">
              <a href="#About">Privacy Policy</a>
            </li>
            <li className="hover:text-[#EB1C2C]">
              <a href="#Support">Terms & Conditions</a>
            </li>
            <li className="hover:text-[#EB1C2C]">
              <a href="#PrivacyPolicy">Refund</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
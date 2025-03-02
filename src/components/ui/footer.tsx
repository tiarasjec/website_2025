import Wave from "react-wavify"
 
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full">
      {/* Text container positioned above the wave */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-between items-center p-4 text-center text-lg w-full">
        <ul className="flex text-white items-center">
          <li className={cn("tracking-widest", tiaraFont.className)}>
            <span className="text-white">Ti</span>
            <span className="text-red-500">ar</span>
            <span className="text-white">a</span>
            <span className="text-red-500">&apos;</span>
            <span className="text-white">25</span>
          </li>
          <li className="mx-4 text-2xl">|</li>
          <li>&copy;{new Date().getFullYear()} SJEC</li>
        </ul>

        {/* Social Media Icons */}
        <ul className="flex text-white items-center">
          <li className="mx-4">
            <a
              href="#instagram"
              className="text-white hover:text-pink-500 transition-all duration-200 transform hover:scale-110 inline-block"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </li>
          <li className="mx-4">
            <a
              href="#website"
              className="text-white hover:text-blue-500 transition-all duration-200 transform hover:scale-110 inline-block"
            >
              <i className="fas fa-globe text-2xl"></i>
            </a>
          </li>
          <li className="mx-4">
            <a
              href="mailto:contact@example.com"
              className="text-white hover:text-red-500 transition-all duration-200 transform hover:scale-110 inline-block"
            >
              <i className="fas fa-envelope text-2xl"></i>
            </a>
          </li>
          <li className="mx-4">
            <a
              href="tel:+1234567890"
              className="text-white hover:text-green-500 transition-all duration-200 transform hover:-scale-110 inline-block"
            >
              <i className="fas fa-phone text-2xl"></i>
            </a>
          </li>
          <li className="mx-2 text-2xl">|</li>
          <li className="mx-2 hover:text-red-600 text-xl">
            <a href="#About" >
              Privacy Policy
            </a>
          </li>
          <li className="mx-2 hover:text-red-600 text-xl">
            <a href="#Support" >
              Terms & Condition
            </a>
          </li>
          <li className="mx-2 hover:text-red-600 text-xl">
            <a href="#PrivacyPolicy">
              Refund
            </a>
          </li>
        </ul>
      </div>

      <Wave
        fill="url(#gradient)"
        paused={false}
        style={{ display: "flex", }}
        options={{
          height: 40,
          amplitude: 20,
          speed: 0.15,
          points: 7,
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


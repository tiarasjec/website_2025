"use client"
import { cn } from "@/lib/utils"
import { tiaraFont } from "@/lib/fonts"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useAnimationControls, useScroll, useTransform } from "framer-motion"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const particlesControls = useAnimationControls()

  // Scroll animation setup with modified offset for slower animation
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"]
  })
  
  // Modify the scroll mapping to make the animation slower and more gradual
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  
  // Adjust the opacity transition to match the slower animation
  const pathOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 0.8, 0.8, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)

        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error("Error playing video:", error)
          })

          // Animate particles when in view
          particlesControls.start("animate")
        } else if (videoRef.current) {
          videoRef.current.pause()
          particlesControls.start("hidden")
        }
      },
      { threshold: 0.1 }, // Lower threshold to trigger earlier
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [particlesControls])

  const handleVideoLoaded = () => {
    setIsLoaded(true)
  }

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div 
      ref={wrapperRef} 
      className="relative flex items-center justify-center h-[90vh] p-6 perspective-1000"
    >
       <div className={cn("flex flex-wrap flex-col items-center text-3xl sm:text-5xl md:text-7xl justify-center text-center sm:text-left transition hover:scale-110 ease-out duration-300", tiaraFont.className)}>
              Glimps of Tiara 2024
              </div>
      {/* SVG Background with the new path you provided */}
      <motion.svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none" 
        viewBox="0 0 4437 2113" 
        preserveAspectRatio="none"
        style={{ opacity: pathOpacity }}
      >
        <motion.path 
          d="M1 1C1766.5 275 1484 1311.23 1133 1001.73C782 692.227 555.5 2073.73 1707 1272C2858.5 470.274 4228.5 -40.5001 3171.5 1264C2114.5 2568.5 3752 1956 4436.5 2040.5" 
          stroke="white" 
          strokeWidth={30}
          fill="none"
          style={{ pathLength }}
        />
      </motion.svg>
      
      <AnimatePresence>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.7, rotateY: -15, z: -200 }}
          animate={{
            opacity: isInView ? 1 : 0.3,
            scale: isInView ? (isHovered ? 1.05 : 1) : 0.7,
            rotateY: isInView ? (isHovered ? 5 : 0) : -15,
            z: isInView ? 0 : -200,
          }}
          transition={{
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1], // Custom cubic-bezier for smoother motion
            scale: {
              duration: isHovered ? 0.5 : 1.2,
              ease: "easeOut",
            },
          }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl transform-gpu"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isInView
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px 5px rgba(255, 0, 0, 0.3)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Animated border with glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-blue-600"
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              background: isHovered
                ? "linear-gradient(90deg, #ff0080, #7928ca, #0070f3, #ff0080)"
                : "linear-gradient(90deg, #ff0000, #ffffff, #ff0000)",
            }}
            transition={{
              opacity: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
              background: { duration: 0.8 },
            }}
            style={{
              zIndex: -1,
              backgroundSize: isHovered ? "300% 100%" : "200% 100%",
              animation: isHovered ? "gradient-shift 8s linear infinite" : "none",
            }}
          />

          {/* Video container with padding for border effect */}
          <div className="p-1 rounded-xl overflow-hidden relative">
            {/* Video element */}
            <motion.video
              ref={videoRef}
              onLoadedData={handleVideoLoaded}
              className="w-full h-full object-cover rounded-lg"
              initial={{ scale: 1.2, filter:"" }}
              animate={{
                scale: isInView ? (isHovered ? 1.1 : 1) : 1.2,
                // filter: isLoaded ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              autoPlay={isInView}
              loop
              muted
              playsInline
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </motion.video>

            {/* Overlay gradient with enhanced effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isInView ? 0.8 : 0,
                background: isHovered
                  ? "linear-gradient(to top, rgba(0,0,0,0.9), rgba(20,0,40,0.4), transparent)"
                  : "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)",
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white/30 pointer-events-none"
                initial={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  opacity: 0,
                  scale: 0,
                }}
                animate={particlesControls}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  animate: {
                    x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`],
                    y: [`${particle.y}%`, `${(particle.y + 30) % 100}%`],
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                  },
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.size / 2}px rgba(255,255,255,0.8)`,
                }}
              />
            ))}

            {/* Content overlay with enhanced animations */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-8 text-white"
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: isInView ? 0 : 100,
                opacity: isInView ? 1 : 0,
                x: isHovered ? 10 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: isInView ? 0.4 : 0,
                type: "spring",
                stiffness: 100,
              }}
            >
              
            </motion.div>

            {/* Enhanced corner accents with animations */}
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/50 rounded-tr-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isInView ? 1 : 0,
                scale: isInView ? 1 : 0.5,
              
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/50 rounded-bl-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isInView ? 1 : 0,
                scale: isInView ? 1 : 0.5,
            
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  )
}
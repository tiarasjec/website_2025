"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { tiaraFont } from "@/lib/fonts"
import Register from "@/components/ui/register-button"


export default function EventCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-8 sm:py-12 md:py-24">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16 text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={cn(
              "mt-4 sm:mt-6 text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-relaxed text-center transition hover:scale-110 duration-300 ease-in-out",
              tiaraFont.className,
            )}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Register Now!
          </motion.h2>
        </motion.div>

        <motion.div
          className="mb-6 sm:mb-8 text-xl sm:text-2xl leading-relaxed text-white text-center max-w-3xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Don't miss out on the ultimate techno-cultural experience! Register now and be part of the excitement at <span className={cn("text-white tracking-wider",tiaraFont.className)}>Ti</span>
            <span className={cn("text-[#EB1C2C] tracking-wider",tiaraFont.className)}>ar</span>
            <span className={cn("text-white tracking-wider",tiaraFont.className)}>a</span>
            <span className={cn("text-[#EB1C2C] tracking-wider",tiaraFont.className)}>&apos;</span>
            <span className={cn("text-white tracking-wider",tiaraFont.className)}>25 !</span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
            <span className="text-lg sm:text-xl font-medium">20,21 March 2025</span>
          </div>
          
          <div className="hidden sm:block h-6 w-px bg-white"></div>
          
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
            <span className="text-lg sm:text-xl font-medium text-center">
              <span className="inline sm:hidden md:inline">St. Joseph Engineering College, Mangaluru</span>
              <span className="hidden sm:inline md:hidden">SJEC Mangaluru</span>
            </span>
          </div>
        </motion.div>

        <motion.div
            className="flex justify-center items-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            >
            <div className="w-full sm:w-auto flex justify-center">
                <Register />
            </div>
            </motion.div>

      </div>
    </section>
  )
}
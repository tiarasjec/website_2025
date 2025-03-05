"use client"
import { motion } from "framer-motion"
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/widget/header"
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";


export default function AboutTiara() {

  return (
    <>
    <Header/>
    <ShaderVisualization />
    <section
      className="relative min-h-screen mt-10 w-full flex justify-center items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-40 w-40 rounded-full bg-white"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: 0,
              opacity: 0.1,
            }}
            animate={{
              x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              scale: [0.1, 0.3],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 text-white">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <motion.h2
                className={cn(
                 "mt-6 text-white text-4xl font-bold leading-relaxed sm:text-6xl md:text-7xl",
                  tiaraFont.className
                )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            About Ti<span className="text-[#EB1C2C]">ar</span>a
          </motion.h2>
        </motion.div>

        {/* Content */}
        <div className="relative mx-auto max-w-4xl">
            {/* Paragraphs with staggered animation */}
            <motion.p
              className="mb-6 text-lg leading-relaxed text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              St. Joseph Engineering College has come together to host a national level techno-cultural fest, Tiara 2025.
              Tiara is a National-level Techno-Cultural fest, conducted for young minds aspiring to be extraordinary,
              that is open to all students of undergraduate level and above to come and showcase their talents and
              represent their respective institutions on the grand stage of Tiara.
            </motion.p>

            <motion.p
              className="mb-6 text-lg leading-relaxed text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Our event mainly aims to teach the youth to explore new areas of Technology and Culture to
              foster the nation&apos;s development. SJEC welcomes you all to Tiara 2025 to unleash your potential and unlock
              your skills.
            </motion.p>

            <motion.p
              className="text-center text-xl font-semibold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              See you on 20th and 21st March 2025.
            </motion.p>
        </div>
      </div>
    </section>
      <Footer />
    </>
  )
}


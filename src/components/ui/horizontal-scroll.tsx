"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"

interface HorizontalScrollProps {
  children: ReactNode
  skewReducer?: number
  skewLimit?: number
  springConfig?: {
    stiffness: number
    damping: number
  }
  className?: string
}

export default function HorizontalScroll({
  children,
  skewReducer = 20,
  skewLimit = 30,
  springConfig = { stiffness: 100, damping: 30 },
  className = "",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({ left: 0, right: 0 })
  const [direction, setDirection] = useState(0)
  const [isInView, setIsInView] = useState(false)

  // Motion values for smooth animations
  const scrollX = useMotionValue(0)
  const scrollXSpring = useSpring(scrollX, springConfig)
  const skew = useMotionValue(0)
  const skewSpring = useSpring(skew, { ...springConfig, damping: 50 })

  // Calculate container bounds on mount and resize
  useEffect(() => {
    const calculateBounds = () => {
      if (wrapperRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const wrapperWidth = wrapperRef.current.scrollWidth
        setBounds({
          left: 0,
          right: Math.max(0, wrapperWidth - containerWidth),
        })
      }
    }

    calculateBounds()
    window.addEventListener("resize", calculateBounds)
    return () => window.removeEventListener("resize", calculateBounds)
  }, [])

  // Set up intersection observer to detect when component is in view
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.2 }, // Trigger when 20% of the component is visible
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Handle global wheel events when component is in view
  useEffect(() => {
    if (!isInView) return

    const handleGlobalWheel = (e: WheelEvent) => {
      if (isInView) {
        // Allow normal page scrolling when at the limits
        if (
          (scrollX.get() >= bounds.right && e.deltaY < 0) || // At right end, scrolling up
          (scrollX.get() <= bounds.left && e.deltaY > 0) // At left end, scrolling down
        ) {
          return // Allow default scrolling
        }

        e.preventDefault() // Prevent default behavior

        const delta = e.deltaY
        setDirection(delta > 0 ? 1 : -1) // Reversed: Down → Left to Right, Up → Right to Left

        // Calculate new scroll position
        const newScrollX = Math.max(bounds.left, Math.min(scrollX.get() - delta, bounds.right)) // Reversed sign

        // Calculate skew effect
        const skewDelta = -delta / skewReducer // Reversed sign
        const newSkew = Math.max(-skewLimit, Math.min(skewDelta, skewLimit))

        scrollX.set(newScrollX)
        skew.set(newSkew)
      }
    }

    window.addEventListener("wheel", handleGlobalWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleGlobalWheel)
  }, [isInView, bounds, skewLimit, skewReducer, scrollX, skew])

  // Handle touch events for mobile scrolling
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX = 0
    let lastX = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (isInView) {
        startX = e.touches[0].clientX
        lastX = scrollX.get()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isInView) {
        // Allow normal scrolling when at the limits
        if (
          (scrollX.get() >= bounds.right && startX < e.touches[0].clientX) || // At right end, swiping right
          (scrollX.get() <= bounds.left && startX > e.touches[0].clientX) // At left end, swiping left
        ) {
          return // Allow normal scrolling
        }

        e.preventDefault()
        const x = e.touches[0].clientX
        const delta = startX - x // Positive when swiping left

        setDirection(delta > 0 ? -1 : 1) // Adjusted for correct behavior

        // Calculate new scroll position
        const newScrollX = Math.max(bounds.left, Math.min(lastX - delta, bounds.right)) // Reversed sign

        // Calculate skew effect
        const skewDelta = -delta / skewReducer // Reversed sign
        const newSkew = Math.max(-skewLimit, Math.min(skewDelta, skewLimit))

        scrollX.set(newScrollX)
        skew.set(newSkew)
      }
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isInView, bounds, skewLimit, skewReducer, scrollX, skew])

  return (
    <div
      ref={containerRef}
      className={`horizontal-scroll-container overflow-hidden relative ${className}`}
      style={{
        scrollSnapAlign: "start",
      }}
    >
      <motion.div
        ref={wrapperRef}
        className="horizontal-scroll-wrapper inline-flex"
        style={{
          x: scrollXSpring,
          skewX: skewSpring,
          transformOrigin: direction >= 0 ? "left" : "right", // Adjusted for reversed movement
        }}
      >
        {children}
      </motion.div>
      {isInView && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {scrollX.get() >= bounds.right ? "Continue scrolling down" : "Scroll to navigate"}
        </div>
      )}
    </div>
  )
}

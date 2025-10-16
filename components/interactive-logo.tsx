"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function InteractiveLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current || !isHovered) return

      const rect = logoRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      setMousePosition({ x: deltaX, y: deltaY })
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    } else {
      // Reset position when not hovering
      setMousePosition({ x: 0, y: 0 })
    }

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  const rotateX = isHovered ? mousePosition.y * 15 : 0
  const rotateY = isHovered ? mousePosition.x * -15 : 0
  const translateZ = isHovered ? 50 : 0
  const scale = isHovered ? 1.15 : 1

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-4 md:gap-6">
      <div
        ref={logoRef}
        className="relative cursor-pointer transition-all duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-logo-i1aZ0iZOIctiTzRJJHz9Bg3ot4AnQj.png"
            alt="ZynxPlay Logo"
            width={400}
            height={400}
            priority
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain transition-all duration-300"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 8px rgba(255, 100, 255, 0.8)) drop-shadow(0 0 20px rgba(100, 200, 255, 0.6)) drop-shadow(0 0 40px rgba(200, 100, 255, 0.4))"
                : "drop-shadow(0 0 4px rgba(255, 100, 255, 0.4)) drop-shadow(0 0 10px rgba(100, 200, 255, 0.3))",
            }}
          />
        </div>
      </div>

      <div className="text-center space-y-4 px-4">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-balance"
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            background: "linear-gradient(135deg, rgb(255, 100, 255) 0%, rgb(100, 200, 255) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: isHovered ? "0 0 20px rgba(255, 100, 255, 0.5), 0 0 40px rgba(100, 200, 255, 0.3)" : "none",
          }}
        >
          ZYNXPLAY
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-foreground/90"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          A Indie Games Platform
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div
            className="px-6 py-2 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: "rgb(255, 100, 255)",
              background: "rgba(255, 100, 255, 0.1)",
              boxShadow: "0 0 20px rgba(255, 100, 255, 0.3)",
            }}
          >
            <span className="text-sm sm:text-base font-medium text-foreground/80">Coming Soon</span>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs text-foreground/50 font-light">
            Developed by{" "}
            <span className="text-foreground/70 font-medium">Tutankhamal</span>
          </p>
        </div>
      </div>
    </div>
  )
}

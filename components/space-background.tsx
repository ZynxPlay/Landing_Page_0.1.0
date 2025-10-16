"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  z: number
  size: number
  speed: number
}

interface Comet {
  x: number
  y: number
  angle: number
  speed: number
  length: number
  opacity: number
}

interface Spaceship {
  x: number
  y: number
  angle: number
  speed: number
  size: number
  type: "fighter" | "cruiser"
  opacity: number
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    const comets: Comet[] = []
    const spaceships: Spaceship[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const starCount = Math.floor((canvas.width * canvas.height) / 3000)
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const createComet = () => {
      if (Math.random() > 0.995) {
        comets.push({
          x: Math.random() * canvas.width,
          y: -50,
          angle: (Math.random() * Math.PI) / 4 + Math.PI / 8,
          speed: Math.random() * 3 + 2,
          length: Math.random() * 100 + 50,
          opacity: 1,
        })
      }
    }

    const createSpaceship = () => {
      if (Math.random() > 0.998) {
        const side = Math.random() > 0.5 ? "left" : "right"
        spaceships.push({
          x: side === "left" ? -100 : canvas.width + 100,
          y: Math.random() * canvas.height * 0.6 + canvas.height * 0.2,
          angle: side === "left" ? 0 : Math.PI,
          speed: Math.random() * 4 + 3,
          size: Math.random() * 20 + 15,
          type: Math.random() > 0.5 ? "fighter" : "cruiser",
          opacity: 1,
        })
      }
    }

    const drawGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgb(15, 10, 40)")
      gradient.addColorStop(0.3, "rgb(25, 15, 60)")
      gradient.addColorStop(0.6, "rgb(20, 25, 70)")
      gradient.addColorStop(1, "rgb(10, 15, 45)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawStars = () => {
      stars.forEach((star) => {
        const x = star.x
        const y = star.y
        const size = star.size * (1 - star.z / 1000)

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - star.z / 1000})`
        ctx.fill()

        star.z -= star.speed
        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
        }
      })
    }

    const drawComets = () => {
      comets.forEach((comet, index) => {
        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length,
        )
        gradient.addColorStop(0, `rgba(100, 200, 255, ${comet.opacity})`)
        gradient.addColorStop(0.5, `rgba(150, 150, 255, ${comet.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(100, 100, 200, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(comet.x, comet.y)
        ctx.lineTo(comet.x - Math.cos(comet.angle) * comet.length, comet.y - Math.sin(comet.angle) * comet.length)
        ctx.stroke()

        // Glow effect
        ctx.beginPath()
        ctx.arc(comet.x, comet.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 200, 255, ${comet.opacity})`
        ctx.shadowBlur = 15
        ctx.shadowColor = "rgba(100, 200, 255, 0.8)"
        ctx.fill()
        ctx.shadowBlur = 0

        comet.x += Math.cos(comet.angle) * comet.speed
        comet.y += Math.sin(comet.angle) * comet.speed

        if (comet.y > canvas.height + 100 || comet.x > canvas.width + 100 || comet.x < -100) {
          comets.splice(index, 1)
        }
      })
    }

    const drawSpaceships = () => {
      spaceships.forEach((ship, index) => {
        ctx.save()
        ctx.translate(ship.x, ship.y)
        ctx.rotate(ship.angle)
        ctx.globalAlpha = ship.opacity

        if (ship.type === "fighter") {
          // Fighter ship - triangular
          ctx.beginPath()
          ctx.moveTo(ship.size, 0)
          ctx.lineTo(-ship.size / 2, -ship.size / 3)
          ctx.lineTo(-ship.size / 2, ship.size / 3)
          ctx.closePath()
          ctx.fillStyle = "rgb(200, 100, 255)"
          ctx.fill()
          ctx.strokeStyle = "rgb(255, 150, 255)"
          ctx.lineWidth = 2
          ctx.stroke()

          // Engine glow
          ctx.beginPath()
          ctx.arc(-ship.size / 2, 0, ship.size / 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(100, 200, 255, 0.8)"
          ctx.shadowBlur = 10
          ctx.shadowColor = "rgba(100, 200, 255, 1)"
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          // Cruiser - rectangular
          ctx.fillStyle = "rgb(150, 150, 255)"
          ctx.fillRect(-ship.size / 2, -ship.size / 4, ship.size, ship.size / 2)
          ctx.strokeStyle = "rgb(200, 200, 255)"
          ctx.lineWidth = 2
          ctx.strokeRect(-ship.size / 2, -ship.size / 4, ship.size, ship.size / 2)

          // Engine glow
          ctx.beginPath()
          ctx.arc(-ship.size / 2, 0, ship.size / 3, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 150, 100, 0.8)"
          ctx.shadowBlur = 10
          ctx.shadowColor = "rgba(255, 150, 100, 1)"
          ctx.fill()
          ctx.shadowBlur = 0
        }

        ctx.restore()

        const direction = ship.angle === 0 ? 1 : -1
        ship.x += direction * ship.speed

        if ((direction === 1 && ship.x > canvas.width + 100) || (direction === -1 && ship.x < -100)) {
          spaceships.splice(index, 1)
        }
      })
    }

    const animate = () => {
      drawGradientBackground()
      drawStars()
      drawComets()
      drawSpaceships()
      createComet()
      createSpaceship()
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ touchAction: "none" }} />
}

import { useEffect, useRef } from 'react'
import './FireworksCanvas.css'

export default function FireworksCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = []
    const colors = ['#f4c2c2', '#c9b8d9', '#f5e6c8', '#e8a0a0', '#ffd700', '#98d4bb', '#ff69b4']

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
        }
        this.alpha = 1
        this.friction = 0.98
        this.gravity = 0.05
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }

      update() {
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction
        this.velocity.y += this.gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.012
      }
    }

    const spawnFirework = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * (canvas.height * 0.6)
      const color = colors[Math.floor(Math.random() * colors.length)]

      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    // Spawn initial bursts
    spawnFirework()
    spawnFirework()
    const interval = setInterval(spawnFirework, 800)

    let animationFrameId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        if (p.alpha > 0) {
          p.update()
          p.draw()
        } else {
          particles.splice(index, 1)
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fireworks-canvas" />
}

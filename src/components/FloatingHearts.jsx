import { useState, useEffect } from 'react'
import './FloatingHearts.css'

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random()
      const heart = {
        id,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.25,
      }
      setHearts(prev => [...prev.slice(-15), heart])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map(h => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

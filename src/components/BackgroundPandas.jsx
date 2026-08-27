import React, { useState } from 'react'
import './BackgroundPandas.css'

const PANDA_MESSAGES = [
  'Panda hug for Udita! 🐼💖',
  'Bubu loves Dudu forever! 🐾✨',
  'Sending extra birthday love! 🎂💖',
  'Happy Birthday Udita! 🥳🎉',
  'You are the sweetest! 🌸✨',
  'Yippee! Birthday Queen! 👑💖',
]

const PANDA_LIST = [
  { className: 'panda-top-left', src: 'https://media.tenor.com/NzD_vWxzapQAAAAm/bubududumassage.webp', alt: 'Bubu Dudu massage hug' },
  { className: 'panda-top-right', src: 'https://media.tenor.com/radCN7DZ8xwAAAAm/dinosaur-dudu.webp', alt: 'Bubu in dinosaur hoodie' },
  { className: 'panda-bottom-left', src: 'https://media.tenor.com/2Jl1X7xa6UYAAAAm/bubu-dudu-eyes.webp', alt: 'Bear carrying panda' },
  { className: 'panda-bottom-right', src: 'https://media.tenor.com/Zrr4L_Wd4JkAAAAm/bubu-rub-bubu-love-dudu.webp', alt: 'Bubu Dudu love hug' },
  { className: 'panda-mid-left', src: 'https://media.tenor.com/sUPu9ZEW0kcAAAAm/bubu-dudu-lovely-bubu-dudu-walk.webp', alt: 'Bubu Dudu walk' },
  { className: 'panda-mid-right', src: 'https://media.tenor.com/D6HDHJLAqb4AAAAm/dudu-bubu-dudu.webp', alt: 'Bubu Dudu yippee' },
]

export default function BackgroundPandas() {
  const [particles, setParticles] = useState([])
  const [activeToast, setActiveToast] = useState(null)

  const handlePandaClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = rect.left + rect.width / 2
    const clickY = rect.top + rect.height / 2

    // Create 6 floating heart/star particles
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + Math.random(),
      x: clickX + (Math.random() * 60 - 30),
      y: clickY + (Math.random() * 40 - 20),
      symbol: ['💖', '✨', '🌸', '🎂', '🥰', '🥳'][i % 6],
    }))

    setParticles((prev) => [...prev, ...newParticles])
    setActiveToast(PANDA_MESSAGES[index % PANDA_MESSAGES.length])

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
    }, 1200)

    setTimeout(() => {
      setActiveToast(null)
    }, 2000)
  }

  return (
    <div className="background-pandas-container">
      {/* Clickable Floating Pandas */}
      {PANDA_LIST.map((panda, index) => (
        <div
          key={index}
          className={`floating-panda ${panda.className} interactive-panda`}
          onClick={(e) => handlePandaClick(e, index)}
          title="Click me for birthday love!"
        >
          <img src={panda.src} alt={panda.alt} />
        </div>
      ))}

      {/* Floating Click Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="panda-particle-burst"
          style={{ left: `${p.x}px`, top: `${p.y}px` }}
        >
          {p.symbol}
        </span>
      ))}

      {/* Floating Panda Toast Message */}
      {activeToast && (
        <div className="panda-toast-popup">
          <span>{activeToast}</span>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import './Page6SpinWheel.css'

const DARES = [
  { id: 1, text: 'Dance on "Beedi Jalaile" 💃', shortText: 'Beedi Jalaile 💃', color: '#f4c2c2', detail: 'Dance on "Beedi Jalaile"! 💃🔥' },
  { id: 2, text: 'Smash Cake on Your Face 🎂', shortText: 'Smash Cake 🎂', color: '#c9b8d9', detail: 'Smash Cake on Your Face! 🎂😜' },
  { id: 3, text: 'Dance on "Kajra Re" 💃', shortText: 'Kajra Re 💃', color: '#f5e6c8', detail: 'Dance on "Kajra Re"! 💃✨' },
  { id: 4, text: 'Speech on Bad Words 🤬', shortText: 'Bad Words 🤬', color: '#e3d5f0', detail: 'Give a 30-Second Dramatic Speech Using Bad Words! 🤬😂' },
  { id: 5, text: 'Act Like a Celebrity 😂', shortText: 'Celebrity Act 😂', color: '#f8a4b8', detail: 'Act Like a Famous Celebrity Until Your Next Spin! 😂👑' },
  { id: 6, text: 'Sing & Funny Dance 🎤', shortText: 'Sing & Dance 🎤', color: '#efe9dd', detail: 'Sing a Song While Doing a Funny Dance! 🎤💃' },
]

function getSlicePath(cx, cy, r, startAngle, endAngle) {
  const rad1 = (startAngle - 90) * (Math.PI / 180)
  const rad2 = (endAngle - 90) * (Math.PI / 180)
  const x1 = cx + r * Math.cos(rad1)
  const y1 = cy + r * Math.sin(rad1)
  const x2 = cx + r * Math.cos(rad2)
  const y2 = cy + r * Math.sin(rad2)
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`
}

export default function Page6SpinWheel({ onSuccess }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [wonDare, setWonDare] = useState(null)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWonDare(null)

    const randomIndex = Math.floor(Math.random() * DARES.length)
    const sliceAngle = 360 / DARES.length
    const extraSpins = (6 + Math.floor(Math.random() * 3)) * 360
    const targetDeg = extraSpins + (360 - randomIndex * sliceAngle)

    setRotation(rotation + targetDeg)

    setTimeout(() => {
      setIsSpinning(false)
      setWonDare(DARES[randomIndex])
    }, 4500)
  }

  const sliceAngle = 360 / DARES.length

  return (
    <div className="page6-spin-container">
      <div className="spin-header">
        <h2 className="section-title">birthday dare wheel</h2>
        <p className="section-subtitle">spin to reveal your special birthday dare 🎯</p>
      </div>

      <div className="wheel-main-stage">
        {/* Top Pointer Arrow */}
        <div className={`wheel-top-pointer ${isSpinning ? 'pointer-bounce' : ''}`}>▼</div>

        {/* SVG Wheel Disc */}
        <div className="wheel-disc-container">
          <svg
            className="wheel-svg-disc"
            viewBox="0 0 360 360"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
          >
            {/* Outer Rim Shadow & Border */}
            <circle cx="180" cy="180" r="176" fill="#ffffff" stroke="#e0c7a8" strokeWidth="5" />

            {/* Clean Pastel Slices */}
            {DARES.map((dare, i) => {
              const midAngle = i * sliceAngle
              const startAngle = midAngle - sliceAngle / 2
              const endAngle = midAngle + sliceAngle / 2
              const path = getSlicePath(180, 180, 170, startAngle, endAngle)

              return (
                <path key={dare.id} d={path} fill={dare.color} stroke="#ffffff" strokeWidth="3" />
              )
            })}

            {/* Decorative Rim Dots */}
            {Array.from({ length: 12 }).map((_, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180)
              const x = 180 + 172 * Math.cos(angle)
              const y = 180 + 172 * Math.sin(angle)
              return <circle key={idx} cx={x} cy={y} r="3.5" fill="#d4888a" />
            })}

            {/* Center Hub Frame */}
            <circle cx="180" cy="180" r="48" fill="#ffffff" stroke="#d4888a" strokeWidth="3.5" />
          </svg>

          {/* Center SPIN Button */}
          <button className="wheel-center-spin-btn" onClick={handleSpin} disabled={isSpinning}>
            <span>{isSpinning ? '...' : 'SPIN! 🎯'}</span>
          </button>
        </div>
      </div>

      {/* Won Dare Popup Modal */}
      {wonDare && (
        <div className="prize-modal-overlay">
          <div className="prize-modal">
            <div className="prize-sparkles">🎯✨💥</div>
            <h3>Your Dare: {wonDare.text}!</h3>
            <p className="prize-detail">{wonDare.detail}</p>
            <button className="continue-btn" onClick={onSuccess}>
              Accept Dare & Continue to Birthday Cake 🎂 →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

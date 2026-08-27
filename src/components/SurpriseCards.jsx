import { useState, useEffect, useRef } from 'react'
import './SurpriseCards.css'

const cards = [
  {
    front: '♥',
    back: {
      title: 'You are incredible',
      message: 'Never forget how amazing you are. You light up every room you walk into, and the world is so much better with you in it. ✨',
    },
  },
  {
    front: '♥',
    back: {
      title: 'A promise',
      message: "No matter the distance, no matter the time — I'll always be here for you. Through every high and every low. Always. 🤍",
    },
  },
  {
    front: '♥',
    back: {
      title: 'My wish for you',
      message: 'I wish you endless happiness, the courage to chase your dreams, and all the love your beautiful heart deserves. Happy Birthday! 🎂',
    },
  },
]

export default function SurpriseCards() {
  const [flipped, setFlipped] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <section className={`surprise-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <h2 className="section-title">a little surprise</h2>
      <p className="section-subtitle">tap the cards to reveal special messages 💌</p>

      <div className="cards-container">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flip-card ${flipped[i] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(i)}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front">
                <div className="card-front-content">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="card-heart">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <p className="card-tap-hint">tap me</p>
                </div>
                <div className="card-sparkle sparkle-1">✦</div>
                <div className="card-sparkle sparkle-2">✦</div>
                <div className="card-sparkle sparkle-3">✧</div>
              </div>

              {/* Back */}
              <div className="flip-card-back">
                <h4 className="card-back-title">{card.back.title}</h4>
                <p className="card-back-message">{card.back.message}</p>
                <div className="card-back-decoration">♥</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Balloon mascot */}
      <div className="balloon-mascot">
        <div className="balloon">
          <div className="balloon-body">
            <div className="balloon-shine"></div>
          </div>
          <div className="balloon-tie"></div>
          <div className="balloon-string"></div>
        </div>
      </div>
    </section>
  )
}

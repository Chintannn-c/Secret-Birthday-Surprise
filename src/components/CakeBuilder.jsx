import { useState, useCallback, useEffect, useRef } from 'react'
import './CakeBuilder.css'

const BASES = [
  { id: 'vanilla', label: 'Vanilla', color: '#f5e6c8', accent: '#e8d4a0' },
  { id: 'chocolate', label: 'Chocolate', color: '#8b6547', accent: '#6b4c35' },
  { id: 'strawberry', label: 'Strawberry', color: '#f8b4c8', accent: '#e89aae' },
]

const FROSTINGS = [
  { id: 'strawberry', label: 'Strawberry', color: '#f4a0b8', drip: '#e88aa5' },
  { id: 'vanilla', label: 'Vanilla', color: '#faf0dc', drip: '#ede0c8' },
  { id: 'chocolate', label: 'Chocolate', color: '#5c3a28', drip: '#4a2e1f' },
]

const TOPPINGS = [
  { id: 'cherry', label: 'Cherry', emoji: '🍒' },
  { id: 'sprinkles', label: 'Sprinkles', emoji: '✨' },
  { id: 'candle', label: 'Candle', emoji: '🕯️' },
]

export default function CakeBuilder() {
  const [step, setStep] = useState(0)
  const [base, setBase] = useState(null)
  const [frosting, setFrosting] = useState(null)
  const [topping, setTopping] = useState(null)
  const [blown, setBlown] = useState(false)
  const [confetti, setConfetti] = useState([])
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const selectBase = (b) => {
    setBase(b)
    setTimeout(() => setStep(1), 400)
  }

  const selectFrosting = (f) => {
    setFrosting(f)
    setTimeout(() => setStep(2), 400)
  }

  const selectTopping = (t) => {
    setTopping(t)
    setTimeout(() => setStep(3), 400)
  }

  const blowCandles = useCallback(() => {
    setBlown(true)
    // Generate confetti
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#f4c2c2', '#c9b8d9', '#f5e6c8', '#e8a0a0', '#ffd700', '#98d4bb', '#ff69b4', '#87ceeb'][Math.floor(Math.random() * 8)],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 2,
      rotation: Math.random() * 720,
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
    setConfetti(pieces)
  }, [])

  return (
    <section className={`cake-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <h2 className="section-title">virtually bake a cake</h2>
      <p className="section-subtitle">since i can't bake you one in person :(</p>

      <div className="cake-builder">
        {/* Cake preview */}
        <div className="cake-preview">
          <div className="cake-stand">
            <div className="cake-stand-plate"></div>
            <div className="cake-stand-stem"></div>
            <div className="cake-stand-base"></div>
          </div>

          {base && (
            <div className="cake-layers" key={base.id}>
              {/* Bottom layer */}
              <div className="cake-layer layer-bottom" style={{ background: base.color }}>
                <div className="cake-layer-side" style={{ background: base.accent }}></div>
              </div>

              {/* Top layer */}
              <div className="cake-layer layer-top" style={{ background: base.color }}>
                <div className="cake-layer-side" style={{ background: base.accent }}></div>
              </div>

              {/* Frosting */}
              {frosting && (
                <div className="cake-frosting" style={{ background: frosting.color }}>
                  <div className="frosting-drip drip-1" style={{ background: frosting.drip }}></div>
                  <div className="frosting-drip drip-2" style={{ background: frosting.drip }}></div>
                  <div className="frosting-drip drip-3" style={{ background: frosting.drip }}></div>
                  <div className="frosting-drip drip-4" style={{ background: frosting.drip }}></div>
                </div>
              )}

              {/* Topping */}
              {topping && (
                <div className={`cake-topping ${topping.id} ${blown ? 'blown' : ''}`}>
                  {topping.id === 'cherry' && (
                    <div className="cherry-group">
                      <div className="cherry"></div>
                      <div className="cherry cherry-2"></div>
                      <div className="cherry-stem"></div>
                    </div>
                  )}
                  {topping.id === 'sprinkles' && (
                    <div className="sprinkles-group">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="sprinkle" style={{
                          left: `${10 + Math.random() * 80}%`,
                          top: `${Math.random() * 60}%`,
                          background: ['#f4c2c2', '#c9b8d9', '#f5e6c8', '#98d4bb', '#ffd700'][i % 5],
                          transform: `rotate(${Math.random() * 180}deg)`,
                        }}></div>
                      ))}
                    </div>
                  )}
                  {topping.id === 'candle' && (
                    <div className="candle-group">
                      <div className="candle">
                        <div className="candle-body"></div>
                        <div className="candle-stripe"></div>
                        <div className="candle-wick"></div>
                        {!blown && <div className="candle-flame">
                          <div className="flame-inner"></div>
                        </div>}
                        {blown && <div className="candle-smoke"></div>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Cute cat mascot */}
          <div className="cake-mascot">
            <div className="mascot-body">
              <div className="mascot-ear left-ear"></div>
              <div className="mascot-ear right-ear"></div>
              <div className="mascot-face">
                <div className="mascot-eye left-eye"></div>
                <div className="mascot-eye right-eye"></div>
                <div className="mascot-nose"></div>
                <div className="mascot-mouth"></div>
                <div className="mascot-blush left-blush"></div>
                <div className="mascot-blush right-blush"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="cake-steps">
          {step === 0 && (
            <div className="step-panel">
              <h3 className="step-title">Step 1: Choose a base</h3>
              <div className="step-options">
                {BASES.map(b => (
                  <button
                    key={b.id}
                    className={`cake-option ${base?.id === b.id ? 'selected' : ''}`}
                    onClick={() => selectBase(b)}
                  >
                    <div className="option-swatch" style={{ background: b.color, border: `2px solid ${b.accent}` }}></div>
                    <span>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="step-panel">
              <h3 className="step-title">Step 2: Choose frosting</h3>
              <div className="step-options">
                {FROSTINGS.map(f => (
                  <button
                    key={f.id}
                    className={`cake-option ${frosting?.id === f.id ? 'selected' : ''}`}
                    onClick={() => selectFrosting(f)}
                  >
                    <div className="option-swatch" style={{ background: f.color, border: `2px solid ${f.drip}` }}></div>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-panel">
              <h3 className="step-title">Step 3: Add toppings</h3>
              <div className="step-options">
                {TOPPINGS.map(t => (
                  <button
                    key={t.id}
                    className={`cake-option ${topping?.id === t.id ? 'selected' : ''}`}
                    onClick={() => selectTopping(t)}
                  >
                    <span className="option-emoji">{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && !blown && (
            <div className="step-panel final-step">
              <h3 className="step-title">Your cake is ready! 🎂</h3>
              <p className="step-desc">Make a wish and blow out the candles!</p>
              <button className="blow-btn" onClick={blowCandles}>
                <span className="blow-emoji">💨</span>
                Blow Candles!
              </button>
            </div>
          )}

          {blown && (
            <div className="step-panel celebration">
              <h3 className="celebration-title">🎉 Yayy! 🎉</h3>
              <p className="celebration-text">
                Happy Birthday Udita!<br />
                <span className="celebration-sub">You are one year more amazing! 🎂✨</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confetti */}
      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map(c => (
            <div
              key={c.id}
              className={`confetti-piece ${c.shape}`}
              style={{
                left: `${c.x}%`,
                background: c.color,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
                '--rotation': `${c.rotation}deg`,
                width: `${c.size}px`,
                height: c.shape === 'rect' ? `${c.size * 0.4}px` : `${c.size}px`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}

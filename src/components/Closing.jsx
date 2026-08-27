import { useEffect, useRef, useState } from 'react'
import './Closing.css'

export default function Closing() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`closing-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      {/* Decorative seashell/fan */}
      <div className="closing-decoration">
        <svg viewBox="0 0 120 80" className="shell-svg">
          <path d="M60,75 Q60,10 10,10" fill="none" stroke="var(--brown-light)" strokeWidth="2" opacity="0.6"/>
          <path d="M60,75 Q60,10 30,5" fill="none" stroke="var(--brown-light)" strokeWidth="2" opacity="0.5"/>
          <path d="M60,75 Q60,5 50,2" fill="none" stroke="var(--brown-light)" strokeWidth="2" opacity="0.5"/>
          <path d="M60,75 Q60,5 70,2" fill="none" stroke="var(--brown-light)" strokeWidth="2" opacity="0.5"/>
          <path d="M60,75 Q60,10 90,5" fill="none" stroke="var(--brown-light)" strokeWidth="2" opacity="0.5"/>
          <path d="M60,75 Q60,10 110,10" fill="none" stroke="var(--brown-light)" strokeWidth="2" opacity="0.6"/>
          <ellipse cx="60" cy="78" rx="50" ry="4" fill="none" stroke="var(--brown-light)" strokeWidth="1.5" opacity="0.3"/>
        </svg>
      </div>

      <div className="closing-tagline">
        <span className="closing-left">a cupful of love</span>
        <span className="closing-center">♥</span>
        <span className="closing-right">...and a wish</span>
      </div>

      <p className="closing-subtitle">from me to you</p>

      {/* Hearts illustration */}
      <div className="closing-hearts">
        <svg viewBox="0 0 200 120" className="hearts-svg">
          {/* Heart 1 */}
          <path
            d="M60,80 C60,80 20,55 20,35 C20,20 35,12 50,25 L60,35 L70,25 C85,12 100,20 100,35 C100,55 60,80 60,80Z"
            fill="none"
            stroke="var(--pink-deep)"
            strokeWidth="2"
            className="heart-path heart-path-1"
          />
          {/* Heart 2 */}
          <path
            d="M140,80 C140,80 100,55 100,35 C100,20 115,12 130,25 L140,35 L150,25 C165,12 180,20 180,35 C180,55 140,80 140,80Z"
            fill="none"
            stroke="var(--pink)"
            strokeWidth="2"
            className="heart-path heart-path-2"
          />
        </svg>
      </div>

      <div className="closing-quote">
        <p className="quote-text">
          <span className="quote-line-1">love is never</span>
          <span className="quote-line-2">wasted</span>
          <span className="quote-line-3">when it's <em>shared.</em></span>
        </p>
      </div>

      <div className="closing-footer">
        <p className="footer-text">made with ♥ for Udita</p>
      </div>
    </section>
  )
}

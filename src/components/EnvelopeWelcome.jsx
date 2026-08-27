import { useState } from 'react'
import './EnvelopeWelcome.css'

export default function EnvelopeWelcome({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    if (isOpening) return
    setIsOpening(true)
    setTimeout(() => onOpen(), 1500)
  }

  return (
    <div className={`envelope-scene ${isOpening ? 'opening' : ''}`} onClick={handleClick}>
      <h2 className="envelope-title">You got mail!</h2>
      <p className="envelope-subtitle">click the envelope to open</p>

      <div className="envelope-wrapper">
        {/* Letter that slides up */}
        <div className="envelope-letter-inside">
          <div className="letter-lines">
            <span></span><span></span><span></span><span></span>
          </div>
          <p className="letter-preview">Happy Birthday!</p>
        </div>

        {/* Envelope body */}
        <div className="envelope-body">
          <div className="envelope-back"></div>
          <div className="envelope-front"></div>
        </div>

        {/* Envelope flap */}
        <div className="envelope-flap"></div>

        {/* Heart seal */}
        <div className="envelope-seal">
          <svg viewBox="0 0 24 24" fill="currentColor" className="seal-heart">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Decorative hearts coming out */}
        <div className="envelope-hearts">
          <span className="pop-heart" style={{'--delay': '0.2s', '--x': '-30px', '--y': '-60px'}}>♥</span>
          <span className="pop-heart" style={{'--delay': '0.4s', '--x': '25px', '--y': '-80px'}}>♥</span>
          <span className="pop-heart" style={{'--delay': '0.3s', '--x': '-15px', '--y': '-90px'}}>♥</span>
          <span className="pop-heart" style={{'--delay': '0.5s', '--x': '40px', '--y': '-50px'}}>♥</span>
          <span className="pop-heart" style={{'--delay': '0.6s', '--x': '-45px', '--y': '-40px'}}>♥</span>
          <span className="pop-heart" style={{'--delay': '0.35s', '--x': '10px', '--y': '-100px'}}>♥</span>
          <span className="pop-heart" style={{'--delay': '0.55s', '--x': '-5px', '--y': '-70px'}}>♥</span>
        </div>

        {/* Lavender sprigs decoration */}
        <div className="envelope-lavender left-lavender">
          <svg viewBox="0 0 40 100" className="lavender-sprig">
            <line x1="20" y1="100" x2="20" y2="10" stroke="#9b8bb4" strokeWidth="2"/>
            <ellipse cx="20" cy="15" rx="5" ry="8" fill="#c9b8d9" opacity="0.9"/>
            <ellipse cx="14" cy="28" rx="4" ry="7" fill="#c9b8d9" opacity="0.8" transform="rotate(-15 14 28)"/>
            <ellipse cx="26" cy="25" rx="4" ry="7" fill="#d4c5e8" opacity="0.8" transform="rotate(15 26 25)"/>
            <ellipse cx="18" cy="40" rx="4" ry="6" fill="#d4c5e8" opacity="0.7" transform="rotate(-10 18 40)"/>
            <ellipse cx="24" cy="38" rx="4" ry="6" fill="#c9b8d9" opacity="0.7" transform="rotate(10 24 38)"/>
            <ellipse cx="20" cy="50" rx="3" ry="5" fill="#d4c5e8" opacity="0.6"/>
          </svg>
        </div>
        <div className="envelope-lavender right-lavender">
          <svg viewBox="0 0 40 100" className="lavender-sprig">
            <line x1="20" y1="100" x2="20" y2="10" stroke="#9b8bb4" strokeWidth="2"/>
            <ellipse cx="20" cy="15" rx="5" ry="8" fill="#c9b8d9" opacity="0.9"/>
            <ellipse cx="14" cy="28" rx="4" ry="7" fill="#d4c5e8" opacity="0.8" transform="rotate(-15 14 28)"/>
            <ellipse cx="26" cy="25" rx="4" ry="7" fill="#c9b8d9" opacity="0.8" transform="rotate(15 26 25)"/>
            <ellipse cx="18" cy="40" rx="4" ry="6" fill="#c9b8d9" opacity="0.7" transform="rotate(-10 18 40)"/>
            <ellipse cx="24" cy="38" rx="4" ry="6" fill="#d4c5e8" opacity="0.7" transform="rotate(10 24 38)"/>
            <ellipse cx="20" cy="50" rx="3" ry="5" fill="#c9b8d9" opacity="0.6"/>
          </svg>
        </div>
      </div>

      <p className="envelope-cta">
        ✨ a little something for you ✨
      </p>
    </div>
  )
}

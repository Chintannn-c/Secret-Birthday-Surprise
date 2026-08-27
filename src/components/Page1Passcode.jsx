import { useState } from 'react'
import './Page1Passcode.css'

const VAULT_PHOTO = '/media/VaultPhoto.jpeg'

export default function Page1Passcode({ onSuccess }) {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [showHint, setShowHint] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)
    setErrorMsg('')

    // Auto-advance input focus
    if (value && index < 3) {
      const nextInput = document.getElementById(`passcode-digit-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    // Check code if all 4 entered
    const code = newDigits.join('')
    if (code.length === 4) {
      verifyPasscode(code)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`passcode-digit-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const verifyPasscode = (code) => {
    // Correct code: 2708
    if (code === '2708') {
      setIsUnlocked(true)
      setTimeout(() => {
        onSuccess()
      }, 1200)
    } else {
      setShaking(true)
      setErrorMsg('Incorrect passcode! Try Date and Month 💗')
      setTimeout(() => setShaking(false), 600)
    }
  }

  const handleKeypadClick = (num) => {
    const emptyIdx = digits.findIndex((d) => d === '')
    if (emptyIdx !== -1) {
      handleDigitChange(emptyIdx, num.toString())
    }
  }

  const handleClear = () => {
    setDigits(['', '', '', ''])
    setErrorMsg('')
  }

  return (
    <div className={`passcode-vault-container ${isUnlocked ? 'unlocked-anim' : ''}`}>
      <div className="vault-header">
        <h2 className="section-title">secret birthday vault</h2>
        <p className="section-subtitle">enter the passcode to unlock your surprise 🔒</p>
      </div>

      <div className="vault-content">
        {/* Polaroid Photo Frame (Matching User Reference Image) */}
        <div className="polaroid-vault-wrapper">
          <div className="polaroid-vault-card">
            {/* Top-Left Corner Flower Overlay */}
            <div className="corner-flower-accent">
              <svg className="flower-accent-svg" viewBox="0 0 70 70">
                <path d="M35 12 C24 -2, 4 12, 16 26 C2 34, 12 54, 28 46 C34 58, 54 52, 48 36 C60 28, 52 8, 35 12 Z" fill="#ffe4e6" />
                <circle cx="35" cy="18" r="12" fill="#fca5a5" />
                <circle cx="20" cy="29" r="12" fill="#fda4af" />
                <circle cx="26" cy="45" r="12" fill="#fca5a5" />
                <circle cx="44" cy="45" r="12" fill="#fda4af" />
                <circle cx="50" cy="29" r="12" fill="#fca5a5" />
                <circle cx="35" cy="33" r="8" fill="#f43f5e" />
                <circle cx="35" cy="33" r="4" fill="#fef08a" />
              </svg>
            </div>

            {/* Photo Container */}
            <div className="polaroid-vault-photo-box">
              <img
                src={VAULT_PHOTO}
                alt="Udita"
                className="polaroid-vault-photo"
              />
            </div>

            {/* Bottom Polaroid Margin */}
            <div className="polaroid-vault-bottom">
              {/* Bottom Left Doodle Stars */}
              <div className="polaroid-vault-doodles">
                <span className="doodle-star">✦</span>
                <span className="doodle-star small">★</span>
              </div>

              {/* Bottom Right Handwritten Text */}
              <div className="polaroid-vault-script">With love...</div>

              {/* Bottom Right Pink Ribbon Bow Accent */}
              <div className="corner-ribbon-accent">
                <svg className="ribbon-accent-svg" viewBox="0 0 60 45">
                  <path d="M 30 20 Q 10 2 8 18 Q 10 30 30 23 Z" fill="#f472b6" />
                  <path d="M 30 20 Q 50 2 52 18 Q 50 30 30 23 Z" fill="#f472b6" />
                  <path d="M 28 22 Q 18 34 12 44 L 20 44 Q 28 34 30 22 Z" fill="#fb7185" />
                  <path d="M 32 22 Q 42 34 48 44 L 40 44 Q 32 34 30 22 Z" fill="#fb7185" />
                  <ellipse cx="30" cy="20" rx="5" ry="4.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
          <p className="polaroid-caption">Udita's Vault 👑</p>
        </div>

        {/* Passcode Vault Box (Second Photo Type Design) */}
        <div className={`passcode-card ${shaking ? 'shake-anim' : ''}`}>
          <div className="passcode-card-title">Enter a passcode</div>

          <div className="passcode-inputs">
            {digits.map((digit, i) => (
              <input
                key={i}
                id={`passcode-digit-${i}`}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`digit-box ${digit ? 'filled' : ''}`}
                disabled={isUnlocked}
              />
            ))}
          </div>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {isUnlocked && <p className="success-message">Passcode Accepted! Unlocking... ✨</p>}

          {/* Numeric Keypad for Touch / Mouse */}
          <div className="numeric-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear', 0, 'Hint'].map((btn, idx) => (
              <button
                key={idx}
                className={`keypad-btn ${typeof btn === 'string' ? 'special' : ''}`}
                onClick={() => {
                  if (btn === 'Clear') handleClear()
                  else if (btn === 'Hint') setShowHint(!showHint)
                  else handleKeypadClick(btn)
                }}
                disabled={isUnlocked}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hint Modal Toggle */}
      {showHint && (
        <div className="hint-modal-overlay" onClick={() => setShowHint(false)}>
          <div className="hint-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hint-icon">💡</div>
            <h3>Passcode Hint</h3>
            <p>Date and Month</p>
            <button className="hint-close-btn" onClick={() => setShowHint(false)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  )
}

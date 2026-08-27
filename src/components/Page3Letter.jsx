import { useState } from 'react'
import './Page3Letter.css'

export default function Page3Letter({ onSuccess }) {
  const [isUnsealed, setIsUnsealed] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const handleUnseal = () => {
    setIsUnsealed(true)
  }

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio)
  }

  return (
    <div className="page3-letter-container">
      {!isUnsealed && (
        <div className="letter-header">
          <h2 className="section-title">a letter for you</h2>
          <p className="section-subtitle">read at your own pace 📜</p>
        </div>
      )}

      {!isUnsealed ? (
        /* Quilled Floral Birthday Card (matching reference) */
        <div className="quilled-card-wrapper" onClick={handleUnseal}>
          {/* Pink Envelope Backing Wings */}
          <div className="pink-envelope-wings"></div>

          {/* Main Square Greeting Card */}
          <div className="quilled-square-card">
            {/* Quilled Flowers & Envelope Pocket */}
            <div className="quilled-bouquet-area">
              <svg viewBox="0 0 240 200" className="quilled-bouquet-svg">
                {/* Branches & Berries */}
                <path d="M70,110 Q50,70 40,40" stroke="#5c4033" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="40" cy="40" r="5" fill="#e27d38" />
                <circle cx="52" cy="55" r="4" fill="#a277bd" />
                <circle cx="32" cy="58" r="4.5" fill="#e27d38" />

                <path d="M170,110 Q190,70 200,45" stroke="#5c4033" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="200" cy="45" r="5" fill="#e27d38" />
                <circle cx="188" cy="60" r="4" fill="#a277bd" />

                {/* Quilled Leaves */}
                <path d="M85,95 C65,75 75,55 95,65 C115,75 105,95 85,95 Z" fill="#4b8b42" stroke="#2d5a27" strokeWidth="1.5" />
                <path d="M155,95 C175,75 165,55 145,65 C125,75 135,95 155,95 Z" fill="#4b8b42" stroke="#2d5a27" strokeWidth="1.5" />
                <path d="M115,70 C105,45 125,35 130,55 Z" fill="#67a75d" stroke="#3b6e34" strokeWidth="1.5" />
                <path d="M135,70 C145,45 125,35 120,55 Z" fill="#67a75d" stroke="#3b6e34" strokeWidth="1.5" />

                {/* Left Purple Flower */}
                <g transform="translate(85, 95)">
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-16"
                      rx="8"
                      ry="15"
                      fill="#a277bd"
                      stroke="#7c5397"
                      strokeWidth="1.5"
                      transform={`rotate(${deg})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="7" fill="#ffd15c" stroke="#e6a826" strokeWidth="1.5" />
                </g>

                {/* Center Magenta Flower */}
                <g transform="translate(120, 85)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-18"
                      rx="9"
                      ry="17"
                      fill="#d85b96"
                      stroke="#b03e73"
                      strokeWidth="1.5"
                      transform={`rotate(${deg})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="8" fill="#ffd15c" stroke="#e6a826" strokeWidth="1.5" />
                </g>

                {/* Right Peach/Pink Flower */}
                <g transform="translate(155, 98)">
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-15"
                      rx="8"
                      ry="14"
                      fill="#f6b199"
                      stroke="#d9896f"
                      strokeWidth="1.5"
                      transform={`rotate(${deg})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="6" fill="#ffd15c" stroke="#e6a826" strokeWidth="1.5" />
                </g>

                {/* Tucked Tag: Just For You */}
                <g transform="translate(100, 105) rotate(-5)">
                  <rect x="0" y="0" width="48" height="22" rx="3" fill="#fffefb" stroke="#d5c4b1" strokeWidth="1.5" />
                  <text x="24" y="15" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="11" fontWeight="bold" fill="#5c4033">Just For You</text>
                </g>

                {/* Tan Envelope Front Pocket */}
                <polygon points="50,115 190,115 120,175" fill="#e8c89b" stroke="#cf9f67" strokeWidth="2" />
                <polygon points="50,115 120,150 190,115" fill="#f0d5ab" stroke="#cf9f67" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Handwritten Text */}
            <p className="quilled-card-title">Happy Birthday</p>
            <p className="quilled-card-sub">Udita 🤍</p>

            {/* Red Wax Seal Badge */}
            <div className="card-wax-seal">
              <span>♥</span>
            </div>
          </div>

          <p className="wax-hint">Tap card to open letter ✨</p>
        </div>
      ) : (
        /* Unfolded Letter Content */
        <div className="unfolded-letter-wrapper">
          <div className="letter-paper-sheet">
            <div className="paper-taped-corner"></div>

            <div className="letter-text-content">
              <h3 className="letter-salutation">My Dearest Udita,</h3>

              <p className="letter-paragraph">
                Happiest Birthday to the most special person in my life! Words could never truly express how much joy, laughter, and light you bring into my world every single day.
              </p>

              <p className="letter-paragraph">
                From your radiant smile that brightens up even the gloomiest days, to your boundless kindness and beautiful spirit — you are truly one of a kind. Every moment spent with you is a memory I treasure deeply.
              </p>

              <p className="letter-paragraph">
                Even when distance separates us, know that my heart is always right beside you. I wish I could be there to celebrate with you in person today, but I hope this site brings a big smile to your face!
              </p>

              <p className="letter-paragraph">
                May this year bring you endless happiness, all the success you dream of, and countless beautiful moments. You deserve all the love in the universe.
              </p>

              <div className="letter-signoff-block">
                <p className="signoff-line">Forever & always,</p>
                <p className="signature-name">With all my love ♥</p>
              </div>
            </div>
          </div>

          {/* Action button OUTSIDE & BELOW the letter paper sheet */}
          <div className="letter-action-footer">
            <button className="continue-btn" onClick={onSuccess}>
              Continue to Our Memories 📷 →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import './Page7Surprise.css'

const QUOTES_DATA = [
  {
    id: 1,
    quote: "Udita is 99% sweet, 1% dramatic, and 100% the queen of our hearts! 👑✨",
    options: ['Chintan', 'Her Best Friend', 'Udita Herself', 'Her Sister'],
    correct: 0,
    author: 'Chintan ♥',
    photo: '/media/1000022105.jpg.jpeg',
    caption: '“Chintan said this while admiring how cute and dramatic Udita gets!”',
  },
  {
    id: 2,
    quote: "I only need 5 minutes to get ready... *arrives 3 hours later looking 10/10* 😂💅",
    options: ['Her Mom', 'Chintan', 'Udita', 'Her Roommate'],
    correct: 2,
    author: 'Udita 👑',
    photo: '/media/1000063558.jpg.jpeg',
    caption: '“Udita’s classic motto every single time we plan to go out!”',
  },
  {
    id: 3,
    quote: "Late night ice cream fixes literally 100% of all life problems! 🍦🍨",
    options: ['Her Bestie', 'Chintan', 'Udita', 'Foodie Club'],
    correct: 2,
    author: 'Udita 🍨',
    photo: '/media/1000086404.jpg.jpeg',
    caption: '“Udita at 12:00 AM whenever dessert or sweets are mentioned!”',
  },
  {
    id: 4,
    quote: "No matter how far we are, Udita makes every single day feel magical. 💖🌸",
    options: ['Chintan', 'Her Sister', 'Her Best Friend', 'Secret Admirer'],
    correct: 0,
    author: 'Chintan ♥',
    photo: '/media/1000076468.jpg.jpeg',
    caption: '“Chintan saying the sweetest truth about how special Udita is in his life!”',
  },
]

export default function Page7Surprise({ onSuccess }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [score, setScore] = useState(0)

  const currentQ = QUOTES_DATA[currentIdx]

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return
    setSelectedOpt(idx)
    setIsRevealed(true)

    if (idx === currentQ.correct) {
      setScore((prev) => prev + 100)
    }
  }

  const handleNextQuote = () => {
    if (currentIdx + 1 < QUOTES_DATA.length) {
      setCurrentIdx((prev) => prev + 1)
      setSelectedOpt(null)
      setIsRevealed(false)
    }
  }

  const isLastQuote = currentIdx + 1 === QUOTES_DATA.length

  return (
    <div className="page7-surprise-container">
      <div className="quote-header">
        <h2 className="section-title">who said it? 💌</h2>
        <p className="section-subtitle">guess who said these iconic lines about udita!</p>
      </div>

      {/* Progress Badge */}
      <div className="quote-progress-bar">
        <span>Quote {currentIdx + 1} of {QUOTES_DATA.length}</span>
        <span className="quote-score">Score: {score} pts</span>
      </div>

      {/* Quote Card */}
      <div className="quote-main-card">
        <div className="quote-marks">“</div>
        <p className="quote-text">{currentQ.quote}</p>
        <div className="quote-marks closing">”</div>

        {/* Options Grid */}
        <div className="quote-options-grid">
          {currentQ.options.map((opt, i) => {
            let optClass = 'quote-opt-btn'
            if (selectedOpt !== null) {
              if (i === currentQ.correct) optClass += ' correct'
              else if (i === selectedOpt) optClass += ' wrong'
            }

            return (
              <button
                key={i}
                className={optClass}
                onClick={() => handleSelectOption(i)}
                disabled={selectedOpt !== null}
              >
                <span className="quote-opt-icon">{['💌', '💖', '👑', '🌸'][i]}</span>
                <span className="quote-opt-label">{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Reveal Answer Card with Photo & Caption */}
        {isRevealed && (
          <div className="quote-reveal-card">
            <div className="reveal-author-block">
              <div className="reveal-avatar-wrapper">
                <img src={currentQ.photo} alt={currentQ.author} />
              </div>
              <div className="reveal-info">
                <h4 className="reveal-author-name">Said by: {currentQ.author}</h4>
                <p className="reveal-caption">{currentQ.caption}</p>
              </div>
            </div>

            {!isLastQuote ? (
              <button className="next-quote-btn" onClick={handleNextQuote}>
                Next Quote →
              </button>
            ) : (
              <button className="continue-btn" onClick={onSuccess}>
                Proceed to Birthday Cake 🎂 →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Continue Action if completed */}
      {isLastQuote && isRevealed && (
        <div className="surprise-footer-action">
          <button className="continue-btn" onClick={onSuccess}>
            Proceed to Birthday Cake 🎂 →
          </button>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import './Letter.css'

export default function Letter({ show }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setTimeout(() => setVisible(true), 300)
    }
  }, [show])

  return (
    <div className={`letter-section ${visible ? 'visible' : ''}`}>
      {/* Left - Letter on lined paper */}
      <div className="letter-paper">
        <div className="paper-tape"></div>
        <div className="paper-content">
          <div className="paper-lines">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="paper-line"></div>
            ))}
          </div>

          <div className="letter-text">
            <h2 className="letter-greeting">For You</h2>

            <p className="letter-body">
              Happy Birthday to the most amazing, beautiful, and wonderful person I know! 
              Every single day with you feels like a celebration, and today is all about you.
            </p>
            <p className="letter-body">
              You make the world so much brighter just by being in it. Your smile lights up 
              every room, your laughter is my favorite sound, and your heart is the kindest 
              I've ever known.
            </p>
            <p className="letter-body">
              I wish I could be there to celebrate with you, but until then — I hope this little 
              surprise brings a smile to your face. You deserve all the happiness in the world 
              and so much more.
            </p>
            <p className="letter-body">
              Here's to another year of beautiful memories, endless laughter, and all the love 
              your heart can hold. 🤍
            </p>

            <p className="letter-sign-off">
              forever yours,<br />
              <span className="letter-name">with love ♥</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right - Photo collage with vinyl record */}
      <div className="letter-media">
        <div className="polaroid-stack">
          <div className="polaroid polaroid-1">
            <img src="/media/1000022105.jpg.jpeg" alt="us" />
          </div>
          <div className="polaroid polaroid-2">
            <img src="/media/1000063825.jpg.jpeg" alt="you" />
          </div>
        </div>

        <div className="vinyl-record">
          <div className="vinyl-outer">
            <div className="vinyl-grooves"></div>
            <div className="vinyl-label">
              <span className="vinyl-text">our song</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

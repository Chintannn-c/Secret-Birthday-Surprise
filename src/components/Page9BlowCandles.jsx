import { useState, useEffect, useRef } from 'react'
import FireworksCanvas from './FireworksCanvas'
import './Page9BlowCandles.css'

export default function Page9BlowCandles({ customCake, onSuccess, onRestart }) {
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [micActive, setMicActive] = useState(false)
  const [micLevel, setMicLevel] = useState(0)
  const [micError, setMicError] = useState('')
  const audioCtxRef = useRef(null)
  const streamRef = useRef(null)

  // Use custom cake from Page 8 or fallback defaults
  const cake = customCake || {
    tiers: 2,
    flavor: { color: '#f8a4b8', side: '#e88aa5' },
    frosting: { color: '#faf0dc', drip: '#ede0c8' },
    topping: { id: 'cherry' },
    candleCount: 3,
  }

  // Start Mic Detection
  const startMic = async () => {
    try {
      setMicError('')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      audioCtxRef.current = audioCtx

      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(analyser)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      setMicActive(true)

      const checkVolume = () => {
        if (!audioCtxRef.current) return
        analyser.getByteFrequencyData(dataArray)

        // Calculate average volume level
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const average = sum / dataArray.length
        setMicLevel(average)

        // Threshold for blow detection
        if (average > 40 && !candlesBlown) {
          triggerBlowOut()
        } else {
          requestAnimationFrame(checkVolume)
        }
      }

      checkVolume()
    } catch (err) {
      console.warn('Mic access denied or error:', err)
      setMicError('Mic access not granted. Use tap button below! 👇')
    }
  }

  const triggerBlowOut = () => {
    setCandlesBlown(true)
    // Clean up audio stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
    }
    setMicActive(false)
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="page9-blow-container">
      {candlesBlown && <FireworksCanvas />}

      <div className="blow-header">
        <h2 className="section-title">make a wish & blow</h2>
        <p className="section-subtitle">
          {!candlesBlown
            ? 'blow into your mic or tap below to extinguish the candles 🕯️'
            : 'your wish has been sent to the stars! ✨'}
        </p>
      </div>
      {/* Rendered Customized Cake with Lit Candles (Matching Image 2 Art Style) */}
      <div className="finale-cake-display">
        <svg viewBox="0 0 300 340" className="illustrated-cake-svg">
          <defs>
            <radialGradient id="flameOuterGrad" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#ffb703" />
              <stop offset="85%" stopColor="#ff4800" />
            </radialGradient>
            <radialGradient id="flameGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe600" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ff7700" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff4500" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Table Shadow */}
          <ellipse cx="150" cy="312" rx="110" ry="14" fill="rgba(74, 55, 40, 0.12)" />

          {/* Cake Stand Plate */}
          <ellipse cx="150" cy="298" rx="122" ry="16" fill="#f4ebd9" stroke="#3d2a1d" strokeWidth="2.8" />
          <path d="M 132 298 L 132 310 L 168 310 L 168 298 Z" fill="#e5d4be" stroke="#3d2a1d" strokeWidth="2.5" />

          {/* TIER 1 (BASE TIER) */}
          <g className="cake-tier-base">
            <path
              d="M 40 245 A 110 24 0 0 0 260 245 L 260 295 A 110 24 0 0 1 40 295 Z"
              fill={cake.flavor.color}
              stroke="#3d2a1d"
              strokeWidth="2.8"
            />
            <ellipse cx="150" cy="245" rx="110" ry="24" fill={cake.flavor.color} stroke="#3d2a1d" strokeWidth="2.8" />
            
            {/* Tier 1 Organic Drips */}
            <path
              d="M 40 245 
                 C 50 268, 65 275, 75 250
                 C 85 278, 105 282, 115 248
                 C 125 272, 145 278, 155 245
                 C 165 275, 185 280, 195 248
                 C 205 270, 225 274, 235 248
                 C 245 266, 255 258, 260 245
                 A 110 24 0 0 0 40 245 Z"
              fill={cake.frosting.color}
              stroke="#3d2a1d"
              strokeWidth="2.5"
            />
            <ellipse cx="150" cy="245" rx="108" ry="23" fill={cake.frosting.color} />
          </g>

          {/* TIER 2 (MIDDLE TIER) */}
          {cake.tiers >= 2 && (
            <g className="cake-tier-mid">
              <path
                d="M 68 185 A 82 20 0 0 0 232 185 L 232 240 A 82 20 0 0 1 68 240 Z"
                fill={cake.flavor.color}
                stroke="#3d2a1d"
                strokeWidth="2.8"
              />
              <ellipse cx="150" cy="185" rx="82" ry="20" fill={cake.flavor.color} stroke="#3d2a1d" strokeWidth="2.8" />

              {/* Tier 2 Organic Drips */}
              <path
                d="M 68 185
                   C 78 208, 92 214, 102 188
                   C 112 212, 130 216, 140 185
                   C 150 210, 170 214, 180 188
                   C 190 208, 210 212, 220 188
                   C 226 202, 230 196, 232 185
                   A 82 20 0 0 0 68 185 Z"
                fill={cake.frosting.color}
                stroke="#3d2a1d"
                strokeWidth="2.5"
              />
              <ellipse cx="150" cy="185" rx="80" ry="19" fill={cake.frosting.color} />
            </g>
          )}

          {/* TIER 3 (TOP TIER) */}
          {cake.tiers >= 3 && (
            <g className="cake-tier-top">
              <path
                d="M 92 125 A 58 16 0 0 0 208 125 L 208 175 A 58 16 0 0 1 92 175 Z"
                fill={cake.flavor.color}
                stroke="#3d2a1d"
                strokeWidth="2.8"
              />
              <ellipse cx="150" cy="125" rx="58" ry="16" fill={cake.flavor.color} stroke="#3d2a1d" strokeWidth="2.8" />

              {/* Tier 3 Organic Drips */}
              <path
                d="M 92 125
                   C 100 145, 114 148, 122 127
                   C 130 147, 146 150, 154 125
                   C 162 145, 178 148, 186 127
                   C 194 142, 204 138, 208 125
                   A 58 16 0 0 0 92 125 Z"
                fill={cake.frosting.color}
                stroke="#3d2a1d"
                strokeWidth="2.5"
              />
              <ellipse cx="150" cy="125" rx="56" ry="15" fill={cake.frosting.color} />
            </g>
          )}

          {/* TOPPING & CANDLES */}
          {(() => {
            const topY = cake.tiers === 3 ? 125 : cake.tiers === 2 ? 185 : 245

            let candleOffsets = [0]
            if (cake.candleCount === 2) candleOffsets = [-15, 15]
            if (cake.candleCount === 3) candleOffsets = [-20, 0, 20]
            if (cake.candleCount === 4) candleOffsets = [-28, -9, 9, 28]
            if (cake.candleCount === 5) candleOffsets = [-34, -17, 0, 17, 34]

            return (
              <g className="top-decorations">
                {cake.topping.id === 'cherry' && (
                  <>
                    {[-50, 0, 50].map((xOffset, idx) => {
                      const cherryY = xOffset === 0 ? topY + 6 : topY + 2
                      const stemCurve = xOffset < 0 ? -18 : xOffset > 0 ? 18 : -10
                      const stemEnd = xOffset < 0 ? -28 : xOffset > 0 ? 28 : -14

                      return (
                        <g key={idx} transform={`translate(${150 + xOffset}, ${cherryY})`}>
                          <path
                            d={`M 0 -6 Q ${stemCurve} -22 ${stemEnd} -32`}
                            fill="none"
                            stroke="#3d2a1d"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <circle cx="0" cy="0" r="9.5" fill="#e63946" stroke="#3d2a1d" strokeWidth="2.2" />
                          <circle cx="-3" cy="-3" r="2.5" fill="#ffffff" opacity="0.7" />
                        </g>
                      )
                    })}
                  </>
                )}

                {cake.topping.id === 'strawberry' && (
                  <>
                    {[-44, 0, 44].map((xOffset, idx) => (
                      <g key={idx} transform={`translate(${150 + xOffset}, ${topY + 3})`}>
                        <path d="M 0 -10 C 10 -10, 8 6, 0 12 C -8 6, -10 -10, 0 -10 Z" fill="#e63946" stroke="#3d2a1d" strokeWidth="2" />
                        <path d="M -5 -10 Q 0 -15 5 -10 Z" fill="#2a9d8f" stroke="#3d2a1d" strokeWidth="1.6" />
                      </g>
                    ))}
                  </>
                )}

                {cake.topping.id === 'sprinkles' && (
                  <>
                    {[-42, -21, 0, 21, 42].map((xOffset, idx) => (
                      <rect
                        key={idx}
                        x={150 + xOffset}
                        y={topY + 3}
                        width="11"
                        height="3.8"
                        rx="2"
                        fill={['#ff4d6d', '#ffb703', '#3a86ff', '#8338ec', '#06d6a0'][idx]}
                        stroke="#3d2a1d"
                        strokeWidth="1.4"
                        transform={`rotate(${idx * 25}, ${150 + xOffset}, ${topY + 3})`}
                      />
                    ))}
                  </>
                )}

                {cake.topping.id === 'flowers' && (
                  <>
                    {[-42, 0, 42].map((xOffset, idx) => (
                      <g key={idx} transform={`translate(${150 + xOffset}, ${topY + 2})`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <circle key={i} cx={6.5 * Math.cos(i * 1.25)} cy={6.5 * Math.sin(i * 1.25)} r="5" fill="#ffb4a2" stroke="#3d2a1d" strokeWidth="1.4" />
                        ))}
                        <circle cx="0" cy="0" r="3.5" fill="#ffb703" stroke="#3d2a1d" strokeWidth="1.4" />
                      </g>
                    ))}
                  </>
                )}

                {/* CANDLES */}
                {candleOffsets.map((xOffset, i) => (
                  <g key={i} transform={`translate(${150 + xOffset}, ${topY - 14})`} className="illustrated-candle">
                    {/* Candle Shadow Base */}
                    <ellipse cx="0" cy="0" rx="5" ry="2" fill="rgba(61, 42, 29, 0.18)" />

                    {/* Candle Body */}
                    <rect x="-4.5" y="-35" width="9" height="35" rx="2.5" fill="#ffffff" stroke="#3d2a1d" strokeWidth="2" />

                    {/* Pink Stripes */}
                    <line x1="-3.5" y1="-30" x2="3.5" y2="-26" stroke="#ff4d6d" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="-3.5" y1="-20" x2="3.5" y2="-16" stroke="#ff4d6d" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="-3.5" y1="-10" x2="3.5" y2="-6" stroke="#ff4d6d" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Candle Wick */}
                    <line x1="0" y1="-35" x2="0" y2="-38" stroke="#3d2a1d" strokeWidth="1.8" strokeLinecap="round" />

                    {/* Flame or Smoke */}
                    {!candlesBlown ? (
                      <g transform="translate(0, -38)">
                        <g className={`animated-flame flame-delay-${i % 3}`}>
                          {/* Glowing Aura */}
                          <circle cx="0" cy="-7" r="14" fill="url(#flameGlowGrad)" className="flame-aura-pulse" />
                          <path d="M 0 -16 Q 7 -6 0 0 Q -7 -6 0 -16 Z" fill="url(#flameOuterGrad)" stroke="#3d2a1d" strokeWidth="1.3" />
                          <path d="M 0 -11 Q 4 -4 0 0 Q -4 -4 0 -11 Z" fill="#ffea00" />
                          <path d="M 0 -7 Q 2 -2 0 0 Q -2 -2 0 -7 Z" fill="#ffffff" />
                        </g>
                      </g>
                    ) : (
                      <g transform="translate(0, -38)">
                        <g className="smoke-animation-group">
                          <circle cx="0" cy="-8" r="4" fill="#aaaaaa" opacity="0.6" />
                          <circle cx="3" cy="-18" r="6" fill="#888888" opacity="0.4" />
                          <circle cx="-4" cy="-28" r="8" fill="#666666" opacity="0.25" />
                          <path d="M 0 0 Q -5 -12 3 -22 Q -3 -30 0 -36" fill="none" stroke="#888888" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                        </g>
                      </g>
                    )}
                  </g>
                ))}
              </g>
            )
          })()}
        </svg>
      </div>

      {/* Controls & Mic Meter */}
      {!candlesBlown ? (
        <div className="blow-controls-panel">
          {!micActive ? (
            <button className="mic-enable-btn" onClick={startMic}>
              🎙️ Enable Mic to Blow Candles
            </button>
          ) : (
            <div className="mic-active-meter">
              <span>🎙️ Listening... Blow into mic!</span>
              <div className="meter-bar-track">
                <div
                  className="meter-bar-fill"
                  style={{ width: `${Math.min((micLevel / 60) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {micError && <p className="mic-error-text">{micError}</p>}

          <button className="tap-blow-btn" onClick={triggerBlowOut}>
            💨 Tap Here to Blow Out Candles
          </button>
        </div>
      ) : (
        /* Final Celebration Card */
        <div className="finale-celebration-card">
          <div className="celebration-emojis">🎉 💖 👑 🎂 ✨</div>
          <h3>Happy Birthday Udita!</h3>
          <p className="celebration-message">
            May all your dreams come true, your smile stay ever so bright, and your year ahead be filled with endless happiness, love, and magic! 💗
          </p>
          <button className="continue-btn" onClick={onSuccess}>
            See Final Birthday Surprise 🎉 →
          </button>
        </div>
      )}
    </div>
  )
}

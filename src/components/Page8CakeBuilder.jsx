import { useState } from 'react'
import './Page8CakeBuilder.css'

const FLAVORS = [
  { id: 'strawberry', label: 'Strawberry 🍓', color: '#f492a5', side: '#d87087' },
  { id: 'chocolate', label: 'Chocolate 🍫', color: '#6b4028', side: '#4a2c1a' },
  { id: 'vanilla', label: 'Vanilla 🍦', color: '#f5e6c8', side: '#e8d4a0' },
  { id: 'velvet', label: 'Red Velvet 🍰', color: '#a82e2e', side: '#7e1d1d' },
  { id: 'matcha', label: 'Matcha 🍵', color: '#9bb88e', side: '#7a966d' },
]

const FROSTINGS = [
  { id: 'pink', label: 'Pastel Pink 💗', color: '#f8b4c8', drip: '#e890a8' },
  { id: 'cream', label: 'Classic Cream 🍦', color: '#faf0dc', drip: '#ede0c8' },
  { id: 'lavender', label: 'Lavender 💜', color: '#c9b8d9', drip: '#b09cc4' },
  { id: 'blue', label: 'Baby Blue 🩵', color: '#b2d8d8', drip: '#97c4c4' },
  { id: 'mint', label: 'Fresh Mint 🍃', color: '#c5e8c5', drip: '#abd4ab' },
]

const TOPPINGS = [
  { id: 'cherry', label: 'Cherries 🍒' },
  { id: 'strawberry', label: 'Strawberries 🍓' },
  { id: 'sprinkles', label: 'Rainbow Sprinkles ✨' },
  { id: 'flowers', label: 'Flowers 🌸' },
]

export default function Page8CakeBuilder({ initialCake, onSuccess }) {
  const [wizardStep, setWizardStep] = useState(1)
  const [tiers, setTiers] = useState(initialCake?.tiers || 2)
  const [flavor, setFlavor] = useState(initialCake?.flavor || FLAVORS[0])
  const [frosting, setFrosting] = useState(initialCake?.frosting || FROSTINGS[0])
  const [topping, setTopping] = useState(initialCake?.topping || TOPPINGS[0])
  const [candleCount, setCandleCount] = useState(initialCake?.candleCount || 3)

  const handleSaveAndLight = () => {
    const customCake = {
      tiers,
      flavor,
      frosting,
      topping,
      candleCount,
    }
    onSuccess(customCake)
  }

  return (
    <div className="page8-cake-container">
      <div className="cake-studio-header">
        <h2 className="section-title">custom cake studio</h2>
        <p className="section-subtitle">bake your dream cake for the birthday wish 🎂</p>
      </div>

      <div className="cake-studio-layout">
        {/* Live Illustrated 3D SVG Cake Preview (Matching Image 2 Art Style) */}
        <div className="live-cake-preview-card">
          <div className="studio-top-badge">✨ Udita's Cake Studio ✨</div>

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
              {/* Tier 1 Body */}
              <path
                d="M 40 245 A 110 24 0 0 0 260 245 L 260 295 A 110 24 0 0 1 40 295 Z"
                fill={flavor.color}
                stroke="#3d2a1d"
                strokeWidth="2.8"
              />
              {/* Tier 1 Top Oval */}
              <ellipse cx="150" cy="245" rx="110" ry="24" fill={flavor.color} stroke="#3d2a1d" strokeWidth="2.8" />
              
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
                fill={frosting.color}
                stroke="#3d2a1d"
                strokeWidth="2.5"
              />
              <ellipse cx="150" cy="245" rx="108" ry="23" fill={frosting.color} />
            </g>

            {/* TIER 2 (MIDDLE TIER) - Rendered if tiers >= 2 */}
            {tiers >= 2 && (
              <g className="cake-tier-mid">
                {/* Tier 2 Body */}
                <path
                  d="M 68 185 A 82 20 0 0 0 232 185 L 232 240 A 82 20 0 0 1 68 240 Z"
                  fill={flavor.color}
                  stroke="#3d2a1d"
                  strokeWidth="2.8"
                />
                {/* Tier 2 Top Oval */}
                <ellipse cx="150" cy="185" rx="82" ry="20" fill={flavor.color} stroke="#3d2a1d" strokeWidth="2.8" />

                {/* Tier 2 Organic Drips */}
                <path
                  d="M 68 185
                     C 78 208, 92 214, 102 188
                     C 112 212, 130 216, 140 185
                     C 150 210, 170 214, 180 188
                     C 190 208, 210 212, 220 188
                     C 226 202, 230 196, 232 185
                     A 82 20 0 0 0 68 185 Z"
                  fill={frosting.color}
                  stroke="#3d2a1d"
                  strokeWidth="2.5"
                />
                <ellipse cx="150" cy="185" rx="80" ry="19" fill={frosting.color} />
              </g>
            )}

            {/* TIER 3 (TOP TIER) - Rendered if tiers >= 3 */}
            {tiers >= 3 && (
              <g className="cake-tier-top">
                {/* Tier 3 Body */}
                <path
                  d="M 92 125 A 58 16 0 0 0 208 125 L 208 175 A 58 16 0 0 1 92 175 Z"
                  fill={flavor.color}
                  stroke="#3d2a1d"
                  strokeWidth="2.8"
                />
                {/* Tier 3 Top Oval */}
                <ellipse cx="150" cy="125" rx="58" ry="16" fill={flavor.color} stroke="#3d2a1d" strokeWidth="2.8" />

                {/* Tier 3 Organic Drips */}
                <path
                  d="M 92 125
                     C 100 145, 114 148, 122 127
                     C 130 147, 146 150, 154 125
                     C 162 145, 178 148, 186 127
                     C 194 142, 204 138, 208 125
                     A 58 16 0 0 0 92 125 Z"
                  fill={frosting.color}
                  stroke="#3d2a1d"
                  strokeWidth="2.5"
                />
                <ellipse cx="150" cy="125" rx="56" ry="15" fill={frosting.color} />
              </g>
            )}

            {/* TOPPING & CANDLES */}
            {(() => {
              const topY = tiers === 3 ? 125 : tiers === 2 ? 185 : 245

              // Calculate distinct Candle offsets
              let candleOffsets = [0]
              if (candleCount === 2) candleOffsets = [-15, 15]
              if (candleCount === 3) candleOffsets = [-20, 0, 20]
              if (candleCount === 4) candleOffsets = [-28, -9, 9, 28]
              if (candleCount === 5) candleOffsets = [-34, -17, 0, 17, 34]

              return (
                <g className="top-decorations">
                  {/* Toppings (Placed on Front Lip & Sides of Cake Oval so Candles stand cleanly behind) */}
                  {topping.id === 'cherry' && (
                    <>
                      {/* 3 Cherries placed at outer positions with stems curving OUTWARDS away from candles */}
                      {[-50, 0, 50].map((xOffset, idx) => {
                        const cherryY = xOffset === 0 ? topY + 6 : topY + 2
                        const stemCurve = xOffset < 0 ? -18 : xOffset > 0 ? 18 : -10
                        const stemEnd = xOffset < 0 ? -28 : xOffset > 0 ? 28 : -14

                        return (
                          <g key={idx} transform={`translate(${150 + xOffset}, ${cherryY})`}>
                            {/* Outward Curving Stem */}
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

                  {topping.id === 'strawberry' && (
                    <>
                      {[-44, 0, 44].map((xOffset, idx) => (
                        <g key={idx} transform={`translate(${150 + xOffset}, ${topY + 3})`}>
                          <path d="M 0 -10 C 10 -10, 8 6, 0 12 C -8 6, -10 -10, 0 -10 Z" fill="#e63946" stroke="#3d2a1d" strokeWidth="2" />
                          <path d="M -5 -10 Q 0 -15 5 -10 Z" fill="#2a9d8f" stroke="#3d2a1d" strokeWidth="1.6" />
                        </g>
                      ))}
                    </>
                  )}

                  {topping.id === 'sprinkles' && (
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

                  {topping.id === 'flowers' && (
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

                  {/* CANDLES (Standing cleanly behind/between toppings) */}
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

                      {/* Flame */}
                      <g transform="translate(0, -38)">
                        <g className={`animated-flame flame-delay-${i % 3}`}>
                          {/* Glowing Aura */}
                          <circle cx="0" cy="-7" r="14" fill="url(#flameGlowGrad)" className="flame-aura-pulse" />
                          <path d="M 0 -16 Q 7 -6 0 0 Q -7 -6 0 -16 Z" fill="url(#flameOuterGrad)" stroke="#3d2a1d" strokeWidth="1.3" />
                          <path d="M 0 -11 Q 4 -4 0 0 Q -4 -4 0 -11 Z" fill="#ffea00" />
                          <path d="M 0 -7 Q 2 -2 0 0 Q -2 -2 0 -7 Z" fill="#ffffff" />
                        </g>
                      </g>
                    </g>
                  ))}
                </g>
              )
            })()}
          </svg>
        </div>

        {/* Customization Options Panel - Step-by-Step Wizard */}
        <div className="cake-options-panel">
          {/* Step Progress Header */}
          <div className="cake-wizard-progress">
            <span className="wizard-step-tag">Step {wizardStep} of 4</span>
            <span className="wizard-step-title">
              {wizardStep === 1 && '🎂 Choose Cake Tiers'}
              {wizardStep === 2 && '🍫 Pick Base Flavor'}
              {wizardStep === 3 && '💗 Choose Frosting Color'}
              {wizardStep === 4 && '🍓 Toppings & 🕯️ Candles'}
            </span>
          </div>

          {/* Step 1: Tiers */}
          {wizardStep === 1 && (
            <div className="option-group wizard-group-card">
              <label className="option-label">Select Tiers Height:</label>
              <div className="pill-group vertical-pills">
                {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    className={`pill-btn large-pill ${tiers === t ? 'active' : ''}`}
                    onClick={() => setTiers(t)}
                  >
                    🎂 {t} {t === 1 ? 'Tier Cake' : 'Tiers Cake'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Base Flavor */}
          {wizardStep === 2 && (
            <div className="option-group wizard-group-card">
              <label className="option-label">Select Sponge Flavor:</label>
              <div className="option-grid">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    className={`swatch-btn ${flavor.id === f.id ? 'active' : ''}`}
                    onClick={() => setFlavor(f)}
                  >
                    <span className="color-swatch" style={{ background: f.color }}></span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Frosting */}
          {wizardStep === 3 && (
            <div className="option-group wizard-group-card">
              <label className="option-label">Select Drip Frosting:</label>
              <div className="option-grid">
                {FROSTINGS.map((fr) => (
                  <button
                    key={fr.id}
                    className={`swatch-btn ${frosting.id === fr.id ? 'active' : ''}`}
                    onClick={() => setFrosting(fr)}
                  >
                    <span className="color-swatch" style={{ background: fr.color }}></span>
                    <span>{fr.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Toppings & Candles */}
          {wizardStep === 4 && (
            <div className="option-group wizard-group-card">
              <label className="option-label">Select Top Decorative Toppings:</label>
              <div className="option-grid" style={{ marginBottom: '6px' }}>
                {TOPPINGS.map((top) => (
                  <button
                    key={top.id}
                    className={`swatch-btn ${topping.id === top.id ? 'active' : ''}`}
                    onClick={() => setTopping(top)}
                  >
                    <span>{top.label}</span>
                  </button>
                ))}
              </div>

              <label className="option-label">Candles Count:</label>
              <div className="pill-group candle-select-group">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`pill-btn candle-pill ${candleCount === num ? 'active' : ''}`}
                    onClick={() => setCandleCount(num)}
                  >
                    <span className="candle-pill-flame">🕯️</span>
                    <span>{num} {num === 1 ? 'Candle' : 'Candles'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Step Navigation Buttons */}
          <div className="cake-wizard-nav-bar">
            {wizardStep > 1 && (
              <button
                className="wizard-back-step-btn"
                onClick={() => setWizardStep((prev) => prev - 1)}
              >
                ← Back Step
              </button>
            )}

            {wizardStep < 4 ? (
              <button
                className="wizard-next-step-btn"
                onClick={() => setWizardStep((prev) => prev + 1)}
              >
                Next Step →
              </button>
            ) : (
              <button className="save-cake-btn" onClick={handleSaveAndLight}>
                Light Candles & Make Wish 🕯️ →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

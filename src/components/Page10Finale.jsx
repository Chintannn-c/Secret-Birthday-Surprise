import { useState, useRef, useEffect } from 'react'
import './Page10Finale.css'

const FINALE_PHOTOS = [
  { src: '/media/1000022103.jpg.jpeg', caption: 'Our favorite smiles ✨' },
  { src: '/media/1000063558.jpg.jpeg', caption: 'Sweetest moments 💖' },
  { src: '/media/1000022105.jpg.jpeg', caption: 'Together forever 👑' },
]

const FLOATING_MEMORIES = [
  {
    src: '/media/1000022103.jpg.jpeg',
    caption: 'That one crazy day 😂',
    start: 0.08,
    end: 0.44,
    xPos: '10%',
    rot: -6,
    isRight: false,
    layerClass: 'layer-bg',
  },
  {
    src: '/media/1000063558.jpg.jpeg',
    caption: 'One of my favorite memories ❤️',
    start: 0.18,
    end: 0.54,
    xPos: '14%',
    rot: 7,
    isRight: true,
    layerClass: 'layer-main',
  },
  {
    src: '/media/1000063825.jpg.jpeg',
    caption: 'This smile 🥹',
    start: 0.30,
    end: 0.66,
    xPos: '22%',
    rot: -4,
    isRight: false,
    layerClass: 'layer-fg',
  },
  {
    src: '/media/1000076468.jpg.jpeg',
    caption: 'Never forget this moment ✨',
    start: 0.42,
    end: 0.76,
    xPos: '18%',
    rot: 6,
    isRight: true,
    layerClass: 'layer-main',
  },
  {
    src: '/media/1000086404.jpg.jpeg',
    caption: 'We really had too much fun 😂',
    start: 0.54,
    end: 0.86,
    xPos: '12%',
    rot: -7,
    isRight: false,
    layerClass: 'layer-fg',
  },
  {
    src: '/media/1000063562.jpg.jpeg',
    caption: 'A memory worth keeping forever ❤️',
    start: 0.66,
    end: 0.94,
    xPos: '12%',
    rot: 5,
    isRight: true,
    layerClass: 'layer-bg',
  },
]

export default function Page10Finale({ onRestart, onOpenScanCard }) {
  const audioRef = useRef(null)

  // Scroll Track Refs & Progress States (0 to 1)
  const letterTrackRef = useRef(null)
  const memoriesTrackRef = useRef(null)
  const [letterProgress, setLetterProgress] = useState(0)
  const [memoriesProgress, setMemoriesProgress] = useState(0)

  useEffect(() => {
    const scrollContainer = document.querySelector('.browser-content') || window

    const handleScroll = () => {
      const containerHeight = scrollContainer.clientHeight || window.innerHeight

      // 1. Calculate Birthday Letter Scroll Progress
      if (letterTrackRef.current) {
        const rect = letterTrackRef.current.getBoundingClientRect()
        const totalDist = rect.height - containerHeight
        if (totalDist > 0) {
          const scrolled = -rect.top
          setLetterProgress(Math.max(0, Math.min(1, scrolled / totalDist)))
        }
      }

      // 2. Calculate Floating Memories Scroll Progress
      if (memoriesTrackRef.current) {
        const rect = memoriesTrackRef.current.getBoundingClientRect()
        const totalDist = rect.height - containerHeight
        if (totalDist > 0) {
          const scrolled = -rect.top
          setMemoriesProgress(Math.max(0, Math.min(1, scrolled / totalDist)))
        }
      }
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Linear Interpolation helper
  const interpolate = (progress, start, end, fromVal, toVal) => {
    if (progress <= start) return fromVal
    if (progress >= end) return toVal
    const ratio = (progress - start) / (end - start)
    return fromVal + ratio * (toVal - fromVal)
  }

  // --- SLOWED LETTER SECTION CALCULATIONS ---
  const envelopeScale = interpolate(letterProgress, 0.0, 0.25, 0.65, 1.0)
  const envelopeOpacity = interpolate(letterProgress, 0.0, 0.15, 0.4, 1.0)
  const overlayOpacity = interpolate(letterProgress, 0.05, 0.25, 0, 0.88)

  const flapRotateX = interpolate(letterProgress, 0.25, 0.42, 0, -180)
  const paperSlideY = interpolate(letterProgress, 0.30, 0.50, 60, -40)

  // Flying Polaroids (Spread across 0.40 -> 0.90)
  const p1X = interpolate(letterProgress, 0.40, 0.58, -120, 0)
  const p1Y = interpolate(letterProgress, 0.40, 0.58, -120, 0)
  const p1Rot = interpolate(letterProgress, 0.40, 0.58, -35, -6)
  const p1Op = interpolate(letterProgress, 0.40, 0.52, 0, 1)

  const p2X = interpolate(letterProgress, 0.54, 0.72, -120, 0)
  const p2Y = interpolate(letterProgress, 0.54, 0.72, -120, 0)
  const p2Rot = interpolate(letterProgress, 0.54, 0.72, -30, 5)
  const p2Op = interpolate(letterProgress, 0.54, 0.64, 0, 1)

  const p3X = interpolate(letterProgress, 0.68, 0.86, -120, 0)
  const p3Y = interpolate(letterProgress, 0.68, 0.86, -120, 0)
  const p3Rot = interpolate(letterProgress, 0.68, 0.86, -25, -3)
  const p3Op = interpolate(letterProgress, 0.68, 0.78, 0, 1)

  // Paragraphs Rising from Below (Spread across 0.45 -> 0.95)
  const p1TextY = interpolate(letterProgress, 0.45, 0.62, 70, 0)
  const p1TextOp = interpolate(letterProgress, 0.45, 0.58, 0, 1)

  const p2TextY = interpolate(letterProgress, 0.62, 0.78, 70, 0)
  const p2TextOp = interpolate(letterProgress, 0.62, 0.74, 0, 1)

  const p3TextY = interpolate(letterProgress, 0.78, 0.92, 70, 0)
  const p3TextOp = interpolate(letterProgress, 0.78, 0.88, 0, 1)

  const signY = interpolate(letterProgress, 0.90, 1.00, 40, 0)
  const signOp = interpolate(letterProgress, 0.90, 0.98, 0, 1)

  // --- SLOWED FLOATING MEMORIES SECTION CALCULATIONS ---
  const memTitleOp = interpolate(memoriesProgress, 0.0, 0.15, 0, 1)
  const memTitleY = interpolate(memoriesProgress, 0.0, 0.15, 30, 0)

  const finalPhotoScale = interpolate(memoriesProgress, 0.80, 0.94, 0.85, 1.0)
  const finalPhotoOp = interpolate(memoriesProgress, 0.78, 0.90, 0, 1)

  const finalLine1Op = interpolate(memoriesProgress, 0.86, 0.94, 0, 1)
  const finalLine1Y = interpolate(memoriesProgress, 0.86, 0.94, 25, 0)

  const finalLine2Op = interpolate(memoriesProgress, 0.92, 0.98, 0, 1)
  const finalLine2Y = interpolate(memoriesProgress, 0.92, 0.98, 25, 0)

  const finalConfettiOp = interpolate(memoriesProgress, 0.88, 0.99, 0, 1)

  const getFloatingStyle = (mem) => {
    const { start, end, xPos, rot, isRight } = mem
    if (memoriesProgress < start - 0.05 || memoriesProgress > end + 0.05) {
      return { display: 'none' }
    }

    const yVh = interpolate(memoriesProgress, start, end, 120, -120)

    let opacity = 1
    if (yVh > 75) opacity = interpolate(yVh, 120, 75, 0, 1)
    if (yVh < -75) opacity = interpolate(yVh, -75, -120, 1, 0)

    let capOp = 0
    let capY = 10
    if (yVh <= 65 && yVh >= -45) {
      capOp = interpolate(yVh, 65, 35, 0, 1)
      capY = interpolate(yVh, 65, 35, 10, 0)
    }

    return {
      transform: `translateY(${yVh}vh) rotate(${rot}deg)`,
      opacity,
      position: 'absolute',
      ...(isRight ? { right: xPos } : { left: xPos }),
      capOp,
      capY,
    }
  }

  return (
    <div className="page10-finale-container">
      {/* Hidden Audio Player for Actual Song Playback */}
      <audio ref={audioRef} src="/media/romantic_song.mp4" loop />

      {/* 1. Hero Editorial Banner */}
      <div className="finale-hero-banner">
        <div className="hero-img-overlay">
          <img src="/media/Page10HeroPhoto.jpeg" alt="Udita & Chintan" className="hero-bg-photo" />
          <div className="hero-dark-scrim"></div>
        </div>
        <div className="hero-text-content">
          <span className="hero-age-tag">2026 EDITION</span>
          <h1 className="hero-main-title">HAPPY BIRTHDAY,</h1>
          <span className="hero-script-overlay">Uditaaaaaaa</span>
          <p className="hero-scroll-hint">Scroll down slowly to open your birthday letter 💌 ↓</p>
        </div>
      </div>

      {/* 2. Full-Screen Cinematic Scroll-Driven Letter Section */}
      <div ref={letterTrackRef} className="cinematic-letter-track">
        <div className="cinematic-sticky-viewport">
          <div className="cinematic-bg-overlay" style={{ opacity: overlayOpacity }}></div>

          <div
            className="cinematic-envelope-wrapper"
            style={{
              transform: `scale(${envelopeScale})`,
              opacity: envelopeOpacity,
            }}
          >
            <div className="envelope-back-pocket"></div>

            <div
              className="envelope-top-flap"
              style={{
                transform: `rotateX(${flapRotateX}deg)`,
                transformOrigin: 'top center',
              }}
            >
              <div className="wax-seal-badge">♥</div>
            </div>

            <div
              className="letter-paper-sheet"
              style={{
                transform: `translateY(${paperSlideY}px)`,
              }}
            >
              <div className="letter-header-row">
                <span className="letter-sub-tag">A Birthday Note For My Love 🤍</span>
                <h2 className="letter-recipient-title">Dearest Udita,</h2>
              </div>

              <div className="letter-body-paragraphs">
                <p
                  className="letter-paragraph"
                  style={{
                    transform: `translateY(${p1TextY}px)`,
                    opacity: p1TextOp,
                  }}
                >
                  Happy Birthday to the girl who fills my entire world with warmth, laughter, and endless magic. From the moment you entered my life, every day has felt infinitely brighter and more beautiful.
                </p>

                <p
                  className="letter-paragraph"
                  style={{
                    transform: `translateY(${p2TextY}px)`,
                    opacity: p2TextOp,
                  }}
                >
                  I cherish every single memory we've created together — every laugh, every quiet late-night talk, every silly joke, and every adventure. You are my constant comfort, my favorite cheerleader, and my absolute best friend.
                </p>

                <p
                  className="letter-paragraph"
                  style={{
                    transform: `translateY(${p3TextY}px)`,
                    opacity: p3TextOp,
                  }}
                >
                  As you blow out your candles today, know that my biggest wish has already come true: having you by my side. May this year bring you all the happiness, sweet dreams, and love your wonderful heart deserves.
                </p>

                <div
                  className="letter-signoff-block"
                  style={{
                    transform: `translateY(${signY}px)`,
                    opacity: signOp,
                  }}
                >
                  <span className="sign-label">Forever & always yours,</span>
                  <span className="sign-author">Chintan ♥</span>
                </div>
              </div>

              <div className="flying-polaroids-container">
                <div
                  className="flying-polaroid photo-1"
                  style={{
                    transform: `translate(${p1X}vw, ${p1Y}vh) rotate(${p1Rot}deg)`,
                    opacity: p1Op,
                  }}
                >
                  <div className="polaroid-tape"></div>
                  <img src={FINALE_PHOTOS[0].src} alt="Memory 1" />
                  <span className="polaroid-caption">{FINALE_PHOTOS[0].caption}</span>
                </div>

                <div
                  className="flying-polaroid photo-2"
                  style={{
                    transform: `translate(${p2X}vw, ${p2Y}vh) rotate(${p2Rot}deg)`,
                    opacity: p2Op,
                  }}
                >
                  <div className="polaroid-tape"></div>
                  <img src={FINALE_PHOTOS[1].src} alt="Memory 2" />
                  <span className="polaroid-caption">{FINALE_PHOTOS[1].caption}</span>
                </div>

                <div
                  className="flying-polaroid photo-3"
                  style={{
                    transform: `translate(${p3X}vw, ${p3Y}vh) rotate(${p3Rot}deg)`,
                    opacity: p3Op,
                  }}
                >
                  <div className="polaroid-tape"></div>
                  <img src={FINALE_PHOTOS[2].src} alt="Memory 3" />
                  <span className="polaroid-caption">{FINALE_PHOTOS[2].caption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Full-Screen Cinematic Floating Memories Section */}
      <div ref={memoriesTrackRef} className="floating-memories-track">
        <div className="floating-sticky-viewport">
          <div className="floating-ambient-bg">
            <div className="ambient-stars"></div>
            <div className="ambient-particles" style={{ opacity: finalConfettiOp }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className={`glow-heart-particle particle-${i % 5}`}>♥</span>
              ))}
            </div>
          </div>

          <div
            className="floating-memories-title-block"
            style={{
              opacity: memTitleOp,
              transform: `translateY(${memTitleY}px)`,
            }}
          >
            <h2 className="memories-entrance-heading">A few memories to keep forever ❤️</h2>
          </div>

          <div className="floating-photos-container">
            {FLOATING_MEMORIES.map((mem, i) => {
              const styleObj = getFloatingStyle(mem)
              if (styleObj.display === 'none') return null

              const { capOp, capY, ...cardStyle } = styleObj

              return (
                <div key={i} className={`floating-photo-card ${mem.layerClass}`} style={cardStyle}>
                  <div className="photo-frame-inner">
                    <img src={mem.src} alt={mem.caption} />
                  </div>
                  <div
                    className="photo-floating-caption"
                    style={{
                      opacity: capOp,
                      transform: `translateY(${capY}px)`,
                    }}
                  >
                    <span>{mem.caption}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div
            className="final-memory-center-wrapper"
            style={{
              transform: `scale(${finalPhotoScale})`,
              opacity: finalPhotoOp,
            }}
          >
            <div className="final-memory-photo-frame">
              <img src="/media/1000022105.jpg.jpeg" alt="Udita & Chintan Final Memory" />
              <div className="final-photo-glow"></div>
            </div>

            <div className="final-memory-text-block">
              <p
                className="final-quote-text"
                style={{
                  opacity: finalLine1Op,
                  transform: `translateY(${finalLine1Y}px)`,
                }}
              >
                Some memories fade...<br />
                but the best ones stay forever. ❤️
              </p>

              <h3
                className="final-bday-wish"
                style={{
                  opacity: finalLine2Op,
                  transform: `translateY(${finalLine2Y}px)`,
                }}
              >
                Happy Birthday, Udita 🎂
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Finale Footer Action */}
      <div className="finale-action-footer">
        <button className="restart-btn" onClick={onRestart}>
          Replay Birthday Journey 🔄
        </button>
        {onOpenScanCard && (
          <button className="share-card-btn-footer" onClick={onOpenScanCard}>
            📲 Scan & Share Gift Card
          </button>
        )}
      </div>
    </div>
  )
}

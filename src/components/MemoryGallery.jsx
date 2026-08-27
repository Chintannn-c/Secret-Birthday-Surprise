import { useState, useEffect, useRef } from 'react'
import './MemoryGallery.css'

const photos = [
  { src: '/media/1000022103.jpg.jpeg', caption: 'sunshine in yellow 💛', rotate: -3 },
  { src: '/media/1000022105.jpg.jpeg', caption: 'us together ✨', rotate: 2 },
  { src: '/media/1000063562.jpg.jpeg', caption: 'navratri vibes 🎊', rotate: -2 },
  { src: '/media/1000063558.jpg.jpeg', caption: 'beauty queen 👑', rotate: 4 },
  { src: '/media/1000063825.jpg.jpeg', caption: 'cutest ever 💗', rotate: -4 },
  { src: '/media/1000076468.jpg.jpeg', caption: 'polaroid mood 📸', rotate: 3 },
  { src: '/media/1000086404.jpg.jpeg', caption: 'hello kitty girl 🐱', rotate: -1 },
  { src: '/media/1000062338.jpg.jpeg', caption: 'that smile tho 😊', rotate: 2 },
  { src: '/media/1000063427.jpg.jpeg', caption: 'gorgeous ✨', rotate: -3 },
  { src: '/media/1000146808.jpg.jpeg', caption: 'so pretty! 🌸', rotate: 5 },
  { src: '/media/1000177190.jpg.jpeg', caption: 'love this one 💕', rotate: -2 },
  { src: '/media/1000092695.jpg.jpeg', caption: 'always smiling 😄', rotate: 3 },
  { src: '/media/WhatsApp Image 2026-08-02 at 12.10.45 AM.jpeg', caption: 'beautiful 🌺', rotate: -4 },
  { src: '/media/WhatsApp Image 2026-08-02 at 12.10.46 AM.jpeg', caption: 'my fav 💖', rotate: 1 },
  { src: '/media/WhatsApp Image 2026-08-02 at 12.10.47 AM.jpeg', caption: 'cutie pie 🧁', rotate: -5 },
  { src: '/media/WhatsApp Image 2026-08-02 at 12.10.48 AM.jpeg', caption: 'perfect 🌟', rotate: 2 },
]

export default function MemoryGallery() {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const galleryRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]))
          }
        })
      },
      { threshold: 0.15, rootMargin: '50px' }
    )

    const items = galleryRef.current?.querySelectorAll('.memory-item')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="memory-section">
      {/* Decorative wavy line at top */}
      <svg className="wavy-divider" viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M0,30 Q150,0 300,30 T600,30 T900,30 T1200,30" fill="none" stroke="var(--pink-soft)" strokeWidth="2" opacity="0.5"/>
        <path d="M0,35 Q150,5 300,35 T600,35 T900,35 T1200,35" fill="none" stroke="var(--pink-soft)" strokeWidth="1.5" opacity="0.3"/>
      </svg>

      <h2 className="section-title">our memories</h2>
      <p className="section-subtitle">every moment with you is a treasure ✨</p>

      <div className="memory-grid" ref={galleryRef}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`memory-item ${visibleItems.has(String(i)) ? 'visible' : ''}`}
            data-index={i}
            style={{
              '--rotate': `${photo.rotate}deg`,
              animationDelay: `${(i % 4) * 0.1}s`,
            }}
          >
            <div className="memory-polaroid">
              <div className="memory-tape" style={{
                left: `${20 + Math.random() * 40}%`,
                transform: `rotate(${-5 + Math.random() * 10}deg)`,
              }}></div>
              <div className="memory-photo-wrapper">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
              </div>
              <p className="memory-caption">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative wavy line at bottom */}
      <svg className="wavy-divider bottom" viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M0,30 Q150,60 300,30 T600,30 T900,30 T1200,30" fill="none" stroke="var(--pink-soft)" strokeWidth="2" opacity="0.5"/>
      </svg>
    </section>
  )
}

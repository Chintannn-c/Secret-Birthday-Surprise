import { useState } from 'react'
import Lightbox from './Lightbox'
import './Page4Memories.css'

const MEMORY_PHOTOS = [
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
]

export default function Page4Memories({ onSuccess }) {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null)

  const openLightbox = (idx) => setSelectedPhotoIdx(idx)
  const closeLightbox = () => setSelectedPhotoIdx(null)

  const handlePrev = () => {
    if (selectedPhotoIdx !== null) {
      setSelectedPhotoIdx((prev) => (prev === 0 ? MEMORY_PHOTOS.length - 1 : prev - 1))
    }
  }

  const handleNext = () => {
    if (selectedPhotoIdx !== null) {
      setSelectedPhotoIdx((prev) => (prev === MEMORY_PHOTOS.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <div className="page4-memories-container">
      <div className="memories-header">
        <h2 className="section-title">our memory timeline</h2>
        <p className="section-subtitle">tap any photo to view full size 📸</p>
      </div>

      {/* Filmstrip Reel Preview */}
      <div className="filmstrip-container">
        <div className="filmstrip-track">
          {[...MEMORY_PHOTOS, ...MEMORY_PHOTOS].map((photo, i) => (
            <div
              key={i}
              className="film-frame"
              onClick={() => openLightbox(i % MEMORY_PHOTOS.length)}
            >
              <div className="sprocket-holes top">
                <span></span><span></span><span></span>
              </div>
              <img src={photo.src} alt={photo.caption} className="film-img" />
              <div className="sprocket-holes bottom">
                <span></span><span></span><span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Polaroid Masonry Grid */}
      <div className="polaroid-grid">
        {MEMORY_PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="polaroid-card"
            style={{ transform: `rotate(${photo.rotate}deg)` }}
            onClick={() => openLightbox(i)}
          >
            <div className="polaroid-tape"></div>
            <div className="polaroid-img-wrapper">
              <img src={photo.src} alt={photo.caption} loading="lazy" />
            </div>
            <p className="polaroid-caption">{photo.caption}</p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIdx !== null && (
        <Lightbox
          photo={MEMORY_PHOTOS[selectedPhotoIdx]}
          photoIndex={selectedPhotoIdx}
          totalPhotos={MEMORY_PHOTOS.length}
          onClose={closeLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* Action to proceed to Guess Who Said This Game */}
      <div className="memories-footer-action">
        <button className="continue-btn" onClick={onSuccess}>
          Next Challenge: Guess Who Said This 💌 →
        </button>
      </div>
    </div>
  )
}

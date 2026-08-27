import { useEffect } from 'react'
import './Lightbox.css'

export default function Lightbox({ photo, photoIndex, totalPhotos, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  if (!photo) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose}>✕</button>
        
        <button className="lightbox-nav-btn prev" onClick={onPrev}>‹</button>
        <button className="lightbox-nav-btn next" onClick={onNext}>›</button>

        <div className="lightbox-media-wrapper">
          <img src={photo.src} alt={photo.caption} className="lightbox-img" />
        </div>

        <div className="lightbox-footer">
          <p className="lightbox-caption">{photo.caption}</p>
          <span className="lightbox-counter">{photoIndex + 1} of {totalPhotos}</span>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import './ShareCardModal.css'

export default function ShareCardModal({ isOpen, onClose }) {
  const [targetUrl, setTargetUrl] = useState('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    // Default to current window origin or standard placeholder
    const defaultUrl =
      typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
        ? window.location.origin
        : 'https://special-birthday-surprise.vercel.app'
    setTargetUrl(defaultUrl)
  }, [])

  useEffect(() => {
    if (!targetUrl) return

    // Generate high-resolution QR code
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#5c4033', // Warm brown matching design system
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrCodeDataUrl(url)
      })
      .catch((err) => {
        console.error('QR code generation error:', err)
      })
  }, [targetUrl])

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (!isOpen) return null

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="share-modal-close" onClick={onClose} title="Close">
          ✕
        </button>

        <div className="share-modal-header">
          <span className="share-top-pill">✨ BIRTHDAY INVITATION & GIFT CARD ✨</span>
          <h2 className="share-modal-title">Scan to Open Website 📲</h2>
          <p className="share-modal-sub">
            Print this gift card or scan it directly with your phone camera to open Udita's secret birthday site!
          </p>
        </div>

        {/* Printable Physical Card Frame */}
        <div ref={cardRef} className="printable-gift-card">
          {/* Card Corner Rosette Accents */}
          <div className="card-corner top-left">🌸</div>
          <div className="card-corner top-right">🌸</div>
          <div className="card-corner bottom-left">✨</div>
          <div className="card-corner bottom-right">✨</div>

          {/* Card Header */}
          <div className="gift-card-header">
            <div className="gift-card-seal">♥</div>
            <h3 className="gift-card-title">A Special Surprise Just For You</h3>
            <p className="gift-card-recipient">Happy Birthday, Udita! 👑🤍</p>
          </div>

          {/* QR Code Presentation Box */}
          <div className="gift-card-qr-box">
            <div className="qr-frame-outer">
              {qrCodeDataUrl ? (
                <img src={qrCodeDataUrl} alt="Scan QR to open website" className="gift-card-qr-img" />
              ) : (
                <div className="qr-loading">Generating QR Code...</div>
              )}
            </div>

            <div className="scan-instruction-pill">
              <span>📸 Scan with your phone camera</span>
            </div>
          </div>

          {/* Card Footer Notes */}
          <div className="gift-card-footer">
            <p className="gift-card-url-text">{targetUrl}</p>
            <p className="gift-card-quote">“Every great adventure begins with a secret step...” ✨</p>
          </div>
        </div>

        {/* URL Customizer Dropdown */}
        <div className="url-customizer-section">
          {!isCustomizing ? (
            <button
              className="customize-url-toggle-btn"
              onClick={() => setIsCustomizing(true)}
            >
              ⚙️ Change Website URL in QR Code
            </button>
          ) : (
            <div className="custom-url-input-row">
              <input
                type="url"
                className="custom-url-input"
                placeholder="Enter deployed URL (e.g. https://your-site.vercel.app)"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
              <button
                className="done-url-btn"
                onClick={() => setIsCustomizing(false)}
              >
                Update QR ✓
              </button>
            </div>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="share-actions-row">
          <button className="share-action-btn copy-btn" onClick={handleCopyLink}>
            {copied ? '✓ Link Copied!' : '📋 Copy Link'}
          </button>
          <button className="share-action-btn print-btn" onClick={handlePrint}>
            🖨️ Print Gift Card
          </button>
        </div>
      </div>
    </div>
  )
}

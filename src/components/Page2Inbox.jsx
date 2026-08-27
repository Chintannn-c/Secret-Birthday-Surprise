import { useState, useEffect } from 'react'
import './Page2Inbox.css'

export default function Page2Inbox({ onSuccess }) {
  const [isArriving, setIsArriving] = useState(true)
  const [isTyping, setIsTyping] = useState(true)
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    // Simulate live arriving mail delay
    const timer1 = setTimeout(() => {
      setIsTyping(false)
    }, 1500)

    const timer2 = setTimeout(() => {
      setIsArriving(false)
    }, 2200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleOpenEmail = () => {
    setIsOpened(true)
    setTimeout(() => {
      onSuccess()
    }, 800)
  }

  return (
    <div className={`inbox-page-container ${isOpened ? 'opened-anim' : ''}`}>
      <div className="inbox-header">
        <h2 className="section-title">your secret mailbox</h2>
        <p className="section-subtitle">you have 1 new special message waiting 💌</p>
      </div>

      {/* Inbox Frame */}
      <div className="inbox-window">
        <div className="inbox-toolbar">
          <div className="inbox-tabs">
            <span className="inbox-tab active">📬 Primary (1)</span>
            <span className="inbox-tab">⭐ Starred</span>
            <span className="inbox-tab">💌 Special</span>
          </div>
          <div className="inbox-search">
            <span>🔍 Search mail</span>
          </div>
        </div>

        {/* Notification banner */}
        <div className="inbox-banner">
          <span className="banner-pulse"></span>
          <span>New message arrived live just for Udita!</span>
        </div>

        {/* Mail List */}
        <div className="mail-list">
          {isTyping && (
            <div className="typing-indicator-box">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Incoming birthday message arriving...</p>
            </div>
          )}

          {!isTyping && (
            <div
              className={`mail-item unread ${isArriving ? 'mail-pop-in' : ''}`}
              onClick={handleOpenEmail}
            >
              <div className="mail-item-left">
                <div className="mail-avatar">💖</div>
                <div className="mail-meta">
                  <div className="mail-sender-row">
                    <span className="mail-sender">Your Special Someone</span>
                    <span className="mail-badge">VIP</span>
                  </div>
                  <h4 className="mail-subject">A Very Special Birthday Delivery 💌</h4>
                  <p className="mail-snippet">
                    Happy Birthday to the most amazing person! Click here to open your handwritten letter...
                  </p>
                </div>
              </div>

              <div className="mail-item-right">
                <span className="mail-time">Just now</span>
                <span className="unread-dot">●</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="inbox-footer-hint">✨ Click on the email to unfold your letter ✨</p>
    </div>
  )
}

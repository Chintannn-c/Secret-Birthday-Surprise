import './GiftsNav.css'

export default function GiftsNav({ onNavigate }) {
  const gifts = [
    { id: 'memories', icon: '📷', label: 'memories' },
    { id: 'cake', icon: '🎂', label: 'cake' },
    { id: 'surprise', icon: '🎁', label: 'surprise' },
  ]

  return (
    <div className="gifts-nav">
      <h3 className="gifts-title">Gifts Just For You!</h3>
      <div className="gifts-buttons">
        {gifts.map((gift, i) => (
          <button
            key={gift.id}
            className="gift-btn"
            onClick={() => onNavigate(gift.id)}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <span className="gift-icon">{gift.icon}</span>
            <span className="gift-label">{gift.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

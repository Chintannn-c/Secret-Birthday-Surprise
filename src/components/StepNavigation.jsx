import './StepNavigation.css'

const STEPS = [
  { id: 1, title: 'Passcode', icon: '🔒' },
  { id: 2, title: 'Inbox', icon: '💌' },
  { id: 3, title: 'Letter', icon: '📜' },
  { id: 4, title: 'Memories', icon: '📷' },
  { id: 5, title: 'Trivia', icon: '🧩' },
  { id: 6, title: 'Spin Wheel', icon: '🎡' },
  { id: 7, title: 'Surprise', icon: '🎁' },
  { id: 8, title: 'Build Cake', icon: '🎂' },
  { id: 9, title: 'Make a Wish', icon: '✨' },
  { id: 10, title: 'Final Surprise', icon: '👑' },
]

export default function StepNavigation({ currentStep, unlockedSteps, onSelectStep }) {
  return (
    <nav className="step-nav-container">
      <div className="step-nav-track">
        <div 
          className="step-nav-progress"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((step) => {
          const isUnlocked = unlockedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const isCompleted = unlockedSteps.includes(step.id + 1) || (step.id === 9 && unlockedSteps.includes(9))

          return (
            <button
              key={step.id}
              className={`step-nav-item ${isCurrent ? 'active' : ''} ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`}
              onClick={() => isUnlocked && onSelectStep(step.id)}
              disabled={!isUnlocked}
              title={isUnlocked ? `Go to ${step.title}` : `Locked (Complete step ${step.id - 1} first)`}
            >
              <div className="step-icon-bubble">
                {isCompleted && !isCurrent ? '✓' : step.icon}
              </div>
              <span className="step-label">{step.title}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

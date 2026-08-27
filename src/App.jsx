import { useState, useEffect } from 'react'
import './App.css'
import FloatingHearts from './components/FloatingHearts'
import BackgroundPandas from './components/BackgroundPandas'
import StepNavigation from './components/StepNavigation'
import Page1Passcode from './components/Page1Passcode'
import Page2Inbox from './components/Page2Inbox'
import Page3Letter from './components/Page3Letter'
import Page4Memories from './components/Page4Memories'
import Page5Trivia from './components/Page5Trivia'
import Page6SpinWheel from './components/Page6SpinWheel'
import Page8CakeBuilder from './components/Page8CakeBuilder'
import Page9BlowCandles from './components/Page9BlowCandles'
import Page10Finale from './components/Page10Finale'
import BackgroundAudio from './components/BackgroundAudio'
import ShareCardModal from './components/ShareCardModal'

export default function App() {
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem('udita_birthday_current_step')
      return savedStep ? Math.min(parseInt(savedStep, 10), 9) : 1
    } catch (e) {
      return 1
    }
  })
  const [unlockedSteps, setUnlockedSteps] = useState([1])
  const [customCake, setCustomCake] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)

  // Load saved progress from localStorage if available
  useEffect(() => {
    try {
      const savedUnlocked = localStorage.getItem('udita_birthday_unlocked')
      if (savedUnlocked) {
        const parsed = JSON.parse(savedUnlocked)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((num) => num <= 9)
          const merged = Array.from(new Set([...filtered, currentStep]))
          setUnlockedSteps(merged)
          return
        }
      }
      const initialUnlocked = Array.from({ length: currentStep }, (_, i) => i + 1)
      setUnlockedSteps(initialUnlocked)
    } catch (e) {
      console.warn('localStorage read error:', e)
    }
  }, [currentStep])

  // Persist active currentStep to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('udita_birthday_current_step', currentStep.toString())
    } catch (e) {
      console.warn('localStorage step write error:', e)
    }
  }, [currentStep])

  const unlockNextStep = (nextStepNum) => {
    setUnlockedSteps((prev) => {
      const updated = Array.from(new Set([...prev, nextStepNum]))
      try {
        localStorage.setItem('udita_birthday_unlocked', JSON.stringify(updated))
      } catch (e) {
        console.warn('localStorage write error:', e)
      }
      return updated
    })
    setCurrentStep(nextStepNum)
  }

  const handleStepComplete = (data) => {
    if (currentStep === 7 && data) {
      setCustomCake(data)
    }

    if (currentStep < 9) {
      unlockNextStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    try {
      localStorage.removeItem('udita_birthday_current_step')
      localStorage.removeItem('udita_birthday_unlocked')
    } catch (e) {
      console.warn('localStorage clear error:', e)
    }
    setUnlockedSteps([1])
    setCurrentStep(1)
  }

  return (
    <div className="app">
      <FloatingHearts />
      <BackgroundPandas />
      <BackgroundAudio />

      {/* Main Content Browser Window */}
      <div className="browser-window">
        <div className="browser-titlebar">
          <div className="browser-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>

          <div className="browser-url-area">
            {currentStep > 1 && (
              <button className="browser-back-btn" onClick={handlePrevStep} title="Go to previous page">
                ← Back
              </button>
            )}
            <span className="browser-url">secret.birthday / step-{currentStep}</span>
          </div>

          <div className="browser-titlebar-right">
            <button
              className="browser-scan-btn"
              onClick={() => setShowShareModal(true)}
              title="Open Printable QR Gift Card"
            >
              📲 Scan Card
            </button>
          </div>
        </div>

        <div className="browser-content">
          {currentStep === 1 && (
            <Page1Passcode onSuccess={() => handleStepComplete()} />
          )}

          {currentStep === 2 && (
            <Page2Inbox onSuccess={() => handleStepComplete()} />
          )}

          {currentStep === 3 && (
            <Page3Letter onSuccess={() => handleStepComplete()} />
          )}

          {currentStep === 4 && (
            <Page4Memories onSuccess={() => handleStepComplete()} />
          )}

          {currentStep === 5 && (
            <Page5Trivia onSuccess={() => handleStepComplete()} />
          )}

          {currentStep === 6 && (
            <Page6SpinWheel onSuccess={() => handleStepComplete()} />
          )}

          {currentStep === 7 && (
            <Page8CakeBuilder
              initialCake={customCake}
              onSuccess={(cakeData) => handleStepComplete(cakeData)}
            />
          )}

          {currentStep === 8 && (
            <Page9BlowCandles
              customCake={customCake}
              onSuccess={() => handleStepComplete()}
              onRestart={handleRestart}
            />
          )}

          {currentStep === 9 && (
            <Page10Finale onRestart={handleRestart} onOpenScanCard={() => setShowShareModal(true)} />
          )}
        </div>
      </div>

      {/* Share / Scan QR Gift Card Modal */}
      <ShareCardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  )
}

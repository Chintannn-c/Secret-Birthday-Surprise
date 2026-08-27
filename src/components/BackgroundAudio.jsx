import React, { useState, useEffect, useRef } from 'react'
import './BackgroundAudio.css'

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const timerRef = useRef(null)

  // Web Audio API Synthesizer playing soft birthday melody
  const startMelody = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }

    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    // Birthday melody notes (Happy Birthday frequencies)
    const notes = [
      { freq: 261.63, duration: 0.35 }, // C4
      { freq: 261.63, duration: 0.35 }, // C4
      { freq: 293.66, duration: 0.6 },  // D4
      { freq: 261.63, duration: 0.6 },  // C4
      { freq: 349.23, duration: 0.6 },  // F4
      { freq: 329.63, duration: 1.0 },  // E4
      { freq: 261.63, duration: 0.35 }, // C4
      { freq: 261.63, duration: 0.35 }, // C4
      { freq: 293.66, duration: 0.6 },  // D4
      { freq: 261.63, duration: 0.6 },  // C4
      { freq: 392.00, duration: 0.6 },  // G4
      { freq: 349.23, duration: 1.0 },  // F4
    ]

    let noteIdx = 0

    const playNextNote = () => {
      if (!ctx || ctx.state === 'closed') return

      const current = notes[noteIdx]
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(current.freq, ctx.currentTime)

      // Warm acoustic envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + current.duration - 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + current.duration)

      noteIdx = (noteIdx + 1) % notes.length
      timerRef.current = setTimeout(playNextNote, current.duration * 1000 + 120)
    }

    playNextNote()
  }

  const stopMelody = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend()
    }
  }

  const toggleAudio = () => {
    if (isPlaying) {
      stopMelody()
      setIsPlaying(false)
    } else {
      startMelody()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      stopMelody()
    }
  }, [])

  return (
    <div className="bg-audio-container">
      <button
        className={`bg-audio-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
      >
        <span className="audio-icon">{isPlaying ? '🎵' : '🔇'}</span>
        <span className="audio-label">BGM: {isPlaying ? 'ON ✨' : 'OFF'}</span>
      </button>
    </div>
  )
}

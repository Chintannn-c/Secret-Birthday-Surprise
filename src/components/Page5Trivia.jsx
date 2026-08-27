import { useState, useRef, useEffect } from 'react'
import './Page5Trivia.css'

const QUOTES = [
  {
    id: 1,
    quote: "It’s funny thinking about how long I’ve known you and how, despite everything changing over the years, some things about you somehow haven’t.\n\nThe bond that we share is no less than that of sisters, Love you ❤️",
    answer: "Siya",
    aliases: ["siya", "siyaa", "siya", "siyu", "siyuu", "siya di"],
    relationship: "Soul Sister & Bestie 🤍",
    tagline: "“A bond stronger than sisters!”",
    avatarIcon: "👭",
    themeColor: "#f4a4b8",
  },
  {
    id: 2,
    quote: "Happiest birthday tannnaa bhaii!!🫶❤️\n\nI’m so lucky to have you in my life and words will not enough to describe your place in my heart but even though you want to know come to me when I’m drunk as it’s a fact that whenever you are drunk you only talk about your true loveee!!❤️🫶😘😘",
    answer: "Kripa",
    aliases: ["kripa", "kripaa", "krippa", "kripa di", "kripi"],
    relationship: "Party Partner & Sweetest Bestie 🥂",
    tagline: "“Come to me when drunk for the real truths!” 😂",
    avatarIcon: "🥳",
    themeColor: "#c9b8d9",
  },
  {
    id: 3,
    quote: "Happiest birthday udita 🫂,\n\nOver the years I've gotten to know you better and you have turned out be one of my best friends !\n\nYou're the most sincere and kind hearted person that I know. I can talk to you about any of my problems and ask for advice.\n\nKeep on shining like this ✨",
    answer: "Vatsal",
    aliases: ["vatsal", "vatsalbhai", "vatsal bhai", "vatsu"],
    relationship: "Best Friend & Advice Guru ✨",
    tagline: "“Keep on shining bright always!” 🌟",
    avatarIcon: "🫂",
    themeColor: "#a0c4ff",
  },
  {
    id: 4,
    quote: "Happiest Birthday, Tannaaa ❤️!\n\nWho would’ve thought that meeting in school would turn into such a beautiful friendship and eventually make us best friends? You’ve inspired me in so many ways and, honestly, irritated me just as much 😂.\n\nBut who wants a boring life anyway? I’m glad to have an irritating, crazy bestie like you who always inspires me to push myself and gives me positive thoughts whenever I need them. ❤️",
    answer: "Chintan",
    aliases: ["chintan", "chintu", "chintoo", "chintan bhai", "chintann"],
    relationship: "Your Crazy Irritating Bestie 👑❤️",
    tagline: "“School mates to forever best friends!” 💑",
    avatarIcon: "👑",
    themeColor: "#ffadad",
  },
  {
    id: 5,
    quote: "Udita makes whole group in unity and always a happy person, good nature and always a smile on face Future CA 🫡😎",
    answer: "Meet",
    aliases: ["meet", "meetbhai", "meet bhai", "mit"],
    relationship: "Group Unifier & Cheerleader 🫡✨",
    tagline: "“Keeping the whole squad united — Future CA!” 💼😎",
    avatarIcon: "🫡",
    themeColor: "#bbf7d0",
  },
  {
    id: 6,
    quote: "Honestly, in the whole group, I feel like only our jokes are actually good 😂. We just share the same kind of humor, so even the dumbest things become hilarious when we’re together. And hey, hurry up and become a CA so you can make Kunal the second-highest-paid employee in the group 😂❤️.",
    answer: "Dhruvesh",
    aliases: ["dhruvesh", "dhruveshbhai", "dhruvesh bhai", "dhruv", "dhruva"],
    relationship: "Comedy Partner in Crime 😂✨",
    tagline: "“Make Kunal the 2nd highest paid employee!” 💼🤣",
    avatarIcon: "😂",
    themeColor: "#fed7aa",
  },
  {
    id: 7,
    quote: "Don’t overthink everything, and don’t let other people’s opinions get into your head. People will always have something to say, so just ignore the unnecessary noise and do what feels right for you.\n\nAnd please, for once, use your brain instead of your knees 😂. Stay confident, trust yourself, and don’t let anyone ruin your peace or your mood. ❤️",
    answer: "Kunal",
    aliases: ["kunal", "kunalbhai", "kunal bhai", "kunalii", "kunal Shah"],
    relationship: "No-Nonsense Advisor & Best Friend 🧠❤️",
    tagline: "“Use your brain instead of your knees! 😂” 🧠✨",
    avatarIcon: "🧠",
    themeColor: "#e9d5ff",
  },
  {
    id: 8,
    quote: "Happy Birthday, Udita! 🎉❤️\n\nTo our Bargaining Queen, who can turn ₹1,000 into ₹200 like she’s doing a CA calculation 😂.\n\nAnd there’s one thing the whole group knows—one tiny mistake by my bro and somehow everyone already knows: “Tonight, sleep is cancelled.” 😂\n\nJokes apart, you’re genuinely a wonderful friend, and I’m really glad to have you in my life. May this year bring you loads of success, happiness, money, and countless reasons to smile and celebrate. ❤️\n\nAnd please don’t forget—you’ll have to manage my accounts in the future! 😂💰\n\nOnce again, Happy Birthday, Udita! 🎂🎉❤️",
    answer: "Rohan",
    aliases: ["rohan", "rohanbhai", "rohan bhai", "rohu", "rohann"],
    relationship: "Bargaining Fan & Future Client 😂💰",
    tagline: "“Tonight, sleep is cancelled! 😂” 🛍️💸",
    avatarIcon: "🛍️",
    themeColor: "#fef08a",
  },
]

const DARES_POOL = [
  {
    title: "💃 Dance on Bollywood Song",
    desc: "Do a 20-second Bollywood dance right now without stopping or laughing! 🕺🔥",
    icon: "💃",
  },
  {
    title: "🎤 Dramatic Singer",
    desc: "Sing the chorus of your favorite song or 'Happy Birthday' in a funny opera voice! 🎶",
    icon: "🎤",
  },
  {
    title: "🤪 Goofy Face Challenge",
    desc: "Make the funniest, most dramatic goofy face and hold it for 10 full seconds! 😂",
    icon: "🤪",
  },
  {
    title: "👑 Queen of the Day Speech",
    desc: "Give a 20-second dramatic royal acceptance speech to your kingdom! 👸✨",
    icon: "👑",
  },
  {
    title: "🥰 Compliment Marathon",
    desc: "Say 3 super sweet things out loud about the person who wrote this message! 💖",
    icon: "🥰",
  },
]

export default function Page5Trivia({ onSuccess }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [inputGuess, setInputGuess] = useState('')
  const [triesLeft, setTriesLeft] = useState(5)
  const [shakingInput, setShakingInput] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [activeDare, setActiveDare] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    if (!isRevealed && !activeDare && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentQ, isRevealed, activeDare])

  const current = QUOTES[currentQ]

  const handleSubmitGuess = (e) => {
    if (e) e.preventDefault()
    const trimmed = inputGuess.trim().toLowerCase()
    if (!trimmed || isRevealed || activeDare) return

    const isMatch =
      trimmed === current.answer.toLowerCase() ||
      current.aliases.some((alias) => trimmed === alias.toLowerCase())

    if (isMatch) {
      setIsRevealed(true)
      const pointsEarned = 100 * triesLeft + streak * 50
      setScore((prev) => prev + pointsEarned)
      setStreak((prev) => prev + 1)
      setFeedbackMsg(`🎉 Correct! It was ${current.answer}!`)
    } else {
      const newTries = triesLeft - 1
      setTriesLeft(newTries)
      setShakingInput(true)
      setTimeout(() => setShakingInput(false), 500)

      if (newTries <= 0) {
        setStreak(0)
        const randomDare = DARES_POOL[currentQ % DARES_POOL.length]
        setActiveDare(randomDare)
        setFeedbackMsg('')
      } else {
        setFeedbackMsg(
          `Oops! Not quite right. ${newTries} ${newTries === 1 ? 'try' : 'tries'} remaining! 🙈`
        )
      }
    }
  }

  const handleCompleteDare = () => {
    setTriesLeft(5)
    setActiveDare(null)
    setInputGuess('')
    setFeedbackMsg('✨ Dare Completed! 5 fresh tries granted — guess again! 💖')
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 100)
  }

  const handleNext = () => {
    if (currentQ + 1 < QUOTES.length) {
      setCurrentQ((prev) => prev + 1)
      setInputGuess('')
      setTriesLeft(5)
      setIsRevealed(false)
      setFeedbackMsg('')
    } else {
      setIsCompleted(true)
    }
  }

  return (
    <div className="page5-trivia-container">
      <div className="trivia-header">
        <h2 className="section-title">guess who said this? 💌</h2>
        <p className="section-subtitle">read the birthday message & type who wrote it! ✍️</p>
      </div>

      {/* Scoreboard & Tries Bar */}
      <div className="scoreboard-bar">
        <div className="score-badge">
          <span>🏆 Score:</span> <strong>{score}</strong>
        </div>
        <div className="streak-badge">
          <span>🔥 Streak:</span> <strong>{streak}x</strong>
        </div>
      </div>

      {!isCompleted ? (
        <div className="guess-main-card">
          {/* Progress & Hearts Bar */}
          <div className="guess-top-bar">
            <span className="quote-progress-tag">
              MESSAGE {currentQ + 1} OF {QUOTES.length}
            </span>

            {/* 5 Tries Heart Indicators */}
            <div className="tries-indicator-wrapper" title={`${triesLeft} tries remaining`}>
              <span className="tries-label">Tries:</span>
              <div className="tries-hearts">
                {[1, 2, 3, 4, 5].map((heartNum) => (
                  <span
                    key={heartNum}
                    className={`try-heart ${heartNum <= triesLeft ? 'active' : 'lost'}`}
                  >
                    {heartNum <= triesLeft ? '❤️' : '💔'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quote Letter Paper Display */}
          <div className="quote-letter-sheet">
            <span className="letter-quote-mark open">“</span>
            <div className="letter-quote-content">
              {current.quote.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="quote-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <span className="letter-quote-mark close">”</span>
          </div>

          {/* Guess Fill-in-the-Blank Input */}
          {!isRevealed ? (
            <form
              onSubmit={handleSubmitGuess}
              className={`guess-form-wrapper ${shakingInput ? 'shake-anim' : ''}`}
            >
              <label className="guess-input-label">
                Who wrote this message to you?
              </label>

              <div className="guess-input-row">
                <span className="input-prefix-icon">✍️</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="guess-text-input"
                  placeholder="Type their name here..."
                  value={inputGuess}
                  onChange={(e) => setInputGuess(e.target.value)}
                  disabled={isRevealed || !!activeDare}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="guess-submit-btn"
                  disabled={!inputGuess.trim() || isRevealed || !!activeDare}
                >
                  Guess! ↵
                </button>
              </div>

              {feedbackMsg && (
                <p className={`guess-feedback-text ${isRevealed ? 'positive' : 'negative'}`}>
                  {feedbackMsg}
                </p>
              )}
            </form>
          ) : (
            /* Reveal Card upon Correct Guess */
            <div className="guess-reveal-card">
              <div
                className="reveal-avatar-badge"
                style={{ backgroundColor: current.themeColor }}
              >
                <span>{current.avatarIcon}</span>
              </div>
              <div className="reveal-details">
                <h4 className="reveal-author-name">Said by: {current.answer} 💖</h4>
                <p className="reveal-relationship">{current.relationship}</p>
                <p className="reveal-tagline">{current.tagline}</p>
              </div>

              <button className="next-quote-btn" onClick={handleNext}>
                {currentQ + 1 === QUOTES.length ? 'See Final Results 🏆 →' : 'Next Message 💌 →'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Completed Card */
        <div className="trivia-completed-card">
          <div className="trophy-bounce">🏆💌🎉</div>
          <h3>Friendship Master Udita!</h3>
          <p className="final-score-text">
            Total Score: <strong>{score} Points</strong>
          </p>
          <p className="completion-sub">
            You know your loved ones so well! Every heartfelt message was meant just for you. ❤️
          </p>
          <button className="continue-btn" onClick={onSuccess}>
            Proceed to Birthday Dare Wheel 🎡 →
          </button>
        </div>
      )}

      {/* DARE PENALTY MODAL (Triggered when 5 tries run out) */}
      {activeDare && (
        <div className="dare-modal-overlay">
          <div className="dare-modal-box">
            <div className="dare-icon-bubble">{activeDare.icon}</div>
            <span className="dare-badge-alert">💥 OUT OF TRIES! 💥</span>
            <h3 className="dare-modal-title">Birthday Dare Penalty!</h3>
            <p className="dare-modal-instruction">
              You couldn't identify the author in 5 tries! To earn <strong>5 fresh tries</strong>,
              you must perform this dare right now:
            </p>

            <div className="dare-task-card">
              <h4 className="dare-task-title">{activeDare.title}</h4>
              <p className="dare-task-desc">{activeDare.desc}</p>
            </div>

            <button className="dare-complete-btn" onClick={handleCompleteDare}>
              I Did The Dare! 😜 (Get 5 Fresh Tries)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { CalendarDays, Clock3, Heart, Sparkles, Star } from 'lucide-react'

const vibes = [
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Sushi', emoji: '🍣' },
  { label: 'Burgers', emoji: '🍔' },
  { label: 'Pasta', emoji: '🍝' },
  { label: 'Tacos', emoji: '🌮' },
  { label: 'Ramen', emoji: '🍜' },
]

const times = Array.from({ length: 19 }, (_, index) => {
  const totalMinutes = 12 * 60 + index * 30
  const hour = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour
  return `${displayHour}:${String(minute).padStart(2, '0')} ${suffix}`
})

function FallingHearts() {
  return <div className="heart-rain" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <span key={index} style={{ '--i': index } as React.CSSProperties}>♥</span>)}</div>
}

export default function Page() {
  const [step, setStep] = useState(1)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [date, setDate] = useState('')
  const [time, setTime] = useState('6:00 PM')
  const [vibe, setVibe] = useState('')

  const dodgeNo = () => setNoPosition({ x: Math.round((Math.random() * 180) - 90), y: Math.round((Math.random() * 90) - 45) })

  return (
    <main className="proposal-page">
      <div className="kitty-side-art" aria-hidden="true"><div className="kitty-head"><span className="ear left" /><span className="ear right" /><span className="eye left" /><span className="eye right" /><span className="nose" /><span className="whisker one" /><span className="whisker two" /><span className="bow" /></div><div className="sparkle sparkle-one">✦</div><div className="sparkle sparkle-two">✧</div></div>
      <div className="proposal-shell">
        <div className="progress-dots" aria-label={`Step ${step} of 5`}>{[1, 2, 3, 4, 5].map((item) => <span key={item} className={item <= step ? 'active' : ''} />)}</div>

        {step === 1 && <section className="proposal-card ask-card fade-up"><div className="photo-frame"><img src="/date-dog.png" alt="A fluffy puppy wearing a pink bandana" /></div><p className="eyebrow">a very important question</p><h1>🌸 Will you go on a date with me? 🌸</h1><p className="subcopy">I promise good food, silly conversations, and at least one memorable little adventure.</p><div className="button-row"><button className="primary-button" onClick={() => setStep(2)}>YES 💗</button><button className="no-button" style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }} onMouseEnter={dodgeNo} onFocus={dodgeNo} onClick={dodgeNo}>NO 💔</button></div></section>}

        {step === 2 && <section className="proposal-card celebration-card fade-up"><div className="confetti" aria-hidden="true">{Array.from({ length: 42 }, (_, index) => <i key={index} style={{ '--i': index } as React.CSSProperties} />)}</div><div className="big-heart">♥</div><p className="eyebrow">oh my gosh</p><h1>WAIT YOU ACTUALLY SAID YES?? 🥹</h1><p className="subcopy">I was so ready for you to say no 😭</p><button className="primary-button" onClick={() => setStep(3)}>yay okay! <span>→</span></button></section>}

        {step === 3 && <section className="proposal-card date-card fade-up"><div className="icon-badge"><CalendarDays /></div><p className="eyebrow">step three of five</p><h1>🗓️ So... when are you free?</h1><p className="subcopy">Pick a day and time. I’ll make the rest feel easy.</p><div className="field-grid"><label>Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Time<select aria-label="Time" value={time} onChange={(event) => setTime(event.target.value)}>{times.map((option) => <option key={option}>{option}</option>)}</select></label></div><button className="primary-button" disabled={!date} onClick={() => setStep(4)}>set the date! 💌</button></section>}

        {step === 4 && <section className="proposal-card vibe-card fade-up"><div className="icon-badge"><Sparkles /></div><p className="eyebrow">last little choice</p><h1>What are we feeling? ✨</h1><p className="subcopy">Pick your vibe and I’ll start planning the perfect version of us.</p><div className="vibe-grid">{vibes.map((item) => <button key={item.label} className={`vibe-option ${vibe === item.label ? 'selected' : ''}`} onClick={() => setVibe(item.label)}><span>{item.emoji}</span><strong>{item.label}</strong></button>)}</div><button className="primary-button" disabled={!vibe} onClick={() => setStep(5)}>this one! <span>→</span></button></section>}

        {step === 5 && <section className="proposal-card final-card fade-up"><FallingHearts /><div className="final-stars"><Star fill="currentColor" /><Heart fill="currentColor" /><Star fill="currentColor" /></div><p className="eyebrow">it’s a date</p><h1>glad you didn’t say no.</h1><p className="final-copy">be ready by 6, i&apos;m coming to get you 🛻.</p><div className="date-recap"><Clock3 /> {date ? new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'our special day'} · {time}</div><p className="tiny-note">made with all my heart</p></section>}
      </div>
      <footer>Made by CH</footer>
    </main>
  )
}

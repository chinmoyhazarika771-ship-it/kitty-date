'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Check, Clock3, Heart, MapPin, Sparkles } from 'lucide-react'

const vibes = [
  { name: 'Pizza', note: 'cheesy & cozy', icon: '🍕' },
  { name: 'Sushi', note: 'tiny bites, big mood', icon: '🍣' },
  { name: 'Burgers', note: 'messy in the best way', icon: '🍔' },
  { name: 'Pasta', note: 'carbs are romance', icon: '🍝' },
  { name: 'Tacos', note: 'a little spicy', icon: '🌮' },
  { name: 'Ramen', note: 'slurp-worthy plans', icon: '🍜' },
]

const times = Array.from({ length: 19 }, (_, index) => {
  const totalMinutes = 12 * 60 + index * 30
  const hour = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const labelHour = hour > 12 ? hour - 12 : hour
  return `${labelHour}:${minutes === 0 ? '00' : '30'} ${hour >= 12 ? 'PM' : 'AM'}`
})

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 42 }, (_, index) => ({
    id: index,
    left: `${(index * 17) % 100}%`,
    delay: `${(index % 9) * 0.17}s`,
    duration: `${3.2 + (index % 6) * 0.35}s`,
    rotate: `${(index * 37) % 90}deg`,
    color: ['var(--berry)', 'var(--coral)', 'var(--gold)', 'var(--lavender)'][index % 4],
  })), [])
  return <div className="confetti" aria-hidden="true">{pieces.map((piece) => <i key={piece.id} style={{ left: piece.left, animationDelay: piece.delay, animationDuration: piece.duration, backgroundColor: piece.color, transform: `rotate(${piece.rotate})` }} />)}</div>
}

function FallingHearts() {
  const hearts = useMemo(() => Array.from({ length: 24 }, (_, index) => ({ id: index, left: `${(index * 29) % 100}%`, delay: `${(index % 10) * 0.7}s`, duration: `${7 + (index % 5)}s`, size: `${12 + (index % 4) * 5}px` })), [])
  return <div className="hearts" aria-hidden="true">{hearts.map((heart) => <span key={heart.id} style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration, fontSize: heart.size }}>♥</span>)}</div>
}

export default function Page() {
  const [step, setStep] = useState(1)
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 })
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [vibe, setVibe] = useState('')

  const dodge = () => setNoPosition({ top: Math.round(Math.random() * 130 - 65), left: Math.round(Math.random() * 190 - 95) })
  const next = () => setStep((current) => current + 1)
  const canSetDate = date && time

  return (
    <main className="proposal-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar"><div className="brand"><span className="brand-mark">R</span><span>for the record</span></div><div className="step-count">{step} <span>/</span> 5</div></header>
      <div className="progress"><span style={{ width: `${step * 20}%` }} /></div>

      {step === 1 && <section className="screen ask-screen" aria-labelledby="ask-title">
        <div className="eyebrow"><Sparkles size={14} /> a very important question</div>
        <div className="dog-frame"><img src="/date-dog.png" alt="A fluffy puppy wearing a pink bandana" /><div className="photo-stamp">official<br />date consultant</div></div>
        <h1 id="ask-title">Will you go on<br /><em>a date with me?</em></h1>
        <p className="lede">No pressure. Just two people, one good plan,<br className="desktop-only" /> and probably something delicious.</p>
        <div className="button-row ask-buttons"><button className="button button-primary" onClick={next}>YES <Heart size={17} fill="currentColor" /></button><button className="button button-ghost dodge-button" onMouseEnter={dodge} onPointerDown={dodge} style={{ transform: `translate(${noPosition.left}px, ${noPosition.top}px)` }}>NO <span>✦</span></button></div>
        <p className="tiny-note">(the second button is feeling a little shy)</p>
      </section>}

      {step === 2 && <section className="screen celebration" aria-labelledby="celebration-title"><Confetti /><div className="celebration-kicker">the best possible answer</div><div className="big-heart"><Heart size={62} fill="currentColor" /></div><h1 id="celebration-title">Wait, you actually<br /><em>said yes??</em></h1><p className="lede">I was so ready for you to say no.<br />This is a very exciting development.</p><button className="button button-primary" onClick={next}>yay okay! <ArrowRight size={17} /></button></section>}

      {step === 3 && <section className="screen calendar-screen" aria-labelledby="calendar-title"><div className="eyebrow"><CalendarDays size={14} /> logistics, but make it romantic</div><h1 id="calendar-title">So... when are<br /><em>you free?</em></h1><p className="lede">Pick a day and time. I&apos;ll handle the rest.</p><div className="form-card"><label><span><CalendarDays size={15} /> your ideal day</span><input aria-label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label><span><Clock3 size={15} /> your ideal time</span><select aria-label="Time" value={time} onChange={(event) => setTime(event.target.value)}><option value="">Choose a time</option>{times.map((option) => <option key={option}>{option}</option>)}</select></label><button className="button button-primary full-button" disabled={!canSetDate} onClick={next}>set the date! <span>💌</span></button></div></section>}

      {step === 4 && <section className="screen vibe-screen" aria-labelledby="vibe-title"><div className="eyebrow"><Sparkles size={14} /> one last little detail</div><h1 id="vibe-title">What are we<br /><em>feeling?</em></h1><p className="lede">Pick your vibe. There are no wrong answers<br className="desktop-only" /> (except maybe plain toast).</p><div className="vibe-grid">{vibes.map((item) => <button key={item.name} className={`vibe-card ${vibe === item.name ? 'selected' : ''}`} onClick={() => setVibe(item.name)}><span className="vibe-icon">{item.icon}</span><span className="vibe-name">{item.name}</span><span className="vibe-note">{item.note}</span>{vibe === item.name && <span className="selected-check"><Check size={13} /></span>}</button>)}</div><button className="button button-primary full-button" disabled={!vibe} onClick={next}>that sounds perfect <ArrowRight size={17} /></button></section>}

      {step === 5 && <section className="screen final-screen" aria-labelledby="final-title"><FallingHearts /><div className="final-card"><div className="final-icon"><MapPin size={22} /></div><div className="eyebrow">it&apos;s a date</div><h1 id="final-title">Glad you didn&apos;t<br /><em>say no.</em></h1><p className="final-message">Be ready by <strong>6:00 PM</strong>,<br />I&apos;m coming to get you.</p><div className="final-route"><span>you</span><i /><span>somewhere lovely</span></div><div className="final-signoff">yours, <span>R</span></div></div><p className="tiny-note final-note">Your date is officially on the calendar.</p></section>}
    </main>
  )
}

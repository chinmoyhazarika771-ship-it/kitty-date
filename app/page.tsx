'use client'

import { FormEvent, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Hash,
  Heart,
  ImagePlus,
  Menu,
  Mic,
  MoreHorizontal,
  Paperclip,
  Send,
  Settings,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

const channels = [
  { name: 'general', unread: 3 },
  { name: 'cute-finds', unread: 0 },
  { name: 'outfits', unread: 0 },
  { name: 'cozy-corner', unread: 0 },
]

const initialMessages = [
  { id: 1, author: 'Mimi', time: '9:41 AM', avatar: 'M', tone: 'rose', text: 'Good morning, cuties! What is everyone up to today?' },
  { id: 2, author: 'Kiki', time: '9:44 AM', avatar: 'K', tone: 'peach', text: 'I found the sweetest little strawberry tote. It has tiny bows on it.' },
  { id: 3, author: 'You', time: '9:48 AM', avatar: 'Y', tone: 'red', text: 'That sounds adorable. Please share a photo!' },
  { id: 4, author: 'Mimi', time: '9:52 AM', avatar: 'M', tone: 'rose', text: 'I am planning a cozy movie night later. Anyone want to join?' },
]

export default function Page() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const sendMessage = (event: FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, { id: Date.now(), author: 'You', time: 'now', avatar: 'Y', tone: 'red', text }])
    setDraft('')
  }

  return (
    <main className="kitty-app">
      <aside className={`kitty-sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-glow glow-one" />
        <div className="sidebar-glow glow-two" />
        <div className="sidebar-brand">
          <div className="kitty-bow" aria-hidden="true"><span /><span /></div>
          <div><p>kitty</p><strong>channel</strong></div>
          <button className="icon-button mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></button>
        </div>

        <div className="profile-card">
          <div className="avatar avatar-red">Y</div>
          <div><strong>your little space</strong><span><i /> online</span></div>
          <ChevronDown size={16} />
        </div>

        <nav className="channel-nav" aria-label="Channels">
          <div className="nav-label"><span>channels</span><button className="icon-button" aria-label="Add channel">+</button></div>
          {channels.map((channel) => (
            <button key={channel.name} className={`channel-link ${activeChannel === channel.name ? 'active' : ''}`} onClick={() => { setActiveChannel(channel.name); setMenuOpen(false) }}>
              <Hash size={17} /><span>{channel.name}</span>{channel.unread > 0 && <b>{channel.unread}</b>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="tiny-note"><Sparkles size={14} /> keep it cute</div>
          <button className="settings-link"><Settings size={17} /> settings</button>
        </div>
      </aside>

      <section className="channel-area">
        <header className="channel-header">
          <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
          <div className="channel-title"><span className="bow-mini">⌁</span><div><div><Hash size={18} /> <h1>{activeChannel}</h1></div><p>A happy place for happy thoughts</p></div></div>
          <div className="header-actions"><button className="icon-button" aria-label="Notifications"><Bell /><i /></button><button className="icon-button" aria-label="More options"><MoreHorizontal /></button></div>
        </header>

        <div className="feed">
          <div className="welcome-card"><div className="welcome-stars"><Star /><Sparkles /><Heart fill="currentColor" /></div><p className="eyebrow">welcome to #{activeChannel}</p><h2>A pocket of happy things.</h2><p>This is the very beginning of the #{activeChannel} channel. Say something sweet!</p></div>
          <div className="day-divider"><span>today</span></div>
          {messages.map((message) => (
            <article className="message-row" key={message.id}>
              <div className={`avatar avatar-${message.tone}`}>{message.avatar}</div>
              <div className="message-body"><div className="message-meta"><strong>{message.author}</strong><time>{message.time}</time></div><p>{message.text}</p><div className="reaction"><Heart size={13} /> 2</div></div>
            </article>
          ))}
        </div>

        <form className="composer" onSubmit={sendMessage}>
          <div className="composer-box"><button type="button" className="composer-action" aria-label="Attach file"><Paperclip /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Message #${activeChannel}`} aria-label={`Message ${activeChannel}`} /><button type="button" className="composer-action desktop-action" aria-label="Add image"><ImagePlus /></button><button type="button" className="composer-action desktop-action" aria-label="Record audio"><Mic /></button><button className="send-button" type="submit" aria-label="Send message"><Send /></button></div><p>press <kbd>Enter</kbd> to send <span>•</span> be kind, always</p>
        </form>
      </section>
    </main>
  )
}

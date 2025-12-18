import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBubble from '../components/ChatBubble'
import { fetchChatMessages, sendChatMessage } from '../features/userSlice'

export default function ChatPage() {
  const dispatch = useDispatch()
  const { messages } = useSelector((state) => state.user)
  const [text, setText] = useState('')

  useEffect(() => {
    dispatch(fetchChatMessages())
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!text.trim()) return
    dispatch(sendChatMessage({ text, sender: 'customer' }))
    setText('')
  }

  return (
    <section className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Driver chat</p>
            <h2 className="text-xl font-semibold text-slate-900">Talk to your driver</h2>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            Live
          </span>
        </div>
        <div className="space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-4" style={{ maxHeight: 360 }}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
        <form className="mt-4 flex gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type a message…"
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Send
          </button>
        </form>
      </div>

      <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Support tips</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>• Share entrance or gate codes for faster drop-offs.</li>
          <li>• Upload photos (soon) for hard-to-find locations.</li>
          <li>• Escalate to Smart Assist for live agents.</li>
        </ul>
      </aside>
    </section>
  )
}


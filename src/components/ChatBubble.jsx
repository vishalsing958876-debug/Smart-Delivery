export default function ChatBubble({ message }) {
  const isDriver = message.sender === 'driver'
  return (
    <div className={`flex ${isDriver ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs rounded-2xl px-4 py-2 text-sm shadow ${
          isDriver
            ? 'bg-white text-slate-700 rounded-bl-none'
            : 'bg-brand-600 text-white rounded-br-none'
        }`}
      >
        <p>{message.text}</p>
        <span className="mt-1 block text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}


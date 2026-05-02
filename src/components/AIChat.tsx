import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const preDefinedPrompts = [
  "How do I register to vote?",
  "What is VVPAT?",
  "What documents do I need?",
  "How are votes counted?"
]

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Namaste! I'm your Election Education Assistant. Ask me anything about the Indian voting process, EVMs, or ECI guidelines!" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    window.addEventListener('open-ai-chat', handleOpenChat)
    return () => window.removeEventListener('open-ai-chat', handleOpenChat)
  }, [])

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue
    if (!messageText.trim()) return

    setMessages(prev => [...prev, { role: 'user', text: messageText }])
    setInputValue('')
    setIsLoading(true)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        setMessages(prev => [...prev, { role: 'assistant', text: "API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file." }])
        setIsLoading(false)
        return
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are a highly helpful, concise, and accurate expert on the Indian Election process. Provide short, perfectly crafted, and direct answers. Avoid long paragraphs.",
      })

      const history = messages.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }))

      const chat = model.startChat({ history })
      const result = await chat.sendMessage(messageText)
      const responseText = result.response.text()

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting to the AI model right now." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] brutal-btn-primary p-4 rounded-none shadow-premium-lg flex items-center gap-3"
      >
        <MessageSquare size={32} />
        <span className="font-black hidden md:inline">ASK AI ASSISTANT</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-8 right-8 z-[70] w-[90vw] md:w-[450px] h-[600px] brutal-card flex flex-col p-0 overflow-hidden shadow-premium-lg"
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white p-6 border-b-4 border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/5 backdrop-blur-md p-2 border border-white/10">
                  <Bot className="text-slate-200" size={24} />
                </div>
                <div>
                  <h3 className="font-black uppercase text-xl leading-none">Election AI</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-brutalist-neon">Online & Ready</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Chat"
                className="hover:bg-white/5 backdrop-blur-md/20 p-2 border border-transparent hover:border-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6 custom-scrollbar"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-4 border border-white/10 font-bold
                    ${m.role === 'user' 
                      ? 'bg-cyan-500 shadow-premium' 
                      : 'bg-white/5 backdrop-blur-md shadow-glass'}
                  `}>
                    <div className="flex items-center gap-2 mb-2 opacity-60 text-xs uppercase font-black">
                      {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                      {m.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-4 border border-white/10 font-bold bg-white/5 backdrop-blur-md shadow-glass flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} /> Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Input */}
            <div className="p-6 border-t-4 border-white/10 bg-white/5 backdrop-blur-md">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {preDefinedPrompts.map(p => (
                    <button 
                      key={p}
                      onClick={() => handleSend(p)}
                      className="text-xs font-black uppercase p-2 border border-white/10 hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about voting..."
                  className="flex-1 p-3 border border-white/10 font-bold focus:outline-none focus:ring-0 placeholder:uppercase"
                />
                <button 
                  onClick={() => handleSend()}
                  aria-label="Send Message"
                  className="bg-pink-600 text-white p-3 border border-white/10 shadow-premium hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChat

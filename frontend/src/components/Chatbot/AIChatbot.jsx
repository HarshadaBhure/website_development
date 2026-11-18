import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Trash2, Bot, User, Sparkles, AlertCircle, PhoneCall } from 'lucide-react';
import { sendChatMessage } from '../../services/api';

const QUICK_ACTIONS = [
  "What services do you offer?",
  "I need an ERP solution",
  "Tell me about your company",
  "Which industries do you serve?",
  "I want to contact your team"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! Welcome to Swaraj Asia Technologies. How can I assist you with your enterprise ERP, Cloud, or Digital Transformation requirements today?'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputMsg).trim();
    if (!query || loading) return;

    setError('');
    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    if (!textToSend) setInputMsg('');
    setLoading(true);

    try {
      const historyPayload = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await sendChatMessage(query, historyPayload);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          leadCollected: res.lead_collected
        }
      ]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      setError("I'm temporarily unable to process your request. Please contact our team directly.");
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm temporarily unable to process your request. Please contact our team directly via our Contact Us page or email sales@swarajasia.com.",
          isFallback: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Conversation reset. How can I help you today?'
      }
    ]);
    setError('');
  };

  const formatMessageText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const formattedParts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={lIdx}>
          {formattedParts}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-brand-pink via-brand-cyan to-brand-yellow text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/20"
          aria-label="Toggle AI Assistant Chat"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-900" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-pink rounded-full border-2 border-white animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-pink rounded-full border-2 border-white" />
            </>
          )}
        </button>
      </div>

      {/* Chatbot Window / Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[620px] h-[calc(100vh-120px)] bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-cyan flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base flex items-center gap-1.5">
                    Swaraj AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                  </h3>
                  <p className="text-[11px] text-slate-400">Enterprise Solutions &amp; Consultation</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  title="Clear Chat"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-2 text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-semibold shrink-0">Quick Ask:</span>
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(action)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-brand-pink hover:border-brand-pink/50 transition-colors shadow-2xs"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs text-slate-800 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-brand-pink shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-brand-pink text-white rounded-br-none font-medium'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {formatMessageText(msg.content)}

                    {msg.isFallback && (
                      <div className="mt-3 pt-2 border-t border-slate-200">
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-100 text-slate-900 border border-cyan-300 text-xs font-semibold hover:bg-cyan-200 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-brand-cyan" />
                          <span>Contact Us Page</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-brand-pink shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 text-slate-500 flex items-center gap-2 shadow-2xs">
                    <span className="text-[11px] italic">AI Assistant is typing</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Error Banner */}
            {error && (
              <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 text-rose-700 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about ERP, Cloud, or request a consultation..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-pink disabled:opacity-50 transition-colors placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !inputMsg.trim()}
                className="p-2.5 rounded-xl bg-brand-pink text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-700 transition-all shadow-md"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

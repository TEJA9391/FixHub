import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const AIChatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Fixie, your AI home assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let botAction = null;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('plumb') || lowerInput.includes('leak') || lowerInput.includes('pipe')) {
        botResponse = "It looks like you have a plumbing issue. Would you like me to open the Plumbing experts section for you?";
        botAction = { label: "Open Plumbing Services", link: "/category/Plumbing" };
      } else if (lowerInput.includes('ac') || lowerInput.includes('air conditioner')) {
        botResponse = "It looks like you need AC services. We offer Deep Cleaning, Gas Charging, and general repair. Should I guide you there?";
        botAction = { label: "View AC Repair", link: "/category/AC Repair" };
      } else if (lowerInput.includes('clean') || lowerInput.includes('sweep')) {
        botResponse = "We have top-rated professionals for Full Home Cleaning, Sofa Cleaning, and Bathroom Cleaning.";
        botAction = { label: "See Cleaning Packages", link: "/category/Cleaning & Pest" };
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much')) {
        botResponse = "Our prices vary by service, but we guarantee transparent pricing with zero hidden fees. You can see exact prices on any service detail page!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        const greetings = ["Hello! Looking to get some home repairs done today?", "Hi there! How can Fixie help you right now?", "Hey! Ready to book a professional?"];
        botResponse = greetings[Math.floor(Math.random() * greetings.length)];
      } else if (lowerInput.includes('thank')) {
        botResponse = "You're welcome! Let me know if you need anything else.";
      } else {
        const fallbacks = [
          `I'm currently specialized in AC, Plumbing, and Cleaning. I'm not fully trained on "${input}" yet, but our search bar might find it!`,
          `Could you rephrase that? If you need home maintenance like AC Repair or Cleaning, I can jump right in!`,
          `I don't have a direct answer for "${input}", but I can connect you with an expert if you browse our categories.`,
          `Interesting! To best help you, are you looking for AC Service, Plumbing, or Home Cleaning?`
        ];
        botResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, isBot: true, action: botAction }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-gray-900/30 z-[100] group"
          >
            <Sparkles size={24} className="absolute text-[#0c831f] -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageSquare size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-[100] overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="h-20 bg-gray-900 flex items-center justify-between px-6 shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c831f]/20 to-transparent opacity-50" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">Fixie AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#0c831f] animate-pulse" />
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors relative z-10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", msg.isBot ? "self-start" : "self-end ml-auto flex-row-reverse")}>
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.isBot ? "bg-green-100 text-[#0c831f]" : "bg-blue-100 text-blue-600")}>
                    {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn("px-5 py-3.5 shadow-sm text-[13px] font-medium leading-relaxed flex flex-col", 
                    msg.isBot 
                      ? "bg-white text-gray-700 rounded-2xl rounded-tl-sm border border-gray-100" 
                      : "bg-gray-900 text-white rounded-2xl rounded-tr-sm"
                  )}>
                    <span>{msg.text}</span>
                    {msg.action && (
                      <button 
                        onClick={() => {
                          setIsOpen(false);
                          navigate(msg.action.link);
                        }}
                        className="mt-3 w-full bg-[#0c831f] text-white py-2.5 rounded-xl text-xs font-black shadow-md shadow-[#0c831f]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1"
                      >
                        {msg.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-[#0c831f] flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="px-5 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-50 border-none rounded-xl pl-5 pr-14 py-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#0c831f]/20 outline-none transition-all text-gray-900"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-[#0c831f] text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

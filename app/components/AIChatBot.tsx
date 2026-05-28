"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, HelpCircle, PhoneCall } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isWhatsAppLink?: boolean;
}

const QUICK_SUGGESTIONS = [
  "🚗 What cars are available?",
  "💰 What is the rental price?",
  "🌴 Can I drive to Goa?",
  "📍 Where do you deliver?",
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on mount to prevent SSR local-time hydration mismatch
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hi, I'm the Unique AI Concierge. I can help you select your premium Pune rental vehicle, detail Indian Rupee pricing, coordinate delivery in Maharashtra & Goa, or set up our new Premium Taxi Service. What can I do for you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add user message
    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Process automated response after organic typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(textToSend);
      setMessages((prev) => [...prev, botResponse]);
    }, 850);
  };

  const getBotResponse = (query: string): Message => {
    const q = query.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // AI Responses with beautiful copy matching Apple's elegant, direct style.
    if (q.includes("car") || q.includes("fleet") || q.includes("model") || q.includes("brand") || q.includes("mahindra") || q.includes("thar") || q.includes("fortuner") || q.includes("creta") || q.includes("nexon") || q.includes("swift")) {
      return {
        sender: "bot",
        text: "We offer a handpicked fleet of premium vehicles ideal for Indian roads: the mighty Toyota Fortuner (4x4), the rugged Mahindra Thar Convertible (perfect for Goa beaches), the luxury Mahindra XUV700, the silent Tata Nexon EV, the practical Hyundai Creta, and the nimble Maruti Suzuki Swift.",
        timestamp: time,
      };
    }
    
    if (q.includes("price") || q.includes("cost") || q.includes("rent") || q.includes("fee") || q.includes("day") || q.includes("daily") || q.includes("rupee") || q.includes("inr") || q.includes("rs")) {
      return {
        sender: "bot",
        text: "Our premium daily rentals begin at a highly accessible ₹1,800/day for the Swift ZXi up to ₹4,500/day for the elite Toyota Fortuner 4x4. This includes comprehensive insurance, standard sanitization, and 24-hour door-step delivery in Pune.",
        timestamp: time,
      };
    }

    if (q.includes("taxi") || q.includes("chauffeur") || q.includes("driver") || q.includes("cab") || q.includes("with driver") || q.includes("chauffeured")) {
      return {
        sender: "bot",
        text: "Unique now offers a premium Taxi service alongside our standard self-driving rentals. Enjoy a professional driver, completely inclusive of fuel and tolls, for a flat driver fee of +₹1,500/day. Best of all, because our driver operates the vehicle, absolutely ZERO security deposit is required!",
        timestamp: time,
      };
    }

    if (q.includes("goa") || q.includes("travel") || q.includes("trip") || q.includes("beach") || q.includes("mahabaleshwar") || q.includes("lonavala")) {
      return {
        sender: "bot",
        text: "Planning a road trip to Goa, Lonavala, or Mahabaleshwar? The convertible Mahindra Thar 4x4 is our most requested vehicle for Goa's scenic beaches, while the high-performance Toyota Fortuner provides unmatched highway comfort. We offer special multi-day packages for long-distance travel!",
        timestamp: time,
      };
    }

    if (q.includes("custom") || q.includes("paint") || q.includes("accessory") || q.includes("carrier") || q.includes("rack")) {
      return {
        sender: "bot",
        text: "We offer premium trip custom additions, including heavy-duty roof carriers, specialized luggage racks, child safety seats, and highway navigation assistance for your travel route across Maharashtra & Goa. Simply request these during checkout!",
        timestamp: time,
      };
    }

    if (q.includes("location") || q.includes("pune") || q.includes("deliver") || q.includes("where") || q.includes("airport") || q.includes("pnq") || q.includes("shivajinagar")) {
      return {
        sender: "bot",
        text: "Unique Rentals operates across Pune, Maharashtra, India. We offer complimentary direct delivery to major hotels, Pune Airport (PNQ) VIP terminals, or private residences in Shivajinagar, Senapati Bapat Road, Koregaon Park, and Kalyani Nagar.",
        timestamp: time,
      };
    }

    if (q.includes("book") || q.includes("reserve") || q.includes("how") || q.includes("contact") || q.includes("phone")) {
      return {
        sender: "bot",
        text: "Reserving is simple. You can use the direct 'Book Now' options on this page, or click below to connect with a booking specialist instantly on WhatsApp.",
        timestamp: time,
        isWhatsAppLink: true,
      };
    }

    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("sup")) {
      return {
        sender: "bot",
        text: "Hello. I am here to help. Ask me about our premium Pune rentals, Rupee pricing, Goa travel advice, or request connection to a human specialist.",
        timestamp: time,
      };
    }

    // Default Fallback supporting direct human redirection
    return {
      sender: "bot",
      text: "I am designed to assist with vehicle specs, Indian Rupee pricing, and Maharashtra/Goa travel packages. For bespoke inquiries or custom reservations, would you like to speak to a support specialist on WhatsApp?",
      timestamp: time,
      isWhatsAppLink: true,
    };
  };

  const handleWhatsAppRedirect = () => {
    const phone = "919999999999";
    const text = encodeURIComponent("Hi Unique Rentals Pune! I am using your AI Assistant and would love to speak to an agent about renting a car.");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans antialiased select-none text-[#1d1d1f]">
      
      {/* 1. FLOATING CHAT BUBBLE (Apple Minimal Style) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 bg-[#1d1d1f] hover:bg-[#333336] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer relative focus:outline-none"
        aria-label="Toggle AI Concierge Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare size={20} fill="currentColor" />
              {/* Apple glowing notification dot */}
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#0071e3] rounded-full border-2 border-[#1d1d1f] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 2. CHAT DRAWER PANEL (Apple Store Configurator Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute bottom-16 right-0 w-[360px] md:w-[380px] bg-white border border-[#d2d2d7]/80 rounded-3xl overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.08)] flex flex-col"
          >
            {/* Header branding block */}
            <div className="bg-white border-b border-[#e5e5ea] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-center text-black font-semibold text-xs">
                  AI
                </div>
                <div>
                  <div className="font-semibold text-sm tracking-tight">AI Assistant</div>
                  <div className="text-[10px] text-gray-400 font-medium">Concierge System • Online</div>
                </div>
              </div>

              {/* Direct human backup call shortcut */}
              <button 
                onClick={handleWhatsAppRedirect}
                className="text-gray-400 hover:text-[#0071e3] transition p-1.5 rounded-full hover:bg-gray-50"
                title="Connect with Human Specialist via WhatsApp"
              >
                <PhoneCall size={15} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-5 space-y-4 max-h-[300px] min-h-[260px] overflow-y-auto bg-[#fafafa]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 max-w-[90%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon Avatar */}
                  <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                    msg.sender === "user" 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-[#1d1d1f] text-white"
                  }`}>
                    {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <div className={`px-4 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#0071e3] text-white rounded-tr-none font-medium"
                        : "bg-white border border-[#e5e5ea] text-[#1d1d1f] rounded-tl-none"
                    }`}>
                      {msg.text}

                      {/* Dynamic action button within bot response to connect WhatsApp */}
                      {msg.isWhatsAppLink && (
                        <button
                          onClick={handleWhatsAppRedirect}
                          className="mt-3.5 w-full bg-[#1d1d1f] hover:bg-[#333336] text-white py-2 rounded-xl text-[10px] font-semibold tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <PhoneCall size={11} fill="currentColor" />
                          Chat on WhatsApp
                        </button>
                      )}
                    </div>
                    <span className={`text-[8px] text-gray-400 font-mono ${
                      msg.sender === "user" ? "text-right mr-1" : "ml-1"
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Pulsing Typist Simulator */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[90%]">
                  <div className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[10px]">
                    <Bot size={12} />
                  </div>
                  <div className="bg-white border border-[#e5e5ea] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-5 py-3 border-t border-[#e5e5ea] bg-white flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              {QUICK_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug.slice(2))}
                  className="bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[10px] font-medium text-gray-700 px-3 py-1.5 rounded-full shrink-0 border border-[#e5e5ea] transition active:scale-95 cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3.5 bg-white border-t border-[#e5e5ea] flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Ask about car models, prices..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow bg-[#f5f5f7] border border-[#e5e5ea] rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#0071e3] transition text-[#1d1d1f] placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-8 h-8 bg-[#1d1d1f] hover:bg-[#333336] active:scale-95 text-white rounded-full flex items-center justify-center transition shrink-0 cursor-pointer"
                title="Send inquiry"
              >
                <Send size={13} fill="currentColor" className="ml-0.5 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

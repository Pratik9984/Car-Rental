"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Award } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  
  // SUPPORT SETTINGS
  const SUPPORT_PHONE = "15550199999"; // Standard generic placeholder phone number
  const DEFAULT_TEXT = "Hi Unique Rentals! I am visiting your website and would love to inquire about renting a premium car.";

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = userMsg.trim() ? userMsg.trim() : DEFAULT_TEXT;
    const encodedMsg = encodeURIComponent(finalMsg);
    const waUrl = `https://wa.me/${SUPPORT_PHONE}?text=${encodedMsg}`;
    
    // Redirect to WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setUserMsg("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      
      {/* 1. FLOATING ACTION BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl shadow-green-600/20 cursor-pointer relative focus:outline-none"
        aria-label="Contact support on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={28} fill="currentColor" className="text-white" />
              {/* Active green breathing glowing indicator dot */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">1</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 2. CHAT OVERLAY CARD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-18 right-0 w-[350px] bg-[#0c0d12]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white"
          >
            {/* Header branding block */}
            <div className="bg-[#128C7E] px-5 py-4 flex items-center gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-xl pointer-events-none" />
              
              {/* Specialist Avatar */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 bg-white/10 border border-white/20 rounded-full flex items-center justify-center font-bold text-lg text-white">
                  UR
                </div>
                {/* Active online dot */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#128C7E] rounded-full" />
              </div>

              <div>
                <div className="font-bold flex items-center gap-1">
                  Unique Rentals Support
                  <Award size={13} className="text-yellow-400" />
                </div>
                <div className="text-[10px] text-emerald-100 flex items-center gap-1 font-mono">
                  <span>●</span> Online (Replies instantly)
                </div>
              </div>
            </div>

            {/* Chat message timeline Area */}
            <div className="px-5 py-6 space-y-4 max-h-[260px] overflow-y-auto bg-cover bg-center bg-[#07080a] relative"
                 style={{ 
                   backgroundImage: `radial-gradient(ellipse at center, rgba(18,140,126,0.05) 0%, rgba(0,0,0,0) 80%)` 
                 }}>
              
              {/* Bot System Greeting Bubble */}
              <div className="flex flex-col items-start space-y-1">
                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[90%] text-gray-200">
                  Hi there! 👋 Welcome to Unique Rentals Customer Support.
                </div>
                <span className="text-[9px] text-gray-500 ml-1 font-mono">02:08 AM</span>
              </div>

              {/* Bot Main Instruction Bubble */}
              <div className="flex flex-col items-start space-y-1">
                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[90%] text-gray-200">
                  Looking to rent one of our premium cars or have questions about your customized 3D hypercar configuration?
                  <br /><br />
                  Send us a message below and we will connect you directly with a specialist on WhatsApp!
                </div>
                <span className="text-[9px] text-gray-500 ml-1 font-mono">02:08 AM</span>
              </div>
            </div>

            {/* Input form area */}
            <form onSubmit={handleStartChat} className="p-4 bg-black/40 border-t border-white/5 flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-9 h-9 shrink-0 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full flex items-center justify-center transition cursor-pointer"
                title="Send via WhatsApp"
              >
                <Send size={15} fill="currentColor" className="ml-0.5 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

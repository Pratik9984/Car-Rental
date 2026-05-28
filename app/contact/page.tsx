"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronRight, Clock, Headset, Shield, ShieldCheck, Mail, Phone, MapPin, Send, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.49 2 2 6.493 2 12.034c0 1.833.48 3.564 1.396 5.093l-1.353 4.939 5.076-1.33A9.972 9.972 0 0012.03 22c5.54 0 10.03-4.493 10.03-10.033C22.062 6.493 17.57 2 12.03 2zm6.096 14.145c-.266.745-1.531 1.356-2.102 1.439-.56.081-1.127.146-3.18-.7-2.63-1.085-4.307-3.756-4.437-3.931-.131-.175-1.066-1.417-1.066-2.699 0-1.282.673-1.912.912-2.164.24-.251.524-.315.7-.315.176 0 .352.002.505.009.16.007.377-.06.59.45.263.631.898 2.196.976 2.355.078.16.13.345.023.553-.105.21-.225.42-.375.592-.15.174-.316.362-.175.602.14.24.62 1.02 1.328 1.65.91.81 1.674 1.061 1.914 1.182.24.12.38.102.52-.06.14-.162.602-.702.763-.942.16-.24.32-.2.536-.12.217.08 1.38.651 1.618.77.24.12.399.18.459.282.06.102.06.59-.207 1.335z" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.05
    },
  },
};

interface HubInfo {
  name: string;
  address: string;
  phone: string;
  hours: string;
  coords: { x: string; y: string };
  color: string;
}

const hubsData: HubInfo[] = [
  {
    name: "Pune Airport Hub",
    address: "Lohegaon Airport VIP Parking, Lane 3, Pune, MH",
    phone: "+91 98765 43210",
    hours: "Open 24/7",
    coords: { x: "42%", y: "52%" },
    color: "from-blue-500 to-indigo-600"
  },
  {
    name: "Mumbai BKC Lounge",
    address: "G-Block, BKC Luxury Plaza, Sector 4, Mumbai, MH",
    phone: "+91 98765 43211",
    hours: "Open 24/7",
    coords: { x: "28%", y: "45%" },
    color: "from-purple-500 to-pink-600"
  },
  {
    name: "Goa Beachfront Hub",
    address: "Panaji Elite Pier Road, Block H, Panaji, Goa",
    phone: "+91 98765 43212",
    hours: "08:00 AM - 11:00 PM",
    coords: { x: "65%", y: "78%" },
    color: "from-emerald-400 to-teal-600"
  }
];

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success">("idle");
  
  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [subject, setSubject] = useState("Self Drive Inquiry");
  const [message, setMessage] = useState("");
  const [formStep, setFormStep] = useState<"form" | "sending" | "success">("form");

  // Interactive Hub Map State
  const [selectedHub, setSelectedHub] = useState<number>(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus("loading");
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactEmail || !message) return;
    setFormStep("sending");
    setTimeout(() => {
      setFormStep("success");
    }, 2000);
  };

  const resetContactForm = () => {
    setFullName("");
    setContactEmail("");
    setMessage("");
    setSubject("Self Drive Inquiry");
    setFormStep("form");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans overflow-x-hidden flex flex-col justify-between">
      
      {/* --- HEADER NAVBAR --- */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto w-full z-[10002] relative"
      >
        <Link href="/" className="text-2xl font-bold tracking-tighter z-[10002] relative cursor-pointer text-black">
          Unique
        </Link>

        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <Link href="/cars" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">
            🚘 Our Fleet
          </Link>
          <Link href="/#how-it-works-section" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">
            How it Works
          </Link>
          <Link href="/#features-section" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">
            Features
          </Link>
          <Link href="/#showroom-section" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">
            Our Hubs
          </Link>
          <Link href="/about" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">
            About Us
          </Link>
          <Link href="/contact" className="text-black font-bold text-xs cursor-pointer border-b-2 border-black pb-0.5">
            Contact Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.instagram.com/uniquerentals"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_4px_20px_rgba(220,39,67,0.35)] transition-all duration-300 cursor-pointer"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#25d366] to-[#128c7e] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-300 cursor-pointer"
            aria-label="Contact us on WhatsApp"
          >
            <WhatsAppIcon size={16} />
          </a>
          <button suppressHydrationWarning className="flex bg-black text-white px-5 py-2.5 rounded-full text-xs font-medium items-center gap-2 hover:bg-gray-800 transition cursor-pointer">
            <Download size={14} /> Download App
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button suppressHydrationWarning
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/80 border border-gray-200/50 shadow-sm z-[10002] relative focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1 w-5">
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-0.5 bg-black rounded"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-0.5 bg-black rounded"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-0.5 bg-black rounded"
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 top-0 left-0 right-0 h-screen bg-white/95 backdrop-blur-xl z-[10000] flex flex-col px-10 pt-28 space-y-6 md:hidden"
        >
          <div className="flex flex-col space-y-6 text-xl font-bold text-left tracking-tight">
            <Link href="/cars" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black py-2 border-b border-gray-100">
              🚘 Our Fleet
            </Link>
            <Link href="/#how-it-works-section" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black py-2 border-b border-gray-100">
              How it Works
            </Link>
            <Link href="/#features-section" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black py-2 border-b border-gray-100">
              Features
            </Link>
            <Link href="/#showroom-section" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black py-2 border-b border-gray-100">
              Our Hubs
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black py-2 border-b border-gray-100">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-black py-2 border-b border-gray-100 font-bold">
              Contact Us
            </Link>
          </div>

          <div className="flex gap-3 mt-6">
            <a
              href="https://www.instagram.com/uniquerentals"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white flex-shrink-0"
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon size={22} />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#25d366] to-[#128c7e] flex items-center justify-center text-white flex-shrink-0 shadow-sm transition"
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon size={22} />
            </a>
            <button suppressHydrationWarning
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 bg-black text-white px-6 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download App
            </button>
          </div>
        </motion.div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="px-6 md:px-10 pt-12 pb-16 max-w-7xl mx-auto w-full text-center space-y-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-1 bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Headset size={12} strokeWidth={2.5} /> VIP Concierge Support
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight"
          >
            We Are Standing By. <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Command Your Journey
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm md:text-base font-medium max-w-md mx-auto"
          >
            Connect with our high-end dispatch team to orchestrate wedding fleets, airport transits, or private corporate logistics.
          </motion.p>
        </motion.div>
      </section>

      {/* --- SPLIT GRID SECTION --- */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-10 pb-20 items-stretch">
        
        {/* LEFT: CONCIERGE INFORMATION CARDS (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-5 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black tracking-tight border-b border-gray-200/50 pb-4">
              Direct Access Channels
            </h2>

            {/* Helpline Card */}
            <a
              href="tel:+919876543210"
              className="block bg-white border border-gray-200/50 p-6 rounded-3xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-blue-500/20 transition-all duration-300 group"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition duration-300 shrink-0">
                  <Phone size={20} />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    24/7 VIP Line
                  </span>
                  <span className="block font-bold text-base text-black font-mono">
                    +91 98765 43210
                  </span>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Call for immediate roadside assistance or instant booking adjustments.
                  </p>
                </div>
              </div>
            </a>

            {/* Email Support Card */}
            <a
              href="mailto:concierge@uniquerentals.com"
              className="block bg-white border border-gray-200/50 p-6 rounded-3xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-blue-500/20 transition-all duration-300 group"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition duration-300 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Corporate Email
                  </span>
                  <span className="block font-bold text-base text-black">
                    concierge@uniquerentals.com
                  </span>
                  <p className="text-[10px] text-gray-400 font-medium">
                    For long-term contracts, movie shoots, and luxury wedding inquiries.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Quick Hub Address Listing */}
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 p-6 rounded-[32px] space-y-4">
            <h3 className="font-bold text-sm text-black flex items-center gap-2">
              <MapPin size={16} className="text-[#0071e3]" /> Our Luxury Handovers
            </h3>
            
            <div className="space-y-3 text-xs font-semibold text-gray-500">
              <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                <span>Pune Airport VIP Hub:</span>
                <span className="text-black text-right max-w-[180px] font-normal truncate">
                  Lohegaon VIP Terminal
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                <span>Mumbai Hub:</span>
                <span className="text-black text-right max-w-[180px] font-normal truncate">
                  BKC Luxury Plaza Sector 4
                </span>
              </div>
              <div className="flex justify-between items-start pb-1">
                <span>Goa Hub:</span>
                <span className="text-black text-right max-w-[180px] font-normal truncate">
                  Panaji Elite Pier Pier Road
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: PREMIUM MESSAGE ORCHESTRATOR FORM (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-7"
        >
          <div className="bg-white border border-gray-200/50 p-8 md:p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.02)] h-full flex flex-col justify-center select-none">
            <AnimatePresence mode="wait">
              {formStep === "form" && (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-black tracking-tight">Send a Dispatch Request</h3>
                    <p className="text-[11px] text-gray-400 font-medium">We monitor requests and reply within 15 minutes.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Full Name</label>
                      <input suppressHydrationWarning
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aditya Deshmukh"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-black font-semibold focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Email Address</label>
                      <input suppressHydrationWarning
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. aditya@gmail.com"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-black font-semibold focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Inquiry Type</label>
                    <select suppressHydrationWarning
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-black font-semibold focus:bg-white focus:border-blue-500 outline-none transition"
                    >
                      <option value="Self Drive Inquiry">🚗 Self-Drive Vehicle Rental</option>
                      <option value="Airport VIP Pickup">✈️ Airport VIP Pickups</option>
                      <option value="Luxury Wedding Fleet">💍 Luxury Wedding Cars</option>
                      <option value="Corporate Fleet Tieup">🏢 Corporate Fleet Contracting</option>
                      <option value="Other Assistance">💬 Other Support Assistance</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Detail Your Request</label>
                    <textarea suppressHydrationWarning
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share pickup locations, timeline requirements, or vehicle preferences..."
                      rows={4}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-black font-semibold focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition resize-none"
                    />
                  </div>

                  <button suppressHydrationWarning
                    type="submit"
                    className="w-full bg-[#0071e3] hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer flex justify-center items-center gap-2 shadow-md shadow-blue-500/10"
                  >
                    <Send size={12} /> Send Concierge Message
                  </button>
                </motion.form>
              )}

              {formStep === "sending" && (
                <motion.div
                  key="sending-loader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]"
                >
                  <div className="w-10 h-10 border-4 border-gray-100 border-t-[#0071e3] rounded-full animate-spin" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-black">Orchestrating dispatch route...</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Contacting high-priority VIP support queue.</p>
                  </div>
                </motion.div>
              )}

              {formStep === "success" && (
                <motion.div
                  key="sending-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 flex flex-col items-center justify-center text-center space-y-5 min-h-[300px]"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border-2 border-emerald-500 animate-pulse">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono">REQUEST DISPATCHED</span>
                    <h3 className="text-xl md:text-2xl font-bold text-black mt-1">Message Transmitted!</h3>
                    <p className="text-gray-500 text-xs max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-black">{fullName}</span>. Your concierge request has been allocated to a VIP dispatcher. We will reach you at <span className="font-semibold text-black">{contactEmail}</span> within 15 minutes.
                    </p>
                  </div>

                  <button suppressHydrationWarning
                    onClick={resetContactForm}
                    className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer transition mt-2"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* --- INTERACTIVE HUB MAPS SECTION --- */}
      <section className="bg-white border-t border-gray-200/50 py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-lg mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0071e3] font-mono block">OUR HUB GEOGRAPHY</span>
            <h2 className="text-3xl font-bold text-black tracking-tight leading-tight">
              Interactive Showroom Terminals
            </h2>
            <p className="text-gray-500 text-xs font-semibold">
              Select a luxury hub terminal below to pinpoint its coordinates and coordinates details.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Hub Selector tabs (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              {hubsData.map((hub, idx) => (
                <button suppressHydrationWarning
                  key={idx}
                  onClick={() => setSelectedHub(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-1.5 ${
                    selectedHub === idx
                      ? "bg-white border-blue-500/30 shadow-[0_12px_35px_rgba(0,113,227,0.06)] scale-[1.02]"
                      : "bg-[#f5f5f7]/50 border-gray-100 hover:bg-[#f5f5f7] hover:scale-[1.01]"
                  }`}
                >
                  <h4 className={`font-bold text-sm transition ${selectedHub === idx ? "text-[#0071e3]" : "text-black"}`}>
                    {hub.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed truncate max-w-xs">
                    {hub.address}
                  </p>
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-gray-400 mt-1 uppercase">
                    <span>{hub.hours}</span>
                    {selectedHub === idx && <span className="text-[#0071e3]">Selected</span>}
                  </div>
                </button>
              ))}
            </div>

            {/* Stylized Visual Map Canvas (8 cols) */}
            <div className="md:col-span-8 bg-gray-100/80 border border-gray-200/50 rounded-3xl h-[340px] relative overflow-hidden flex items-center justify-center group shadow-sm select-none">
              
              {/* stylized background canvas grid */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-50/70 to-gray-200/40" />
              
              {/* grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70" />
              
              {/* Outline map visual fallbacks */}
              <div className="absolute w-[240px] h-[240px] rounded-full border border-gray-200/50 animate-pulse pointer-events-none" />
              <div className="absolute w-[440px] h-[440px] rounded-full border border-gray-200/25 pointer-events-none" />

              {/* Coordinates highlight card */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-200/50 text-[10px] font-mono font-bold text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span>TERMINAL GEO-LOCK ACTIVE</span>
              </div>

              {/* Coordinates numbers display */}
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-200/50 text-[9px] font-mono text-gray-400">
                LAT: <span className="text-black font-bold">18.5204° N</span> &nbsp;|&nbsp; LON: <span className="text-black font-bold">73.8567° E</span>
              </div>

              {/* Dynamic Interactive Pinpoints */}
              {hubsData.map((hub, idx) => (
                <motion.div
                  key={idx}
                  animate={selectedHub === idx ? { scale: 1.15 } : { scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                  style={{ top: hub.coords.y, left: hub.coords.x }}
                >
                  <div className="relative flex items-center justify-center cursor-pointer" onClick={() => setSelectedHub(idx)}>
                    <span className={`absolute inline-flex h-10 w-10 rounded-full bg-gradient-to-tr ${hub.color} opacity-20 animate-ping`} />
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${hub.color} text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white relative z-10 transition duration-300 ${selectedHub === idx ? "ring-4 ring-blue-500/20" : ""}`}>
                      {idx + 1}
                    </div>

                    <AnimatePresence>
                      {selectedHub === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: -45, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute whitespace-nowrap bg-black text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md z-30"
                        >
                          📍 {hub.name}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}

              {/* Big highlighted detailed label overlay card (Mobile responsive) */}
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-xs bg-white border border-gray-200/60 p-4 rounded-2xl shadow-lg select-none">
                <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Active Terminal
                </span>
                <h4 className="font-extrabold text-xs text-black mb-1">
                  {hubsData[selectedHub].name}
                </h4>
                <p className="text-[10px] text-gray-450 leading-relaxed font-semibold mb-2">
                  {hubsData[selectedHub].address}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`tel:${hubsData[selectedHub].phone}`}
                    className="flex-1 bg-black hover:bg-gray-800 text-white text-[9px] font-bold uppercase tracking-wider text-center py-2 rounded-lg transition"
                  >
                    📞 Call Dispatcher
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER & CTA SECTION --- */}
      <section className="px-6 md:px-10 pb-10 max-w-7xl mx-auto w-full border-t border-gray-200 pt-16">
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-200/50 pt-10">
          <div className="flex gap-8 text-sm text-gray-500 font-medium mb-8 md:mb-0 flex-wrap">
            <Link href="/about" className="hover:text-black">About Us</Link>
            <Link href="/cars" className="hover:text-black">Cars</Link>
            <Link href="/#features-section" className="hover:text-black">Features</Link>
            <Link href="/contact" className="hover:text-black">Contact Us</Link>
          </div>

          <div className="w-full md:w-auto">
            <p className="text-sm font-bold mb-3">Subscribe to News</p>
            {subscribeStatus === "success" ? (
              <span className="text-emerald-500 text-xs font-semibold block animate-pulse">
                ✓ Thank you for subscribing!
              </span>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-gray-300 pb-2">
                <input suppressHydrationWarning
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your e-mail"
                  className="bg-transparent outline-none flex-grow text-sm text-black"
                  required
                  disabled={subscribeStatus === "loading"}
                />
                <button suppressHydrationWarning type="submit" aria-label="Subscribe" disabled={subscribeStatus === "loading"}>
                  <ChevronRight size={18} className={`text-gray-400 hover:text-black transition ${subscribeStatus === "loading" ? "animate-ping" : ""}`} />
                </button>
              </form>
            )}
          </div>
        </footer>
      </section>

    </div>
  );
}

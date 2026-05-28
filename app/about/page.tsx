"use client";

import { motion, Variants } from "framer-motion";
import { Download, ChevronRight, Clock, Headset, Shield, ShieldCheck, Heart, Award, Users, Star, ArrowRight } from "lucide-react";
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1.0] as const 
    } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.05
    },
  },
};

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success">("idle");

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
          <Link href="/about" className="text-black font-bold text-xs cursor-pointer border-b-2 border-black pb-0.5">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">
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
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-black py-2 border-b border-gray-100 font-bold">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black py-2 border-b border-gray-100">
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
      <section className="px-6 md:px-10 pt-12 pb-20 max-w-7xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 bg-[#0071e3]/10 text-[#0071e3] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Award size={12} /> Curating the Exceptional
          </motion.div>
          
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight"
          >
            Redefining High-End <br />
            <span className="bg-gradient-to-r from-[#0071e3] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Vehicle Logistics
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto"
          >
            We orchestrate flawless driving solutions for discerning business leaders, wedding planners, and travel enthusiasts across Maharashtra and Goa.
          </motion.p>
        </motion.div>

        {/* --- DYNAMIC STATS GRID --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto text-center"
        >
          {[
            { value: "50+", label: "Premium Fleet" },
            { value: "5,000+", label: "Completed Journeys" },
            { value: "24/7", label: "Concierge Helpline" },
            { value: "4.9 ★", label: "Client Rating" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 select-none group">
              <span className="block text-3xl md:text-4xl font-extrabold text-black group-hover:text-[#0071e3] transition duration-300 font-mono">
                {stat.value}
              </span>
              <span className="block text-[11px] md:text-xs text-gray-400 uppercase tracking-widest font-semibold mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- OUR STORY & MISSION SECTION --- */}
      <section className="bg-white border-y border-gray-200/50 py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0071e3] font-mono block">OUR VISION</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight leading-tight">
              Flawless service, immaculate quality, zero compromise.
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Founded on the concept that renting a premium vehicle should be as smooth and elevated as ordering a luxury watch, Unique provides an end-to-end concierge experience. We eliminate structural rental pain points—such as hidden charges, poorly maintained vehicles, and confusing policies—to bring you absolute transparency.
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Every single SUV, convertible, and electric cruiser is physically audited, cleaned, and meticulously detailed before each handover. We combine high-performance active safety assists, luxury seating packages, and full-time technical support to secure your absolute peace of mind.
            </p>
            
            <div className="pt-2">
              <Link
                href="/#fleet-section"
                className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition shadow-md shadow-blue-500/10 cursor-pointer"
              >
                Browse Our Fleet <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: ShieldCheck,
                title: "Vetted Authenticity",
                desc: "We own and operate our premium fleet. No unverified third-party hosts or broker listings."
              },
              {
                icon: Clock,
                title: "Doorstep Delivery",
                desc: "Get your vehicle brought directly to your home, office, hotel, or airport terminal 24/7."
              },
              {
                icon: Headset,
                title: "Full-Time Concierge",
                desc: "Direct support helpline to coordinate breakdown recovery, fuel fill-ups, and roadside checks."
              },
              {
                icon: Shield,
                title: "Absolute Secrecy",
                desc: "Your routes, addresses, and billing records are kept highly secure, perfect for VIP personnel."
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-[#f5f5f7] border border-gray-200/40 p-6 rounded-3xl space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#0071e3] shadow-xs">
                  <pillar.icon size={20} />
                </div>
                <h3 className="font-bold text-sm text-black">{pillar.title}</h3>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CUSTOMERS TRUST CAROUSEL CAP --- */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0071e3] font-mono block">TESTIMONIALS</span>
          <h2 className="text-3xl font-bold text-black tracking-tight">The Verdict of the Discerning</h2>
          <p className="text-gray-500 text-xs font-semibold">What our frequent VIP flyers, corporate leaders, and wedding parties say.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              quote: "The Toyota Fortuner was brought straight to the airport VIP arrival terminal within 5 minutes. Spotless interiors, high-end mechanical conditions, and absolute professional handling. Simply flawless.",
              author: "Aditya Deshmukh",
              role: "Corporate Managing Director, Pune"
            },
            {
              quote: "We rented the Mahindra Thar Convertible for our destination wedding in Goa. Not only was the vehicle a head-turner, but the booking team coordinated everything seamlessly. 10/10 service structure.",
              author: "Sneha & Rohan",
              role: "Wedding Clients, Mumbai"
            },
            {
              quote: "I frequently hire corporate transport for international executives visiting our IT hub. Unique represents the absolute pinnacle of premium, silent logistics in Pune. Impeccable vehicles.",
              author: "Vikram Malhotra",
              role: "VP Human Resources, Infosys"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200/50 p-8 rounded-[32px] space-y-6 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition duration-300 select-none">
              <div className="space-y-4">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-500 text-xs italic leading-relaxed font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-[#0071e3]">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-black">{item.author}</h4>
                  <span className="block text-[10px] text-gray-400 font-medium">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
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

"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Download, ChevronRight, Clock, Headset, Shield, ShieldCheck, 
  Search, X, Check, ArrowRight, Star, Calendar 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { fleetCarsData, Car } from "../page";

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
      staggerChildren: 0.1,
      delayChildren: 0.05
    },
  },
};

export default function CarsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success">("idle");

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceMode, setServiceMode] = useState<"self-drive" | "taxi">("self-drive");
  const [activeCategory, setActiveCategory] = useState("All");

  // Booking states
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "policies">("overview");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [handoverType, setHandoverType] = useState<"hub" | "delivery">("hub");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Payment mock states
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"gateway" | "processing" | "success">("gateway");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [refCode, setRefCode] = useState("");

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

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !emailAddress || !pickupDate || !returnDate) return;
    setIsPaying(true);
    setPaymentStep("gateway");
  };

  const handleSimulatePayment = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      const randomId = "pay_mock_" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const generatedRefCode = "UR-" + Math.floor(100000 + Math.random() * 900000);
      setPaymentId(randomId);
      setRefCode(generatedRefCode);
      setPaymentStep("success");
      setTimeout(() => {
        setIsPaying(false);
        setShowSuccess(true);
      }, 1500);
    }, 2000);
  };

  const resetBookingForm = () => {
    setSelectedCar(null);
    setShowSuccess(false);
    setPickupDate("");
    setReturnDate("");
    setFullName("");
    setEmailAddress("");
    setActiveModalTab("overview");
    setActiveImageIndex(0);
    setIsPaying(false);
    setPaymentStep("gateway");
    setSelectedPaymentMethod("upi");
    setUpiId("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setPaymentId("");
    setRefCode("");
    setPickupAddress("");
    setDestinationAddress("");
    setHandoverType("hub");
    setDeliveryAddress("");
  };

  // Filter cars based on service mode, search query, and category
  const filteredCars = fleetCarsData.filter(car => {
    // 1. Service Mode filter
    const matchesService = serviceMode === "self-drive"
      ? car.serviceType?.includes("Self Drive Cars") || car.serviceType?.includes("Luxury Self Drive Cars")
      : car.serviceType?.some(type => type !== "Self Drive Cars" && type !== "Luxury Self Drive Cars");

    if (!matchesService) return false;

    // 2. Category filter
    const matchesCategory = activeCategory === "All" || car.category.toLowerCase() === activeCategory.toLowerCase();
    if (!matchesCategory) return false;

    // 3. Search query
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return car.name.toLowerCase().includes(query) || car.category.toLowerCase().includes(query);
  });

  const categories = ["All", "SUV", "Convertible", "Electric", "Hatchback"];

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
          <Link href="/cars" className="text-black font-bold text-xs cursor-pointer border-b-2 border-black pb-0.5">
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
            <Link href="/cars" onClick={() => setIsMobileMenuOpen(false)} className="text-black py-2 border-b border-gray-100 font-bold">
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
      <section className="px-6 md:px-10 pt-8 pb-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight"
          >
            Explore the <span className="bg-gradient-to-r from-[#0071e3] to-blue-600 bg-clip-text text-transparent">Unique Fleet</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-sm md:text-base leading-relaxed font-semibold max-w-xl mx-auto"
          >
            Audited, fully-configured premium vehicles. Choose between self-driving liberty or bespoke chauffeured travel.
          </motion.p>
        </motion.div>
      </section>

      {/* --- FILTER & SEARCH CONTROL CONSOLE --- */}
      <section className="px-6 md:px-10 pb-6 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-[#d2d2d7]/50 rounded-[28px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            {/* Service Toggle */}
            <div className="bg-[#f5f5f7] p-1 rounded-2xl border border-gray-200/50 flex w-full md:w-auto relative select-none">
              <button suppressHydrationWarning
                onClick={() => {
                  setServiceMode("self-drive");
                  setActiveCategory("All");
                }}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition duration-300 relative z-10 cursor-pointer ${
                  serviceMode === "self-drive" ? "text-white bg-black shadow-sm" : "text-gray-500 hover:text-black"
                }`}
              >
                🚗 Self-Drive
              </button>
              <button suppressHydrationWarning
                onClick={() => {
                  setServiceMode("taxi");
                  setActiveCategory("All");
                }}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition duration-300 relative z-10 cursor-pointer ${
                  serviceMode === "taxi" ? "text-white bg-black shadow-sm" : "text-gray-500 hover:text-black"
                }`}
              >
                💼 Chauffeured Taxi
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input suppressHydrationWarning
                type="text"
                placeholder="Search by brand or name... (e.g. Thar, Toyota)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-transparent hover:border-gray-200 focus:border-black rounded-2xl pl-12 pr-4 py-3 text-xs text-black font-semibold focus:outline-none transition duration-300"
              />
              {searchQuery && (
                <button suppressHydrationWarning
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black w-4.5 h-4.5 rounded-full flex items-center justify-center bg-gray-200/60 transition"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2.5 pt-2 border-t border-gray-100">
            {categories.map((cat) => (
              <button suppressHydrationWarning
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black shadow-xs"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* --- CAR GRID --- */}
      <section className="px-6 md:px-10 pb-20 max-w-7xl mx-auto w-full flex-grow">
        
        {filteredCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white border border-[#d2d2d7]/50 rounded-[32px] shadow-sm max-w-xl mx-auto"
          >
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="font-bold text-lg text-black">No vehicles found</h3>
            <p className="text-gray-500 text-xs mt-2 max-w-sm mx-auto font-medium">
              We couldn't find matches for "{searchQuery}" under {activeCategory} category in {serviceMode === "self-drive" ? "Self-Drive" : "Taxi"} mode.
            </p>
            <button suppressHydrationWarning
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full transition cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map((car) => (
              <motion.div
                key={car.name}
                variants={fadeUp}
                onClick={() => {
                  setSelectedCar(car);
                }}
                className="bg-white rounded-[32px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-200/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover transform group-hover:scale-104 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white font-bold tracking-wider text-[9px] uppercase px-2.5 py-1 rounded-full">
                      {car.category}
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-black text-base group-hover:text-[#0071e3] transition">{car.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">{car.specs.transmission}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ⚡ {car.specs.mileage}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold text-black">
                        ₹{(serviceMode === "taxi" ? car.price + 1500 : car.price).toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-gray-400 block font-semibold mt-0.5">
                        / day {serviceMode === "taxi" && "(with Driver)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button suppressHydrationWarning
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCar(car);
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-2xl text-[11px] font-bold tracking-wider uppercase transition cursor-pointer flex items-center justify-center shadow-xs"
                  >
                    Reserve Car
                  </button>
                  <button suppressHydrationWarning
                    onClick={(e) => {
                      e.stopPropagation();
                      const phone = "919876543210";
                      const text = encodeURIComponent(`Hi Unique Rentals! I would love to check availability for the ${car.name} (${car.category}) at ₹${(serviceMode === "taxi" ? car.price + 1500 : car.price).toLocaleString("en-IN")}/day under ${serviceMode === "self-drive" ? "Self-Drive" : "Chauffeured"} mode.`);
                      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                    }}
                    className="w-full text-center text-xs font-bold text-gray-500 hover:text-black transition cursor-pointer flex items-center justify-center gap-1 py-1"
                  >
                    Inquire via WhatsApp <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </section>

      {/* --- DIRECT BOOKING MODAL --- */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetBookingForm}
              className="absolute inset-0 bg-[#1d1d1f]/45 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="bg-[#ffffff] border border-[#d2d2d7]/50 rounded-[32px] shadow-[0_12px_50px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-4xl relative z-10 max-h-[90vh] flex flex-col font-sans"
            >
              
              {/* Close Button */}
              <button suppressHydrationWarning
                onClick={resetBookingForm}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500 hover:text-black z-20 cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  !isPaying ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="overflow-y-auto p-8 md:p-10 flex flex-col"
                    >
                      {/* Header */}
                      <div className="mb-6 select-none text-left border-b border-[#d2d2d7]/20 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Direct Reservation & Specifications</span>
                        <h3 className="text-2xl font-bold tracking-tight text-black mt-1">Bespoke Vehicle Configuration</h3>
                        <p className="text-xs text-gray-500 mt-1">Review specifications and complete your reservation instantly.</p>
                      </div>

                      {/* Content Columns */}
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        
                        {/* Left: Premium Car Details Block */}
                        <div className="space-y-5 text-left border-r border-[#d2d2d7]/20 pr-0 md:pr-8 flex flex-col justify-between self-stretch">
                          <div className="space-y-4">
                            <div className="w-full relative shrink-0">
                              <div className="w-full h-40 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center relative group">
                                <img
                                  src={selectedCar.images[activeImageIndex]}
                                  alt={selectedCar.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                />
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white font-bold tracking-wider text-[9px] uppercase px-2.5 py-1 rounded-full">
                                  {selectedCar.category}
                                </div>
                              </div>
                              
                              {/* Premium Thumbnails Gallery Selector */}
                              <div className="flex gap-2 mt-2 shrink-0 overflow-x-auto py-1 scrollbar-none justify-start">
                                {selectedCar.images.map((img, idx) => (
                                  <button suppressHydrationWarning
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-14 h-10 rounded-lg overflow-hidden border transition transform active:scale-95 shrink-0 cursor-pointer ${
                                      activeImageIndex === idx
                                        ? "ring-2 ring-[#0071e3] ring-offset-2 ring-offset-white border-transparent scale-102"
                                        : "border-gray-200 hover:border-gray-400"
                                    }`}
                                  >
                                    <img
                                      src={img}
                                      alt={`${selectedCar.name} angle ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-xl tracking-tight text-black">{selectedCar.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-base text-[#0071e3]">
                                  ₹{(serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price).toLocaleString("en-IN")}
                                </span>
                                <span className="text-[11px] text-gray-500 font-semibold">/ day ({serviceMode === "taxi" ? "with Driver" : "Self-Drive"})</span>
                              </div>
                            </div>

                            {/* Tab Switcher */}
                            <div className="flex bg-[#f5f5f7] p-1 rounded-xl border border-gray-200/50 text-[11px] font-semibold text-gray-500 shrink-0">
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setActiveModalTab("overview")}
                                className={`flex-1 py-1.5 rounded-lg transition duration-200 ${
                                  activeModalTab === "overview"
                                    ? "bg-white text-black shadow-sm"
                                    : "hover:text-black cursor-pointer"
                                }`}
                              >
                                Overview & Specs
                              </button>
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setActiveModalTab("policies")}
                                className={`flex-1 py-1.5 rounded-lg transition duration-200 ${
                                  activeModalTab === "policies"
                                    ? "bg-white text-black shadow-sm"
                                    : "hover:text-black cursor-pointer"
                                }`}
                              >
                                Policies & Terms
                              </button>
                            </div>

                            {/* Tab Content 1: Overview & Specs */}
                            {activeModalTab === "overview" && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                              >
                                <div className="space-y-1">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Car Overview</h5>
                                  <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
                                    {selectedCar.overview}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Technical Specifications</h5>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40">
                                      <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Engine</span>
                                      <span className="font-semibold text-black text-[11px]">{selectedCar.specs?.engine}</span>
                                    </div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40">
                                      <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Transmission</span>
                                      <span className="font-semibold text-black text-[11px]">{selectedCar.specs?.transmission}</span>
                                    </div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40">
                                      <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Power Output</span>
                                      <span className="font-semibold text-black text-[11px]">{selectedCar.specs?.power}</span>
                                    </div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40">
                                      <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Drive System</span>
                                      <span className="font-semibold text-black text-[11px]">{selectedCar.specs?.drive}</span>
                                    </div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40">
                                      <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Fuel Source</span>
                                      <span className="font-semibold text-black text-[11px]">{selectedCar.specs?.fuel}</span>
                                    </div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40">
                                      <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Certified Mileage</span>
                                      <span className="font-semibold text-emerald-600 text-[11px]">⚡ {selectedCar.specs?.mileage}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Premium Amenities</h5>
                                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                    {selectedCar.features?.map((feat, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
                                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                                          <Check size={9} strokeWidth={3} />
                                        </div>
                                        <span className="truncate">{feat}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Tab Content 2: Policies, Damage & T&Cs */}
                            {activeModalTab === "policies" && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                              >
                                <div className={`${serviceMode === "taxi" ? "bg-blue-50/50 border-blue-100" : "bg-emerald-50/50 border-emerald-100"} border rounded-xl p-3 flex items-start gap-2.5`}>
                                  <div className={`w-5 h-5 rounded-full ${serviceMode === "taxi" ? "bg-[#0071e3]" : "bg-emerald-500"} text-white flex items-center justify-center font-bold text-[9px] shrink-0`}>
                                    ₹
                                  </div>
                                  <div className="text-[11px]">
                                    <span className={`font-bold ${serviceMode === "taxi" ? "text-blue-800" : "text-emerald-800"} block uppercase tracking-wider text-[9px]`}>
                                      {serviceMode === "taxi" ? "Zero Security Deposit Required" : "Refundable Security Deposit"}
                                    </span>
                                    <span className={`${serviceMode === "taxi" ? "text-blue-700" : "text-emerald-700"} leading-normal font-semibold`}>
                                      {serviceMode === "taxi" 
                                        ? "Since a professional driver operates the vehicle, absolutely zero security deposit or pre-authorization is required at pickup." 
                                        : "We pre-authorize a standard refundable security deposit upon vehicle delivery, released instantly following post-rental check verification."}
                                    </span>
                                  </div>
                                </div>

                                {serviceMode !== "taxi" && (
                                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-start gap-2.5">
                                    <span className="text-amber-500 shrink-0 text-sm font-bold leading-none">⚠️</span>
                                    <div className="text-[11px]">
                                      <span className="font-bold text-amber-800 block uppercase tracking-wider text-[9px]">Damage & Pre-Rental Inspection</span>
                                      <p className="text-amber-700 leading-relaxed font-semibold mt-0.5">
                                        {selectedCar.damagePolicy}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-1.5">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    {serviceMode === "taxi" ? "Highlighted Service Conditions" : "Highlighted Rental Conditions"}
                                  </h5>
                                  <div className="space-y-1 text-[11px] font-semibold text-gray-600">
                                    {serviceMode === "taxi" ? (
                                      <>
                                        <div className="flex items-start gap-1.5">
                                          <span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span>
                                          <span className="leading-normal">Professional Driver included in pricing</span>
                                        </div>
                                        <div className="flex items-start gap-1.5">
                                          <span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span>
                                          <span className="leading-normal">Standard working hours: 12 Hours / 250 km limit per day (extra hours billed at ₹150/hr)</span>
                                        </div>
                                        <div className="flex items-start gap-1.5">
                                          <span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span>
                                          <span className="leading-normal">All toll taxes, state permits, and fuel allowances are included in the daily premium rate</span>
                                        </div>
                                      </>
                                    ) : (
                                      selectedCar.terms?.map((term, idx) => (
                                        <div key={idx} className="flex items-start gap-1.5">
                                          <span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span>
                                          <span className="leading-normal">{term}</span>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div className="border-t border-[#d2d2d7]/20 pt-4 flex items-center justify-between text-[11px] font-semibold text-gray-400 shrink-0">
                            <span>Need customizable plans?</span>
                            <button suppressHydrationWarning
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const phone = "919876543210";
                                const text = encodeURIComponent(`Hi Support! I am looking at reserving the ${selectedCar.name} at ₹${selectedCar.price.toLocaleString("en-IN")}/day. Can you help me?`);
                                window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                              }}
                              className="text-[#0071e3] hover:underline font-bold uppercase tracking-wider text-[9px]"
                            >
                              WhatsApp Us
                            </button>
                          </div>
                        </div>

                        {/* Right: Checkout Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                          <div className="select-none text-left flex justify-between items-center flex-wrap gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Reservation Details</span>
                            
                            {/* Service toggle inside Modal */}
                            <div className="bg-[#f5f5f7] p-0.5 rounded-xl flex text-[9px] font-bold border border-gray-200">
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setServiceMode("self-drive")}
                                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                                  serviceMode === "self-drive" ? "bg-black text-white shadow-xs" : "text-gray-400 hover:text-black"
                                }`}
                              >
                                Self-Drive
                              </button>
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setServiceMode("taxi")}
                                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                                  serviceMode === "taxi" ? "bg-black text-white shadow-xs" : "text-gray-400 hover:text-black"
                                }`}
                              >
                                Taxi/Driver
                              </button>
                            </div>
                          </div>
                          
                          {/* Dates */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Pick-up</label>
                              <input suppressHydrationWarning
                                type="date"
                                required
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Return</label>
                              <input suppressHydrationWarning
                                type="date"
                                required
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
                              />
                            </div>
                          </div>

                          {/* Handover Options (Self-Drive) */}
                          {serviceMode === "self-drive" && (
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Handover Method</label>
                                <div className="grid grid-cols-2 gap-2 bg-[#f5f5f7] border border-[#d2d2d7]/40 p-1 rounded-xl">
                                  <button suppressHydrationWarning
                                    type="button"
                                    onClick={() => setHandoverType("hub")}
                                    className={`py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                      handoverType === "hub"
                                        ? "bg-black text-white shadow-xs"
                                        : "text-gray-400 hover:text-black"
                                    }`}
                                  >
                                    🏢 Hub Self-Pickup
                                  </button>
                                  <button suppressHydrationWarning
                                    type="button"
                                    onClick={() => setHandoverType("delivery")}
                                    className={`py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                      handoverType === "delivery"
                                        ? "bg-black text-white shadow-xs"
                                        : "text-gray-400 hover:text-black"
                                    }`}
                                  >
                                    📍 Doorstep Delivery
                                  </button>
                                </div>
                              </div>

                              {handoverType === "delivery" && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="space-y-1.5"
                                >
                                  <label className="text-[10px] font-bold uppercase text-gray-400 block">Delivery Address in Pune</label>
                                  <input suppressHydrationWarning
                                    type="text"
                                    placeholder="e.g. Westin Hotel VIP Valet, Koregaon Park"
                                    required
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black placeholder-gray-350"
                                  />
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* Address (Taxi) */}
                          {serviceMode === "taxi" && (
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Pickup Address</label>
                                <input suppressHydrationWarning
                                  type="text"
                                  placeholder="e.g. Pune International Airport Terminal 1"
                                  required
                                  value={pickupAddress}
                                  onChange={(e) => setPickupAddress(e.target.value)}
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#0071e3] placeholder-gray-350"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Destination Address / City</label>
                                <input suppressHydrationWarning
                                  type="text"
                                  placeholder="e.g. Baga Beach, North Goa"
                                  required
                                  value={destinationAddress}
                                  onChange={(e) => setDestinationAddress(e.target.value)}
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#0071e3] placeholder-gray-350"
                                />
                              </div>
                            </div>
                          )}

                          {/* Customer Details */}
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Full Name</label>
                            <input suppressHydrationWarning
                              type="text"
                              placeholder="John Doe"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black placeholder-gray-350"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Email Address</label>
                            <input suppressHydrationWarning
                              type="email"
                              placeholder="john@example.com"
                              required
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black placeholder-gray-350"
                            />
                          </div>

                          {/* Pricing breakdown */}
                          {calculateDays() > 0 && selectedCar && (
                            <div className="bg-gray-50 border border-gray-200/60 p-3 rounded-xl space-y-1 font-mono text-[11px] text-gray-500">
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="text-black font-semibold">{calculateDays()} days</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Daily rate:</span>
                                <span>
                                  ₹{(serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price).toLocaleString("en-IN")} × {calculateDays()}
                                </span>
                              </div>
                              {serviceMode === "taxi" && (
                                <div className="flex justify-between text-[10px] text-gray-450">
                                  <span>(Base Rate: ₹{selectedCar.price.toLocaleString("en-IN")} + Driver: ₹1,500)</span>
                                </div>
                              )}
                              <div className="flex justify-between border-t border-gray-200/60 pt-1.5 font-bold text-gray-700">
                                <span>ESTIMATED TOTAL:</span>
                                <span>
                                  ₹{((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays()).toLocaleString("en-IN")}
                                </span>
                              </div>
                              <div className="flex justify-between pt-1 border-t border-dashed border-gray-200 text-[#0071e3]">
                                <span>30% BOOKING CHARGE (PAY NOW):</span>
                                <span className="font-bold">
                                  ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}
                                </span>
                              </div>
                              <div className="flex justify-between pt-0.5 text-gray-450">
                                <span>70% DUE AT HANDOVER:</span>
                                <span className="font-semibold text-black">
                                  ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.7).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          )}

                          <button suppressHydrationWarning
                            type="submit"
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-xs tracking-wider uppercase transition cursor-pointer flex justify-center shadow-xs"
                          >
                            🔒 Proceed to Pay 30% Online
                          </button>
                        </form>

                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="razorpay"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 md:p-10 flex flex-col items-center justify-center font-sans select-none min-h-[480px]"
                    >
                      <div className="w-full max-w-md bg-white border border-[#d2d2d7]/50 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col font-sans">
                        
                        {/* Razorpay Brand Header */}
                        <div className="bg-[#0b1f3c] text-white px-6 py-5 flex items-center justify-between text-left">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">⚡ RAZORPAY SECURED</span>
                            <span className="font-bold text-sm text-white mt-0.5">Unique Premium Rentals</span>
                            <span className="text-[10px] text-gray-300 font-mono mt-0.5">{emailAddress}</span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="text-[8px] text-gray-400 font-bold uppercase text-right leading-none block mb-0.5">PAYING 30% DEPOSIT</span>
                            <span className="text-base font-bold text-[#3399ff]">
                              ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        {/* Payment Options */}
                        {paymentStep === "gateway" && (
                          <div className="p-6 flex flex-col text-left space-y-4">
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Select Payment Option</span>
                            </div>

                            {/* Method Selector Tabs */}
                            <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-3">
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setSelectedPaymentMethod("upi")}
                                className={`py-2 rounded-xl font-bold text-[9px] uppercase transition ${
                                  selectedPaymentMethod === "upi"
                                    ? "bg-[#2b6bf3]/10 text-[#2b6bf3] border border-[#2b6bf3]"
                                    : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black cursor-pointer"
                                }`}
                              >
                                📱 UPI / QR
                              </button>
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setSelectedPaymentMethod("card")}
                                className={`py-2 rounded-xl font-bold text-[9px] uppercase transition ${
                                  selectedPaymentMethod === "card"
                                    ? "bg-[#2b6bf3]/10 text-[#2b6bf3] border border-[#2b6bf3]"
                                    : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black cursor-pointer"
                                }`}
                              >
                                💳 CARD
                              </button>
                              <button suppressHydrationWarning
                                type="button"
                                onClick={() => setSelectedPaymentMethod("netbanking")}
                                className={`py-2 rounded-xl font-bold text-[9px] uppercase transition ${
                                  selectedPaymentMethod === "netbanking"
                                    ? "bg-[#2b6bf3]/10 text-[#2b6bf3] border border-[#2b6bf3]"
                                    : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black cursor-pointer"
                                }`}
                              >
                                🏦 NETBANK
                              </button>
                            </div>

                            <AnimatePresence mode="wait">
                              {/* UPI */}
                              {selectedPaymentMethod === "upi" && (
                                <motion.div
                                  key="upi"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="space-y-3"
                                >
                                  <div>
                                    <label className="text-[9px] font-bold text-gray-400 uppercase">Enter Virtual Payment Address (VPA)</label>
                                    <input suppressHydrationWarning
                                      type="text"
                                      placeholder="e.g. name@okhdfcbank"
                                      value={upiId}
                                      onChange={(e) => setUpiId(e.target.value)}
                                      className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2b6bf3] text-black font-semibold placeholder-gray-300"
                                    />
                                  </div>
                                </motion.div>
                              )}

                              {/* Card */}
                              {selectedPaymentMethod === "card" && (
                                <motion.div
                                  key="card"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="space-y-3"
                                >
                                  <div>
                                    <label className="text-[9px] font-bold text-gray-400 uppercase">Card Number</label>
                                    <input suppressHydrationWarning
                                      type="text"
                                      placeholder="4111 2222 3333 4444"
                                      value={cardNumber}
                                      onChange={(e) => setCardNumber(e.target.value)}
                                      className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2b6bf3] text-black font-semibold placeholder-gray-300"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="text-[9px] font-bold text-gray-400 uppercase">Expiry Date</label>
                                      <input suppressHydrationWarning
                                        type="text"
                                        placeholder="MM / YY"
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(e.target.value)}
                                        className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2b6bf3] text-black font-semibold placeholder-gray-300"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[9px] font-bold text-gray-400 uppercase">CVV Code</label>
                                      <input suppressHydrationWarning
                                        type="password"
                                        placeholder="•••"
                                        maxLength={3}
                                        value={cardCvv}
                                        onChange={(e) => setCardCvv(e.target.value)}
                                        className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2b6bf3] text-black font-semibold placeholder-gray-300"
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Netbanking */}
                              {selectedPaymentMethod === "netbanking" && (
                                <motion.div
                                  key="netbanking"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="space-y-3"
                                >
                                  <div>
                                    <label className="text-[9px] font-bold text-gray-400 uppercase">Select Bank</label>
                                    <select suppressHydrationWarning className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2b6bf3] text-black font-semibold">
                                      <option>State Bank of India</option>
                                      <option>HDFC Bank</option>
                                      <option>ICICI Bank</option>
                                      <option>Axis Bank</option>
                                      <option>Kotak Mahindra Bank</option>
                                    </select>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <button suppressHydrationWarning
                              type="button"
                              onClick={handleSimulatePayment}
                              className="w-full bg-[#2b6bf3] hover:bg-[#1a56d6] text-white font-semibold py-3 rounded-xl text-xs tracking-wider uppercase transition shadow-md shadow-blue-500/10 mt-2"
                            >
                              🔒 Securely Pay ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}
                            </button>
                            
                            <button suppressHydrationWarning
                              type="button"
                              onClick={() => setIsPaying(false)}
                              className="w-full text-center text-center text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-wider py-1"
                            >
                              ← Go Back to Form
                            </button>
                          </div>
                        )}

                        {paymentStep === "processing" && (
                          <div className="p-12 flex flex-col items-center justify-center space-y-6 min-h-[300px]">
                            <div className="w-12 h-12 rounded-full border-3 border-gray-200 border-t-[#2b6bf3] animate-spin" />
                            <div className="text-center">
                              <h4 className="font-bold text-black text-sm">Authenticating with your Bank...</h4>
                              <p className="text-gray-400 text-[10px] mt-1">Please do not refresh this window or click the back button.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 md:p-10 flex flex-col items-center justify-center min-h-[480px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200 shadow-sm">
                      <Check size={28} strokeWidth={3} />
                    </div>

                    <div className="text-center mb-8">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono">RESERVATION SECURED</span>
                      <h3 className="text-2xl font-bold text-black mt-1">Booking Confirmed!</h3>
                      <p className="text-gray-500 text-xs mt-2 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-bold text-black">{fullName}</span>. Your premium rental booking for the <span className="font-bold text-black">{selectedCar.name}</span> is successfully processed.
                      </p>
                    </div>
                    
                    {/* Invoice Receipt */}
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 max-w-sm w-full space-y-2 text-xs font-sans text-left">
                      <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-1.5">Payment Summary</h4>
                      
                      <div className="flex justify-between text-gray-400 text-[10px]">
                        <span>Transaction ID:</span>
                        <span className="font-mono text-black font-semibold">{paymentId}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-[10px]">
                        <span>Reference Code:</span>
                        <span className="font-mono text-[#0071e3] font-bold">{refCode}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-[10px] border-b border-gray-150 pb-2">
                        <span>Vehicle Selection:</span>
                        <span className="font-semibold text-black">{selectedCar.name}</span>
                      </div>

                      {serviceMode === "self-drive" && (
                        <div className="flex justify-between text-gray-400 text-[10px]">
                          <span>Handover:</span>
                          <span className="font-semibold text-black uppercase text-[10px]">
                            {handoverType === "delivery" ? `Delivery` : "Hub Pickup"}
                          </span>
                        </div>
                      )}
                      {serviceMode === "self-drive" && handoverType === "delivery" && (
                        <div className="flex justify-between text-gray-400 text-[9px] leading-relaxed">
                          <span>Address:</span>
                          <span className="font-medium text-black max-w-[200px] text-right truncate" title={deliveryAddress}>
                            {deliveryAddress}
                          </span>
                        </div>
                      )}

                      {serviceMode === "taxi" && (
                        <>
                          <div className="flex justify-between text-gray-400 text-[9px] leading-relaxed">
                            <span>Pickup:</span>
                            <span className="font-medium text-black max-w-[200px] text-right truncate" title={pickupAddress}>{pickupAddress}</span>
                          </div>
                          <div className="flex justify-between text-gray-400 text-[9px] leading-relaxed">
                            <span>Destination:</span>
                            <span className="font-medium text-black max-w-[200px] text-right truncate" title={destinationAddress}>{destinationAddress}</span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between text-gray-400 text-[10px] border-t border-gray-150 pt-2">
                        <span>Prepayment Paid (30%):</span>
                        <span className="font-bold text-emerald-600">
                          ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-[10px]">
                        <span>Pay at Handover (70%):</span>
                        <span className="font-bold text-black">
                          ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.7).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <button suppressHydrationWarning
                      onClick={resetBookingForm}
                      className="mt-8 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full transition cursor-pointer shadow-xs"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-b border-gray-300 pb-2">
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

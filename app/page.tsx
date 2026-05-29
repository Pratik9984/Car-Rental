"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { Download, ChevronRight, ChevronLeft, Clock, Headset, Shield, ShieldCheck, X, Check, Sparkles, MapPin, Briefcase, ArrowRight, Star, Quote } from "lucide-react";
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

// --- APPLE.COM ANIMATION VARIANTS (Type-Safe Fixes) ---

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0] as const
    }
  },
};

// --- DATA ---

export const carBrands = ["Mahindra", "Tata", "Toyota", "Hyundai", "Kia", "Suzuki"];

export const fleetCategories = [
  "All",
  "Self Drive Cars",
  "Airport Transfer Cars",
  "Luxury Self Drive Cars",
  "Corporate Car",
  "Luxury Wedding Cars",
  "Tempo Traveller Cars",
  "Taxi Rentals"
];

export const fleetCarsData = [
  {
    name: "Toyota Fortuner (4x4)",
    category: "SUV",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      engine: "2.8L Turbo Diesel",
      transmission: "6-Speed Automatic",
      power: "201 bhp",
      seats: "7 Seater",
      drive: "4x4 Active Traction",
      fuel: "Diesel",
      mileage: "14.2 km/l"
    },
    features: ["Active Traction Control", "Downhill Assist Control", "Premium Leather Seats", "Ventilated Front Seats", "18-inch Super Chrome Alloys"],
    overview: "The Toyota Fortuner is the undisputed king of premium SUVs in India. Renowned for its bulletproof reliability, imposing road presence, and legendary off-road capabilities, this active 4x4 variant is powered by a high-torque 2.8L diesel engine. Ideal for highway cruising to Mahabaleshwar or conquering remote paths in the Western Ghats with your entire family.",
    damagePolicy: "A fully refundable security deposit of ₹10,000 is authorized upon handover. We conduct a detailed pre-rental video inspection with you. Minor stone chips are excused, but major scratches, underbody scrape, or alloy wheel damage are subject to physical repair cost deduction from the security deposit based on official Toyota service estimates.",
    terms: [
      "Minimum Driver Age: 23 Years with valid LMV License (min. 2 years old)",
      "Fuel Policy: Full-to-Full (returned with a full tank of premium diesel)",
      "Speed Limit: Locked at 120 km/h (over-speeding triggers warning bells and ₹500 fine/offense)",
      "Geofencing: Active tracking; travel is restricted within MH & GA state limits unless pre-approved"
    ],
    serviceType: ["Self Drive Cars", "Luxury Self Drive Cars", "Airport Transfer Cars", "Corporate Car", "Luxury Wedding Cars"]
  },
  {
    name: "Mahindra Thar (Convertible)",
    category: "Convertible",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      engine: "2.0L mStallion Turbo",
      transmission: "6-Speed Manual",
      power: "150 bhp",
      seats: "4 Seater",
      drive: "4x4 Low Range",
      fuel: "Petrol",
      mileage: "12.4 km/l"
    },
    features: ["Convertible Soft Top", "Mechanical Locking Differential", "Washable Interiors with Drain Plugs", "Touchscreen Infotainment", "All-Terrain Tyres"],
    overview: "Experience open-air motoring at its finest with the Mahindra Thar Convertible. This iconic 4x4 adventure vehicle combines rugged retro styling with modern turbo-petrol performance. The mStallion engine provides instantaneous torque, making it incredibly fun to drive whether you are exploring Pune's outskirts or cruising along Goa's coastal roads.",
    damagePolicy: "A fully refundable security deposit of ₹5,000 is authorized upon handover. Pre-rental video is mandatory. As a convertible, any damage or cuts to the soft-top fabric, rain-leakage issues caused by improper top locking, or interior water damage due to leaving the top open during rain are subject to 100% replacement cost liability.",
    terms: [
      "Minimum Driver Age: 21 Years with valid LMV License",
      "Fuel Policy: Like-to-Like (returned with same fuel level as hand-over)",
      "Speed Limit: Recommended max 100 km/h for soft-top stability (locked alert at 120 km/h)",
      "Convertible Care: Soft-top must not be operated while vehicle is in motion"
    ],
    serviceType: ["Self Drive Cars", "Luxury Self Drive Cars", "Luxury Wedding Cars"]
  },
  {
    name: "Mahindra XUV700 (AX7)",
    category: "SUV",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      engine: "2.2L mHawk Diesel",
      transmission: "6-Speed Automatic",
      power: "182 bhp",
      seats: "7 Seater",
      drive: "FWD",
      fuel: "Diesel",
      mileage: "15.6 km/l"
    },
    features: ["Dual 10.25-inch Screens", "Panoramic Skyroof", "ADAS Level 2", "3D Sound by Sony (12 Speakers)", "Smart Door Handles"],
    overview: "The XUV700 AX7 is a technological powerhouse offering world-class luxury and safety. Featuring a smooth 6-speed automatic mHawk diesel engine, dual 10.25-inch panoramic screens, and advanced ADAS safety capabilities, this 7-seater represents the pinnacle of modern Indian family cruisers.",
    damagePolicy: "Security deposit of ₹7,500 required. Equipped with high-tech driver aids (ADAS) and multiple parking cameras; any bumper damage, camera sensor misalignment due to collisions, or radar issues must be inspected at an authorized Mahindra service center, and costs will be deducted accordingly.",
    terms: [
      "Minimum Driver Age: 23 Years with valid LMV License",
      "ADAS Responsibility: Driver remains fully responsible; driver assists do not substitute manual control",
      "Fuel Policy: Full-to-Full (Diesel)",
      "Speed Limit: 120 km/h speed governor active"
    ],
    serviceType: ["Self Drive Cars", "Luxury Self Drive Cars", "Airport Transfer Cars", "Corporate Car", "Taxi Rentals"]
  },
  {
    name: "Tata Nexon EV (Max)",
    category: "Electric",
    price: 2800,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      engine: "40.5 kWh battery",
      transmission: "Single Speed Automatic",
      power: "141 bhp",
      seats: "5 Seater",
      drive: "FWD",
      fuel: "Electric (437 km range)",
      mileage: "6.8 km/kWh"
    },
    features: ["Multi-Mode Regenerative Braking", "Wireless Charger", "Electronic Parking Brake with Auto Hold", "Jewelled Control Knob", "Air Purifier"],
    overview: "Go green in absolute silent comfort with the Nexon EV Max. Blessed with a large 40.5 kWh battery offering a real-world range of ~300 km on a single charge, this SUV is perfect for eco-conscious city driving and weekend trips. Silent performance combined with instant electric acceleration.",
    damagePolicy: "Security deposit of ₹5,000 required. Special inspection is done on the high-voltage underbody battery pack. Driving over deep water logging or causing impact damage to the underbody lithium-ion battery shell is highly dangerous and carries direct liability beyond standard insurance.",
    terms: [
      "Minimum Driver Age: 21 Years with valid LMV License",
      "Charging: Returned with at least 20% battery charge (or a ₹500 deep-discharge recharge service fee applies)",
      "Charging Cable: Charging cable and adapters are provided; lost equipment is billed at actual cost (₹18,000)",
      "Speed Limit: Locked at 100 km/h in Eco Mode, max 120 km/h in Sport Mode"
    ],
    serviceType: ["Self Drive Cars", "Corporate Car", "Airport Transfer Cars"]
  },
  {
    name: "Hyundai Creta (SX)",
    category: "SUV",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      engine: "1.5L MPi Petrol",
      transmission: "6-Speed Manual",
      power: "113 bhp",
      seats: "5 Seater",
      drive: "FWD",
      fuel: "Petrol",
      mileage: "16.8 km/l"
    },
    features: ["Panoramic Sunroof", "10.25-inch Touchscreen", "Bose Premium Sound", "Electric Parking Brake", "Smart Key Push Button Start"],
    overview: "The Hyundai Creta remains India's favorite mid-size SUV. Boasting a massive panoramic sunroof, smooth driving dynamics, and a premium cabin, it strikes the perfect balance between style and everyday utility. Perfect for business trips or leisure rides around Pune.",
    damagePolicy: "Security deposit of ₹5,000. Pre-rental vehicle checklist with photo proof is uploaded before delivery. Underbody, panoramic sunroof glass, and side mirror collisions are fully recorded. Any damage to the glass panels is billed separately.",
    terms: [
      "Minimum Driver Age: 21 Years with valid LMV License",
      "Fuel Policy: Like-to-Like (Petrol)",
      "Speed Limit: Speed warnings trigger above 80 km/h; hard cap at 120 km/h",
      "No Smoking: 100% smoke-free cabin; a deep chemical cleaning fee of ₹2,500 applies if odor is detected"
    ],
    serviceType: ["Self Drive Cars", "Airport Transfer Cars", "Corporate Car", "Taxi Rentals"]
  },
  {
    name: "Maruti Suzuki Swift (ZXi)",
    category: "Hatchback",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617058998014-a1a83354e6e8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      engine: "1.2L DualJet Petrol",
      transmission: "5-Speed Manual",
      power: "89 bhp",
      seats: "5 Seater",
      drive: "FWD",
      fuel: "Petrol",
      mileage: "23.2 km/l"
    },
    features: ["SmartPlay Studio Touchscreen", "Automatic Climate Control", "LED Projector Headlamps", "Precision Cut Alloys", "Cruise Control"],
    overview: "Light, agile, and incredibly fuel-efficient, the Maruti Swift is the go-to hatchback for tight city maneuvers and effortless daily commutes. Powered by the reliable 1.2L DualJet petrol engine, it offers a sporty feel with absolute peace of mind.",
    damagePolicy: "Security deposit of ₹3,000. Simple pre-rental verification. Scratches exceeding 3 inches on bumpers or side panels will be billed at a flat rate of ₹1,500 per panel for repainting. Heavy body damage is handled through insurance claims.",
    terms: [
      "Minimum Driver Age: 21 Years with valid LMV License",
      "Fuel Policy: Like-to-Like (Petrol)",
      "Speed Limit: Cap of 110 km/h active",
      "Usage: Strictly for personal commuter usage; commercial courier or delivery usage is forbidden"
    ],
    serviceType: ["Self Drive Cars", "Taxi Rentals", "Airport Transfer Cars"]
  }
];

const features = [
  {
    icon: Clock,
    title: "24-hour doorstep delivery",
    description: "We deliver your selected premium vehicle directly to your doorstep, airport terminal, or hotel at any hour of the day or night, fully detailed and ready."
  },
  {
    icon: Headset,
    title: "24/7 technical assistance",
    description: "Drive with absolute confidence. Our round-the-clock technical helpline and active roadside assistance team are always standing by to help."
  },
  {
    icon: ShieldCheck,
    title: "Vetted premium packages",
    description: "Every single vehicle in our catalog is configured with top-tier packages, featuring active driver assists, premium leather seating, and glass sunroofs."
  },
  {
    icon: Shield,
    title: "Absolute confidentiality",
    description: "Your travel logistics, booking details, and personal profiles are guarded with strict confidentiality. Ideal for high-profile business leaders."
  },
];

export default function Home() {
  // --- DIRECT BOOKING MODAL STATE ---
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "policies">("overview");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [serviceMode, setServiceMode] = useState<"self-drive" | "taxi">("self-drive");
  const [hasSelectedMode, setHasSelectedMode] = useState(true);
  const [hoveredSplitSide, setHoveredSplitSide] = useState<"left" | "right" | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [handoverType, setHandoverType] = useState<"hub" | "delivery">("hub");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // --- MOCK RAZORPAY PAYMENT STATES ---
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"gateway" | "processing" | "success">("gateway");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [refCode, setRefCode] = useState("");

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
    if (!fullName || !email || !pickupDate || !returnDate) return;
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
    setEmail("");
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

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans overflow-x-hidden">

      {/* --- FULLSCREEN SPLIT SELECTION SPLASH GATE --- */}
      <AnimatePresence>
        {!hasSelectedMode && (
          <motion.div
            key="splash-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[20000] flex flex-col md:flex-row select-none"
          >
            {/* LEFT HALF: SELF-DRIVE */}
            <motion.div
              onMouseEnter={() => setHoveredSplitSide("left")}
              onMouseLeave={() => setHoveredSplitSide(null)}
              onClick={() => {
                setServiceMode("self-drive");
                setHasSelectedMode(true);
              }}
              animate={{
                flex: hoveredSplitSide === "left" ? 1.35 : hoveredSplitSide === "right" ? 0.65 : 1,
                filter: hoveredSplitSide === "right" ? "brightness(0.55)" : "brightness(1)",
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex-1 bg-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] opacity-100" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.08),transparent_70%)]" />
              <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white/10 rounded-full animate-pulse" />
              <div className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-blue-400/10 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10 text-center px-8 max-w-md"
              >
                <div className="text-5xl mb-6">🚗</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">Take The Wheel</h2>
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 font-medium">Command premium SUVs, convertibles & electric vehicles. Full freedom across Maharashtra & Goa with doorstep delivery.</p>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_8px_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] transition-shadow duration-500"
                >
                  <Sparkles size={14} /> Enter Self-Drive <ArrowRight size={14} />
                </motion.div>
                <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-white/30 font-medium uppercase tracking-wider">
                  <span>Refundable Deposit</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Drive Yourself</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Full-to-Full Fuel</span>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT HALF: TAXI */}
            <motion.div
              onMouseEnter={() => setHoveredSplitSide("right")}
              onMouseLeave={() => setHoveredSplitSide(null)}
              onClick={() => {
                setServiceMode("taxi");
                setHasSelectedMode(true);
              }}
              animate={{
                flex: hoveredSplitSide === "right" ? 1.35 : hoveredSplitSide === "left" ? 0.65 : 1,
                filter: hoveredSplitSide === "left" ? "brightness(0.85)" : "brightness(1)",
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex-1 bg-[#f5f5f7] flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f7] via-[#e8e8ed] to-[#d2d2d7] opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(0,113,227,0.04),transparent_70%)]" />
              <div className="absolute top-[30%] left-[25%] w-1 h-1 bg-black/5 rounded-full animate-pulse" />
              <div className="absolute top-[55%] left-[65%] w-1.5 h-1.5 bg-black/5 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }} />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="relative z-10 text-center px-8 max-w-md"
              >
                <div className="text-5xl mb-6">💼</div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-3">Sit Back & Relax</h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-medium">Professional uniformed drivers, zero security deposit, fuel & tolls fully inclusive. Airport VIP pickups available 24/7.</p>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500"
                >
                  <Briefcase size={14} /> Enter Taxi Mode <ArrowRight size={14} />
                </motion.div>
                <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  <span>Zero Deposit</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>Pro Driver</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>Tolls Included</span>
                </div>
              </motion.div>
            </motion.div>

            {/* CENTER FLOATING LOGO */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_12px_60px_rgba(0,0,0,0.15)] flex items-center justify-center"
              >
                <span className="text-xl md:text-2xl font-bold tracking-tighter text-[#1d1d1f]">Unique</span>
              </motion.div>
            </div>

            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-10" />
            <div className="md:hidden absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto w-full z-[10002] relative"
      >
        <div className="text-2xl font-bold tracking-tighter z-[10002] relative cursor-pointer text-black" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Unique</div>
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          
          <div className="relative">
            <button suppressHydrationWarning
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onBlur={() => setTimeout(() => setIsServicesOpen(false), 200)}
              className={`hover:text-black transition cursor-pointer font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1 ${isServicesOpen ? "bg-black text-white shadow-xs" : "text-gray-500 hover:bg-gray-100"}`}
            >
              🚘 Services
              <ChevronRight size={12} className={`transition-transform duration-200 ${isServicesOpen ? "rotate-90" : ""}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-2 w-64 bg-[#1d1d1f] backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden z-[10010]"
                >
                  {[
                    { label: "Self Drive Cars", emoji: "🚗", mode: "self-drive" as const },
                    { label: "Airport Transfer Cars", emoji: "✈️", mode: "taxi" as const },
                    { label: "Luxury Self Drive Cars", emoji: "💎", mode: "self-drive" as const },
                    { label: "Corporate Car", emoji: "🏢", mode: "taxi" as const },
                    { label: "Luxury Wedding Cars", emoji: "💍", mode: "taxi" as const },
                    { label: "Tempo Traveller Cars", emoji: "🚌", mode: "taxi" as const },
                    { label: "Taxi Rentals", emoji: "🚕", mode: "taxi" as const },
                  ].map((item, i) => (
                    <button suppressHydrationWarning
                      key={item.label}
                      onClick={() => {
                        setActiveCategory(item.label);
                        setServiceMode(item.mode);
                        setIsServicesOpen(false);
                        setTimeout(() => {
                          document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className={`w-full text-left px-5 py-3 text-[13px] font-semibold flex items-center gap-3 transition cursor-pointer ${activeCategory === item.label ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"} ${i === 0 ? "pt-4" : ""} ${i === 6 ? "pb-4" : ""}`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      {item.label}
                      {activeCategory === item.label && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0071e3]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button suppressHydrationWarning onClick={() => document.getElementById("how-it-works-section")?.scrollIntoView({ behavior: "smooth" })} className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">How it Works</button>
          <button suppressHydrationWarning onClick={() => document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" })} className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">Features</button>
          <button suppressHydrationWarning onClick={() => document.getElementById("showroom-section")?.scrollIntoView({ behavior: "smooth" })} className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">Our Hubs</button>
          <Link href="/about" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">About Us</Link>
          <Link href="/contact" className="text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer">Contact Us</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.instagram.com/uniquerentals" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_4px_20px_rgba(220,39,67,0.35)] transition-all duration-300 cursor-pointer" aria-label="Follow us on Instagram"><InstagramIcon size={16} /></a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#25d366] to-[#128c7e] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-300 cursor-pointer" aria-label="Contact us on WhatsApp"><WhatsAppIcon size={16} /></a>
          <button suppressHydrationWarning className="flex bg-black text-white px-5 py-2.5 rounded-full text-xs font-medium items-center gap-2 hover:bg-gray-800 transition cursor-pointer"><Download size={14} /> Download App</button>
        </div>

        {/* Mobile Hamburger Button */}
        <button suppressHydrationWarning
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/80 border border-gray-200/50 shadow-sm z-[10002] relative focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1 w-5">
            <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5 } }} animate={isMobileMenuOpen ? "open" : "closed"} transition={{ duration: 0.2 }} className="w-full h-0.5 bg-black rounded" />
            <motion.span variants={{ closed: { opacity: 1, x: 0 }, open: { opacity: 0, x: -10 } }} animate={isMobileMenuOpen ? "open" : "closed"} transition={{ duration: 0.2 }} className="w-full h-0.5 bg-black rounded" />
            <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -5 } }} animate={isMobileMenuOpen ? "open" : "closed"} transition={{ duration: 0.2 }} className="w-full h-0.5 bg-black rounded" />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 left-0 right-0 h-screen bg-white/95 backdrop-blur-xl z-[10000] flex flex-col px-10 pt-28 space-y-6 md:hidden text-left"
          >
            <div className="flex flex-col space-y-6 text-xl font-bold tracking-tight">
              <div>
                <button suppressHydrationWarning
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full text-left py-2 border-b border-gray-100 flex items-center justify-between text-gray-500 hover:text-black cursor-pointer"
                >
                  <span className="flex items-center gap-2">🚘 Our Services</span>
                  <ChevronRight size={18} className={`transition-transform duration-200 ${isMobileServicesOpen ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 pt-2 space-y-3 overflow-hidden flex flex-col text-sm"
                    >
                      {[
                        { label: "Self Drive Cars", emoji: "🚗", mode: "self-drive" as const },
                        { label: "Airport Transfer Cars", emoji: "✈️", mode: "taxi" as const },
                        { label: "Luxury Self Drive Cars", emoji: "💎", mode: "self-drive" as const },
                        { label: "Corporate Car", emoji: "🏢", mode: "taxi" as const },
                        { label: "Luxury Wedding Cars", emoji: "💍", mode: "taxi" as const },
                        { label: "Tempo Traveller Cars", emoji: "🚌", mode: "taxi" as const },
                        { label: "Taxi Rentals", emoji: "🚕", mode: "taxi" as const },
                      ].map((item) => (
                        <button suppressHydrationWarning
                          key={item.label}
                          onClick={() => {
                            setActiveCategory(item.label);
                            setServiceMode(item.mode);
                            setIsMobileMenuOpen(false);
                            setIsMobileServicesOpen(false);
                            setTimeout(() => {
                              document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" });
                            }, 150);
                          }}
                          className={`text-left py-1 flex items-center gap-2 cursor-pointer font-semibold ${activeCategory === item.label ? "text-[#0071e3]" : "text-gray-500 hover:text-black"}`}
                        >
                          <span>{item.emoji}</span> {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button suppressHydrationWarning onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => document.getElementById("how-it-works-section")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="text-left hover:text-black text-gray-500 transition py-2 border-b border-gray-100 cursor-pointer">How it Works</button>
              <button suppressHydrationWarning onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="text-left hover:text-black text-gray-500 transition py-2 border-b border-gray-100 cursor-pointer">Features</button>
              <button suppressHydrationWarning onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => document.getElementById("showroom-section")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="text-left hover:text-black text-gray-500 transition py-2 border-b border-gray-100 cursor-pointer">Our Hubs</button>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-left hover:text-black text-gray-500 transition py-2 border-b border-gray-100 font-bold block">About Us</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-left hover:text-black text-gray-500 transition py-2 border-b border-gray-100 font-bold block">Contact Us</Link>
            </div>

            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/uniquerentals" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0"><InstagramIcon size={22} /></a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#25d366] to-[#128c7e] flex items-center justify-center text-white shrink-0 shadow-sm"><WhatsAppIcon size={22} /></a>
              <button suppressHydrationWarning onClick={() => setIsMobileMenuOpen(false)} className="flex-1 bg-black text-white px-6 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2"><Download size={18} /> Download App</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="px-6 md:px-10 pt-6 md:pt-10 pb-12 md:pb-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Hero Text */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 text-left order-2 md:order-1">
          
          <motion.div variants={fadeUp} className="inline-flex bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
            <button suppressHydrationWarning
              onClick={() => { setServiceMode("self-drive"); setActiveCategory("All"); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${serviceMode === "self-drive" ? "bg-black text-white shadow-sm scale-102" : "text-gray-400 hover:text-black"}`}
            >
              🚗 Self-Drive Rental
            </button>
            <button suppressHydrationWarning
              onClick={() => { setServiceMode("taxi"); setActiveCategory("All"); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${serviceMode === "taxi" ? "bg-black text-white shadow-sm scale-102" : "text-gray-400 hover:text-black"}`}
            >
              💼 Taxi
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={serviceMode}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-black">
                {serviceMode === "self-drive" ? <>Premium <br />Self-Driving <br />Rentals</> : <>Elite <br />Taxi <br />Cabs</>}
              </h1>
              <p className="text-gray-500 max-w-md text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                {serviceMode === "self-drive"
                  ? "Take control of Pune's most exclusive self-driving fleet. Enjoy absolute freedom, high-performance luxury, and door-step delivery in Maharashtra & Goa."
                  : "Sit back and travel in comfort. English-speaking professional drivers, zero security deposit, fuel and tolls fully inclusive for local or outstation road trips."}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2 justify-start">
            <button suppressHydrationWarning onClick={() => document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" })} className="bg-black hover:bg-gray-800 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer shadow-md hover:shadow-lg transform active:scale-98">
              {serviceMode === "self-drive" ? "Explore Self-Drive Fleet" : "Book Luxury Taxi"}
            </button>
            <button suppressHydrationWarning onClick={() => document.getElementById("how-it-works-section")?.scrollIntoView({ behavior: "smooth" })} className="bg-white hover:bg-gray-50 text-black border border-gray-200 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer shadow-sm hover:shadow-md transform active:scale-98">
              How It Works
            </button>
          </motion.div>
        </motion.div>

        {/* --- DYNAMIC PREMIUM PRESENTATION VIEWPORT (Optimized for Mobile/Desktop Blending) --- */}
        <div className="relative flex justify-center items-center w-full max-w-xl mx-auto md:max-w-none order-1 md:order-2 mt-4 md:mt-0 px-2 sm:px-0">
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-auto flex items-center justify-center overflow-visible"
          >
            {/* Ground shadow anchoring asset structure */}
            <div className="absolute bottom-[5%] sm:bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-5 bg-black/10 blur-2xl rounded-full z-0" />
            
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full max-h-[260px] sm:max-h-[380px] md:max-h-none object-contain relative z-10"
              style={{
                mixBlendMode: "multiply",
                filter: "contrast(1.12) brightness(1.12)",
                // Responsive safety mask ensuring zero cut lines on tiny smartphone displays
                WebkitMaskImage: "radial-gradient(circle 98% 95% at 50% 50%, black 72%, transparent 100%)",
                maskImage: "radial-gradient(circle 98% 95% at 50% 50%, black 72%, transparent 100%)",
              }}
            >
              <source src="/hero-car3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* --- BRAND LOGOS --- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="border-t border-gray-200 flex justify-center gap-12 py-10 max-w-7xl mx-auto opacity-60 flex-wrap"
      >
        {carBrands.map((brand, i) => (
          <motion.div key={i} variants={fadeUp} className="text-xl font-bold text-gray-400 uppercase tracking-widest">
            {brand}
          </motion.div>
        ))}
      </motion.div>

      {/* --- DUAL-SERVICE FEATURE SHOWCASE ("HOW IT WORKS") --- */}
      <section id="how-it-works-section" className="py-14 px-6 md:px-10 max-w-7xl mx-auto border-t border-gray-200/50">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-center max-w-3xl mx-auto mb-10">
          <motion.span variants={fadeUp} className="text-xs font-bold tracking-widest text-[#0071e3] uppercase mb-3 block">Bespoke Travel Solutions</motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black leading-tight">Two Elite Travel Modes.<br />One Premium Standard.</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-normal">Whether you seek the raw thrill of commanding a high-performance SUV or prefer to relax in the back of an executive cab, we have engineered the perfect journey for you.</motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Card 1: Self-Drive Rental */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -6 }}
            className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between text-left ${serviceMode === "self-drive" ? "bg-white border-[#0071e3] shadow-[0_12px_40px_rgba(0,113,227,0.06)]" : "bg-white border-gray-150/70 shadow-sm hover:border-gray-300"}`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Option A</span>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">Full Driving Freedom</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black flex items-center gap-2">🚗 Self-Drive Rental</h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed font-medium">Perfect for adventurers, families, and car enthusiasts who love taking full control of premium, meticulously detailed vehicles.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black shrink-0 border border-gray-100"><Sparkles size={14} /></div>
                  <div className="text-xs">
                    <h4 className="font-bold text-black">Command Vetted Legends</h4>
                    <p className="text-gray-400 font-medium leading-relaxed mt-0.5">Command the Mahindra Thar, Fortuner 4x4, or Nexon EV at your own terms.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black shrink-0 border border-gray-100"><ShieldCheck size={14} /></div>
                  <div className="text-xs">
                    <h4 className="font-bold text-black">Fully Refundable Security Deposit</h4>
                    <p className="text-gray-400 font-medium leading-relaxed mt-0.5">Deposit held via pre-authorization, released immediately upon post-rental check.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black shrink-0 border border-gray-100"><MapPin size={14} /></div>
                  <div className="text-xs">
                    <h4 className="font-bold text-black">Interstate Freedom (MH & GA)</h4>
                    <p className="text-gray-400 font-medium leading-relaxed mt-0.5">Explore Goa beaches, Lonavala hills, or Mumbai expressways with pre-cleared permits.</p>
                  </div>
                </div>
              </div>
            </div>
            <button suppressHydrationWarning onClick={() => { setServiceMode("self-drive"); document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" }); }} className={`w-full mt-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1 shadow-sm ${serviceMode === "self-drive" ? "bg-black text-white hover:bg-gray-800" : "bg-gray-50 hover:bg-gray-100 text-gray-700"}`}>Select Self-Drive <ArrowRight size={14} /></button>
          </motion.div>

          {/* Card 2: Taxi */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -6 }}
            className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between text-left ${serviceMode === "taxi" ? "bg-white border-[#0071e3] shadow-[0_12px_40px_rgba(0,113,227,0.06)]" : "bg-white border-gray-150/70 shadow-sm hover:border-gray-300"}`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Option B</span>
                <span className="text-xs font-semibold bg-blue-50 text-[#0071e3] px-3 py-1 rounded-full border border-blue-100">Zero Financial Liability</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black flex items-center gap-2">💼 Taxi</h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed font-medium">Ideal for business travelers, airport logistics, and outstation family trips where safety, comfort, and zero liability are paramount.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black shrink-0 border border-gray-100"><Briefcase size={14} /></div>
                  <div className="text-xs">
                    <h4 className="font-bold text-black">Professional Uniformed Drivers</h4>
                    <p className="text-gray-400 font-medium leading-relaxed mt-0.5">English-speaking, background-verified local experts with perfect driving history.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black shrink-0 border border-gray-100"><Shield size={14} /></div>
                  <div className="text-xs">
                    <h4 className="font-bold text-black">Waived Security Deposit (₹0)</h4>
                    <p className="text-gray-400 font-medium leading-relaxed mt-0.5">No cards blocked, no cash held. Absolute peace of mind as our driver operates the vehicle.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black shrink-0 border border-gray-100"><Clock size={14} /></div>
                  <div className="text-xs">
                    <h4 className="font-bold text-black">Fuel & Highway Tolls Included</h4>
                    <p className="text-gray-400 font-medium leading-relaxed mt-0.5">Flat, transparent daily rate covers all fuel charges, interstate taxes, and highway tolls.</p>
                  </div>
                </div>
              </div>
            </div>
            <button suppressHydrationWarning onClick={() => { setServiceMode("taxi"); document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" }); }} className={`w-full mt-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1 shadow-sm ${serviceMode === "taxi" ? "bg-black text-white hover:bg-gray-800" : "bg-gray-50 hover:bg-gray-100 text-gray-700"}`}>Select Taxi Mode <ArrowRight size={14} /></button>
          </motion.div>
        </motion.div>

        {/* Morphing Roadmap Segment */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-150/70 shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-left">
          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-gray-100 pb-6 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Platform Roadmap</span>
              <h3 className="font-bold text-xl text-black mt-1">Interactive Journey Tracker</h3>
            </div>
            <div className="bg-[#f5f5f7] border border-gray-200/50 p-0.5 rounded-xl flex text-[10px] font-bold shrink-0">
              <button suppressHydrationWarning type="button" onClick={() => setServiceMode("self-drive")} className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${serviceMode === "self-drive" ? "bg-white text-black shadow-xs" : "text-gray-400 hover:text-black"}`}>Self-Drive Flow</button>
              <button suppressHydrationWarning type="button" onClick={() => setServiceMode("taxi")} className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${serviceMode === "taxi" ? "bg-white text-black shadow-xs" : "text-gray-400 hover:text-black"}`}>Taxi Flow</button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={serviceMode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {serviceMode === "self-drive" ? (
                <>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">1</span>
                    <h4 className="font-bold text-sm text-black">Select Model & Dates</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Choose from hatchbacks, luxury SUVs, or convertibles and book rental dates.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">2</span>
                    <h4 className="font-bold text-sm text-black">Pay 30% Advanced</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Secure your car via our safe Razorpay integration. Pre-authorization done at delivery.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">3</span>
                    <h4 className="font-bold text-sm text-black">Pre-Rental Walkthrough</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Our agent delivers the vehicle. We conduct a mutual video check for ultimate safety.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold text-xs">4</span>
                    <h4 className="font-bold text-sm text-[#0071e3]">Take The Wheel!</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Enjoy the drive. Returns are simple, with 24/7 technical roadside support standing by.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">1</span>
                    <h4 className="font-bold text-sm text-black">Specify Pickup & Route</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Choose your fleet class and enter precise local/outstation addresses.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">2</span>
                    <h4 className="font-bold text-sm text-black">Advanced 30% Pre-pay</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Waive the security deposit. Secure the booking instantly with all tolls/fuel inclusive.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">3</span>
                    <h4 className="font-bold text-sm text-black">Driver Dispatch</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Driver profiles are sent in advance. Driver arrives in professional attire 15 mins early.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold text-xs">4</span>
                    <h4 className="font-bold text-sm text-[#0071e3]">Sit Back & Relax</h4>
                    <p className="text-gray-455 text-[11px] leading-relaxed mt-1 font-medium">Charge your phone, read, or take meetings. Our driver handles navigation and safety.</p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- VEHICLE FLEET SECTION --- */}
      <section id="fleet-section" className="py-14 px-10 max-w-7xl mx-auto text-center">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="mb-8">
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Only The Best Cars</motion.p>
          <motion.h2 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">Our Vehicle Fleet</motion.h2>

          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="bg-white border border-[#d2d2d7]/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-1 rounded-2xl flex max-w-sm w-full relative">
              <button suppressHydrationWarning onClick={() => { setServiceMode("self-drive"); setActiveCategory("All"); }} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition duration-300 relative z-10 cursor-pointer ${serviceMode === "self-drive" ? "text-white bg-black shadow-sm" : "text-gray-500 hover:text-black"}`}>🚗 Self-Driving Rental</button>
              <button suppressHydrationWarning onClick={() => { setServiceMode("taxi"); setActiveCategory("All"); }} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition duration-300 relative z-10 cursor-pointer ${serviceMode === "taxi" ? "text-white bg-black shadow-sm" : "text-gray-500 hover:text-black"}`}>💼 Taxi</button>
            </div>
          </motion.div>

          {activeCategory !== "All" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20 px-5 py-2 rounded-full text-xs font-semibold shadow-xs">
                <span className="flex items-center gap-1">🔍 Active Filter: <strong className="text-black font-bold">{activeCategory}</strong></span>
                <button suppressHydrationWarning onClick={() => setActiveCategory("All")} className="hover:text-red-500 transition-colors ml-2 cursor-pointer font-bold bg-white/60 hover:bg-white w-5 h-5 rounded-full flex items-center justify-center border border-gray-200/50 shadow-xs" title="Clear Filter">✕</button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-10 px-10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="flex gap-6 w-max">
            {(activeCategory === "All"
              ? fleetCarsData.filter(car => {
                  if (serviceMode === "self-drive") {
                    return car.serviceType?.includes("Self Drive Cars") || car.serviceType?.includes("Luxury Self Drive Cars");
                  } else {
                    return car.serviceType?.some(type => type !== "Self Drive Cars" && type !== "Luxury Self Drive Cars");
                  }
                })
              : fleetCarsData.filter(car => car.serviceType?.includes(activeCategory))
            ).map((car) => (
              <motion.div
                key={car.name}
                variants={fadeUp}
                onClick={() => {
                  setSelectedCar(car);
                  if (car.serviceType && car.serviceType.length > 0) {
                    const getServiceMode = (category: string): "self-drive" | "taxi" => {
                      if (category === "Airport Transfer Cars" || category === "Corporate Car" || category === "Luxury Wedding Cars" || category === "Tempo Traveller Cars" || category === "Taxi Rentals") {
                        return "taxi";
                      }
                      return "self-drive";
                    };
                    if (activeCategory === "All" || !car.serviceType.includes(activeCategory)) {
                      const defaultCat = car.serviceType.includes("Self Drive Cars") ? "Self Drive Cars" : car.serviceType[0];
                      setActiveCategory(defaultCat);
                      setServiceMode(getServiceMode(defaultCat));
                    }
                  }
                }}
                className="snap-start snap-always flex-none w-[85vw] md:w-[45vw] lg:w-[calc(25%-18px)] bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="flex justify-between items-start text-left">
                    <div>
                      <h3 className="font-semibold text-black text-base group-hover:text-[#0071e3] transition">{car.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{car.category}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">⚡ {car.specs.mileage}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-black">₹{(serviceMode === "taxi" ? car.price + 1500 : car.price).toLocaleString("en-IN")}</span>
                      <span className="text-[10px] text-gray-400 block font-medium">/ day {serviceMode === "taxi" && "(with Driver)"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <button suppressHydrationWarning
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCar(car);
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-2xl text-[11px] font-semibold tracking-wider uppercase transition cursor-pointer flex items-center justify-center shadow-sm"
                  >
                    Book Now
                  </button>
                  <button suppressHydrationWarning
                    onClick={(e) => {
                      e.stopPropagation();
                      const phone = "919876543210";
                      const text = encodeURIComponent(`Hi Unique Rentals! I would love to ask about availability and booking details for the ${car.name} (${car.category}) at ₹${car.price.toLocaleString("en-IN")}/day.`);
                      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
                    }}
                    className="w-full text-center text-xs font-semibold text-gray-500 hover:text-black transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    Inquire via WhatsApp <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Link href="/cars" className="mt-10 text-black font-semibold flex items-center justify-center gap-2 mx-auto hover:underline cursor-pointer text-sm w-fit">Show All Cars <ChevronRight size={16} /></Link>
      </section>

      {/* --- KEY FEATURES SECTION --- */}
      <section id="features-section" className="py-10 md:py-14 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="mb-8 max-w-md text-left">
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Taking Care of Every Client</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight mb-3">Key Features</motion.h2>
          <motion.p variants={fadeUp} className="text-sm text-gray-500">We are all about our client's comfort and safety. That's why we provide the best service you can imagine.</motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={i} variants={fadeUp} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-150/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between min-h-[170px] md:min-h-[220px] text-left group">
                <div className="w-9 h-9 md:w-11 md:h-11 bg-gray-50 group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3] rounded-full flex items-center justify-center text-black transition duration-300">
                  <Icon size={16} className="md:hidden" />
                  <Icon size={20} className="hidden md:block" />
                </div>
                <div className="mt-4 flex-grow">
                  <h3 className="text-xs md:text-sm lg:text-base font-bold leading-tight text-black mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-gray-455 text-[10px] md:text-[11px] leading-normal md:leading-relaxed font-medium">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* --- CUSTOMER REVIEWS SECTION --- */}
      <section className="py-14 px-10 max-w-7xl mx-auto border-t border-gray-200/50">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-left">
          <div className="max-w-lg">
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">What Our Clients Say</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Customer Reviews</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-sm leading-relaxed">Trusted by thousands of happy customers across Pune. Here's what they have to say about their experience with Unique Rentals.</motion.p>
          </div>
          <motion.div variants={fadeUp} className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
            </div>
            <div>
              <span className="text-2xl font-bold text-black">4.9</span>
              <span className="text-xs text-gray-400 ml-1 font-medium">/ 5.0</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium ml-1">Based on 1,200+ reviews</span>
          </motion.div>
        </motion.div>

        {(() => {
          const customerReviews = [
            { name: "Rahul Sharma", avatar: "RS", role: "Business Executive", rating: 5, date: "2 weeks ago", review: "Absolutely fantastic service! Rented a Toyota Innova Crysta for a week-long business trip. The car was in pristine condition, fully sanitized, and delivered right to my doorstep.", car: "Toyota Innova Crysta", tripType: "Business Trip", gradient: "from-blue-500 to-indigo-600" },
            { name: "Priya Deshmukh", avatar: "PD", role: "Software Engineer", rating: 5, date: "1 month ago", review: "Best self-drive rental experience in Pune! Picked up a Hyundai Creta and it was spotless. Their 24/7 roadside assistance gave me complete peace of mind.", car: "Hyundai Creta", tripType: "Weekend Getaway", gradient: "from-violet-500 to-purple-600" },
            { name: "Amit Kulkarni", avatar: "AK", role: "Entrepreneur", rating: 5, date: "3 weeks ago", review: "Used their airport transfer service — the driver arrived 15 minutes early, car was immaculate, and the ride was smooth. Most professional rental hub in Pune.", car: "Maruti Ciaz", tripType: "Airport Transfer", gradient: "from-emerald-500 to-teal-600" },
            { name: "Sneha Patil", avatar: "SP", role: "Wedding Planner", rating: 5, date: "1 month ago", review: "Booked their luxury wedding cars for a client's big day and they exceeded expectations. beautifully styled, punctual, and elite concierge support.", car: "Toyota Fortuner", tripType: "Wedding Event", gradient: "from-rose-500 to-pink-600" },
            { name: "Vikram Joshi", avatar: "VJ", role: "Travel Blogger", rating: 4, date: "2 months ago", review: "Fleet is exceptionally well-maintained, clear transparent billing with zero surprises. Outstation operations to Goa are absolutely premium.", car: "Mahindra Thar", tripType: "Road Trip", gradient: "from-amber-500 to-orange-600" },
            { name: "Deepa Nair", avatar: "DN", role: "Doctor", rating: 5, date: "3 weeks ago", review: "Urgent medical conference travel response was handled brilliantly within 2 hours. The car was clean, fast, and mechanical conditions were perfect.", car: "Maruti Swift", tripType: "Conference Travel", gradient: "from-cyan-500 to-blue-600" }
          ];

          return (
            <div className="relative group/reviews">
              <button suppressHydrationWarning onClick={() => { const el = document.getElementById('reviews-scroll'); if (el) el.scrollBy({ left: -340, behavior: 'smooth' }); }} className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full items-center justify-center shadow-lg hover:bg-black hover:text-white hover:border-black transition-all duration-300 opacity-0 group-hover/reviews:opacity-100"><ChevronLeft size={18} /></button>
              <button suppressHydrationWarning onClick={() => { const el = document.getElementById('reviews-scroll'); if (el) el.scrollBy({ left: 340, behavior: 'smooth' }); }} className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full items-center justify-center shadow-lg hover:bg-black hover:text-white hover:border-black transition-all duration-300 opacity-0 group-hover/reviews:opacity-100"><ChevronRight size={18} /></button>

              <div id="reviews-scroll" className="overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-10 px-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="flex gap-6 w-max">
                  {customerReviews.map((review, index) => (
                    <motion.div key={index} variants={fadeUp} className="snap-start snap-always flex-none w-[85vw] md:w-[380px] bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col justify-between min-h-[320px] group/card relative overflow-hidden text-left">
                      <div className="absolute top-5 right-5 opacity-[0.04] group-hover/card:opacity-[0.08] transition-opacity duration-500"><Quote size={80} /></div>
                      <div className="space-y-5 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>{review.avatar}</div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-sm text-black">{review.name}</h4>
                            <p className="text-[11px] text-gray-400 font-medium">{review.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />)}</div>
                            <span className="text-[10px] text-gray-300 font-medium mt-0.5 block">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-[13px] text-gray-600 leading-relaxed font-medium">"{review.review}"</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">🚗 {review.car}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#0071e3] bg-blue-50 px-2.5 py-1 rounded-full">{review.tripType}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-gray-50">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"><Check size={10} className="text-white" /></div>
                        <span className="text-[10px] text-gray-400 font-semibold">Verified Customer</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          );
        })()}

        {/* Google Reviews Trust Badge */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 bg-gradient-to-r from-gray-50 to-white p-6 rounded-3xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                <span className="text-sm font-bold text-black ml-1">4.9</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">Google Reviews Rating</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xl font-bold text-black">1,200+</p>
              <p className="text-[10px] text-gray-400 font-medium">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-black">98%</p>
              <p className="text-[10px] text-gray-400 font-medium">Would Recommend</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-black">4.8</p>
              <p className="text-[10px] text-gray-400 font-medium">Service Rating</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SHOWROOMS & MAP SECTION --- */}
      <section id="showroom-section" className="py-14 px-10 max-w-7xl mx-auto border-t border-gray-200/50">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="grid lg:grid-cols-5 gap-8 items-center text-left">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Our Presence</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mt-2 leading-tight">We are available at</h2>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">Experience high-performance client logistics directly at our flagship hubs in Shivajinagar and premium airport delivery zones.</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition">
                <span className="text-[9px] font-bold uppercase text-[#0071e3] tracking-widest font-mono">Flagship Hub</span>
                <h4 className="font-bold text-sm text-black mt-1">Senapati Bapat Road, Pune</h4>
                <p className="text-gray-450 text-[11px] mt-1 leading-relaxed">Shivajinagar, Pune, MH 411016 <br />Open Daily: 9:00 AM — 9:00 PM</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition">
                <span className="text-[9px] font-bold uppercase text-[#0071e3] tracking-widest font-mono">Airport VIP Hub</span>
                <h4 className="font-bold text-sm text-black mt-1">Pune International Airport (PNQ)</h4>
                <p className="text-gray-450 text-[11px] mt-1 leading-relaxed">Lohegaon, Pune, MH 411032 <br />24/7 Flight Valet & Drop-Off</p>
              </div>
            </div>
          </div>

          <motion.div variants={scaleIn} className="lg:col-span-3 w-full h-[220px] md:h-[350px] lg:h-[420px] rounded-3xl border border-[#d2d2d7]/50 shadow-sm overflow-hidden relative bg-gray-100">
            <iframe title="Unique Rentals Pune Showroom" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.5649989823485!2d73.8291437!3d18.5308225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf7ab349f257%3A0x2860d5d1c2dc5a79!2sSenapati%20Bapat%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full filter grayscale-[10%] contrast-[95%] opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- CTA & FOOTER --- */}
      <section className="px-6 md:px-10 pb-8 max-w-7xl mx-auto text-left">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 border-t border-gray-200/60">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Ready to drive?</h2>
            <p className="text-sm text-gray-500 mt-1">Premium fleet. Doorstep delivery. Zero hassle.</p>
          </div>
          <button suppressHydrationWarning onClick={() => document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" })} className="bg-black hover:bg-gray-800 text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md group/btn flex-shrink-0">
            Explore Fleet <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
          </button>
        </motion.div>

        <footer className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-200 pt-10">
          <div className="flex gap-8 text-sm text-gray-500 font-medium mb-8 md:mb-0 flex-wrap">
            <Link href="/about" className="hover:text-black">About Us</Link>
            <Link href="/cars" className="hover:text-black">Cars</Link>
            <Link href="/#features-section" className="hover:text-black">Features</Link>
            <Link href="/contact" className="hover:text-black">Contact Us</Link>
          </div>

          <div className="w-full md:w-auto">
            <p className="text-sm font-bold mb-3">Subscribe to News</p>
            <div className="flex items-center border-b border-gray-300 pb-2">
              <input suppressHydrationWarning type="email" placeholder="Your e-mail" className="bg-transparent outline-none flex-grow text-sm" />
              <button suppressHydrationWarning aria-label="Subscribe"><ChevronRight size={18} className="text-gray-400 hover:text-black transition" /></button>
            </div>
          </div>
        </footer>
      </section>

      {/* --- DIRECT BOOKING MODAL --- */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetBookingForm} className="absolute inset-0 bg-[#1d1d1f]/40 backdrop-blur-md" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 25 }} transition={{ type: "spring", stiffness: 350, damping: 28 }} className="bg-[#ffffff] border border-[#d2d2d7]/50 rounded-[32px] shadow-[0_12px_50px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-4xl relative z-10 max-h-[90vh] flex flex-col font-sans">
              <button suppressHydrationWarning onClick={resetBookingForm} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500 hover:text-black z-20 cursor-pointer" title="Close"><X size={16} /></button>

              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  !isPaying ? (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-y-auto p-8 md:p-10 flex flex-col">
                      <div className="mb-6 select-none text-left border-b border-[#d2d2d7]/20 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Direct Reservation & Specifications</span>
                        <h3 className="text-2xl font-bold tracking-tight text-black mt-1">Bespoke Vehicle Configuration</h3>
                        <p className="text-xs text-gray-500 mt-1">Review specifications and complete your reservation instantly.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-5 text-left border-r border-[#d2d2d7]/20 pr-0 md:pr-8 flex flex-col justify-between self-stretch">
                          <div className="space-y-4">
                            <div className="w-full relative shrink-0">
                              <div className="w-full h-40 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center relative group">
                                <img src={selectedCar.images[activeImageIndex]} alt={selectedCar.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white font-bold tracking-wider text-[9px] uppercase px-2.5 py-1 rounded-full">{selectedCar.category}</div>
                              </div>
                              <div className="flex gap-2 mt-2 shrink-0 overflow-x-auto py-1 scrollbar-none justify-start">
                                {selectedCar.images.map((img, idx) => (
                                  <button suppressHydrationWarning key={idx} type="button" onClick={() => setActiveImageIndex(idx)} className={`w-14 h-10 rounded-lg overflow-hidden border transition transform active:scale-95 shrink-0 cursor-pointer ${activeImageIndex === idx ? "ring-2 ring-[#0071e3] ring-offset-2 ring-offset-white border-transparent scale-102" : "border-gray-200 hover:border-gray-400"}`}><img src={img} alt={`${selectedCar.name} angle ${idx + 1}`} className="w-full h-full object-cover" /></button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-xl tracking-tight text-black">{selectedCar.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-base text-[#0071e3]">₹{(serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price).toLocaleString("en-IN")}</span>
                                <span className="text-[11px] text-gray-500 font-medium">/ day ({serviceMode === "taxi" ? "with Driver" : "Self-Drive"})</span>
                              </div>
                            </div>

                            <div className="flex bg-[#f5f5f7] p-1 rounded-xl border border-gray-200/50 text-[11px] font-semibold text-gray-500 shrink-0">
                              <button suppressHydrationWarning type="button" onClick={() => setActiveModalTab("overview")} className={`flex-1 py-1.5 rounded-lg transition duration-200 ${activeModalTab === "overview" ? "bg-white text-black shadow-sm" : "hover:text-black cursor-pointer"}`}>Overview & Specs</button>
                              <button suppressHydrationWarning type="button" onClick={() => setActiveModalTab("policies")} className={`flex-1 py-1.5 rounded-lg transition duration-200 ${activeModalTab === "policies" ? "bg-white text-black shadow-sm" : "hover:text-black cursor-pointer"}`}>Policies & Terms</button>
                            </div>

                            {activeModalTab === "overview" && (
                              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                <div className="space-y-1">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Car Overview</h5>
                                  <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">{selectedCar.overview}</p>
                                </div>
                                <div className="space-y-2">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Technical Specifications</h5>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40"><span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Engine</span><span className="font-semibold text-black text-[11px]">{selectedCar.specs?.engine}</span></div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40"><span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Transmission</span><span className="font-semibold text-black text-[11px]">{selectedCar.specs?.transmission}</span></div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40"><span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Power Output</span><span className="font-semibold text-black text-[11px]">{selectedCar.specs?.power}</span></div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40"><span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Drive System</span><span className="font-semibold text-black text-[11px]">{selectedCar.specs?.drive}</span></div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40"><span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Fuel Source</span><span className="font-semibold text-black text-[11px]">{selectedCar.specs?.fuel}</span></div>
                                    <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-gray-150/40"><span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Certified Mileage</span><span className="font-semibold text-emerald-600 text-[11px]">⚡ {selectedCar.specs?.mileage}</span></div>
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Premium Amenities</h5>
                                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                    {selectedCar.features?.map((feat, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
                                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200"><Check size={9} strokeWidth={3} /></div>
                                        <span className="truncate">{feat}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {activeModalTab === "policies" && (
                              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                <div className={`${serviceMode === "taxi" ? "bg-blue-50/50 border-blue-100" : "bg-emerald-50/50 border-emerald-100"} border rounded-xl p-3 flex items-start gap-2.5`}>
                                  <div className={`w-5 h-5 rounded-full ${serviceMode === "taxi" ? "bg-[#0071e3]" : "bg-emerald-500"} text-white flex items-center justify-center font-bold text-[9px] shrink-0`}>₹</div>
                                  <div className="text-[11px]">
                                    <span className={`font-bold ${serviceMode === "taxi" ? "text-blue-800" : "text-emerald-800"} block uppercase tracking-wider text-[9px]`}>{serviceMode === "taxi" ? "Zero Security Deposit Required" : "Refundable Security Deposit"}</span>
                                    <span className={`${serviceMode === "taxi" ? "text-blue-700" : "text-emerald-700"} leading-normal font-semibold`}>{serviceMode === "taxi" ? "Since a professional driver operates the vehicle, absolutely zero security deposit or pre-authorization is required at pickup." : "We pre-authorize a standard refundable security deposit upon vehicle delivery, released instantly following post-rental check verification."}</span>
                                  </div>
                                </div>
                                {serviceMode !== "taxi" && (
                                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-start gap-2.5">
                                    <span className="text-amber-500 shrink-0 text-sm font-bold leading-none">⚠️</span>
                                    <div className="text-[11px]">
                                      <span className="font-bold text-amber-800 block uppercase tracking-wider text-[9px]">Damage & Pre-Rental Inspection</span>
                                      <p className="text-amber-700 leading-relaxed font-semibold mt-0.5">{selectedCar.damagePolicy}</p>
                                    </div>
                                  </div>
                                )}
                                <div className="space-y-1.5">
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{serviceMode === "taxi" ? "Highlighted Service Conditions" : "Highlighted Rental Conditions"}</h5>
                                  <div className="space-y-1 text-[11px] font-semibold text-gray-600">
                                    {serviceMode === "taxi" ? (
                                      <>
                                        <div className="flex items-start gap-1.5"><span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span><span className="leading-normal">Professional Driver included in pricing</span></div>
                                        <div className="flex items-start gap-1.5"><span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span><span className="leading-normal">Standard working hours: 12 Hours / 250 km limit per day (extra hours billed at ₹150/hr)</span></div>
                                        <div className="flex items-start gap-1.5"><span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span><span className="leading-normal">All toll taxes, state permits, and fuel allowances are included in the rate</span></div>
                                      </>
                                    ) : (
                                      selectedCar.terms?.map((term, idx) => (<div key={idx} className="flex items-start gap-1.5"><span className="text-[#0071e3] shrink-0 text-xs mt-0.5">•</span><span className="leading-normal">{term}</span></div>))
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                          <div className="border-t border-[#d2d2d7]/20 pt-4 flex items-center justify-between text-[11px] font-semibold text-gray-400 shrink-0">
                            <span>Need customizable plans?</span>
                            <button suppressHydrationWarning type="button" onClick={(e) => { e.stopPropagation(); const phone = "919876543210"; const text = encodeURIComponent(`Hi Support! I am looking at reserving the ${selectedCar.name} at ₹${selectedCar.price.toLocaleString("en-IN")}/day. Can you help me?`); window.open(`https://wa.me/${phone}?text=${text}`, "_blank"); }} className="text-[#0071e3] hover:underline font-bold uppercase tracking-wider text-[9px]">WhatsApp Us</button>
                          </div>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                          <div className="select-none text-left flex justify-between items-center flex-wrap gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Reservation Details</span>
                            <div className="bg-[#f5f5f7] border border-[#d2d2d7]/40 p-0.5 rounded-xl flex text-[9px] font-bold">
                              <button suppressHydrationWarning type="button" onClick={() => setServiceMode("self-drive")} className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${serviceMode === "self-drive" ? "bg-black text-white shadow-xs" : "text-gray-400 hover:text-black"}`}>Self-Drive</button>
                              <button suppressHydrationWarning type="button" onClick={() => setServiceMode("taxi")} className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${serviceMode === "taxi" ? "bg-black text-white shadow-xs" : "text-gray-400 hover:text-black"}`}>Taxi/Driver</button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Pick-up</label>
                              <input suppressHydrationWarning type="date" required value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Return</label>
                              <input suppressHydrationWarning type="date" required value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black" />
                            </div>
                          </div>

                          {serviceMode === "self-drive" && (
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Handover Method</label>
                                <div className="grid grid-cols-2 gap-2 bg-[#f5f5f7] border border-[#d2d2d7]/40 p-1 rounded-xl">
                                  <button suppressHydrationWarning type="button" onClick={() => setHandoverType("hub")} className={`py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${handoverType === "hub" ? "bg-black text-white shadow-xs" : "text-gray-400 hover:text-black"}`}>🏢 Hub Self-Pickup</button>
                                  <button suppressHydrationWarning type="button" onClick={() => setHandoverType("delivery")} className={`py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${handoverType === "delivery" ? "bg-black text-white shadow-xs" : "text-gray-400 hover:text-black"}`}>📍 Doorstep Delivery</button>
                                </div>
                              </div>
                              {handoverType === "delivery" && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5">
                                  <label className="text-[10px] font-bold uppercase text-gray-400 block">Delivery Address in Pune</label>
                                  <input suppressHydrationWarning type="text" placeholder="e.g. Westin Hotel VIP Valet, Koregaon Park" required value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black placeholder-gray-300" />
                                </motion.div>
                              )}
                            </div>
                          )}

                          {serviceMode === "taxi" && (
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Pickup Address</label>
                                <input suppressHydrationWarning type="text" placeholder="e.g. Pune International Airport Terminal 1" required value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#0071e3] placeholder-gray-300" />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Destination Address / City</label>
                                <input suppressHydrationWarning type="text" placeholder="e.g. Baga Beach, North Goa" required value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#0071e3] placeholder-gray-300" />
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Full Name</label>
                            <input suppressHydrationWarning type="text" placeholder="John Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black placeholder-gray-300" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Email Address</label>
                            <input suppressHydrationWarning type="email" placeholder="john@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-black placeholder-gray-300" />
                          </div>

                          {calculateDays() > 0 && selectedCar && (
                            <div className="bg-gray-50 border border-gray-200/60 p-3 rounded-xl space-y-1 font-mono text-[11px] text-gray-500">
                              <div className="flex justify-between"><span>Duration:</span><span className="text-black font-semibold">{calculateDays()} days</span></div>
                              <div className="flex justify-between"><span>Daily rate:</span><span>₹{(serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price).toLocaleString("en-IN")} × {calculateDays()}</span></div>
                              {serviceMode === "taxi" && <div className="flex justify-between text-[10px] text-gray-450"><span>(Base Rate: ₹{selectedCar.price.toLocaleString("en-IN")} + Driver: ₹1,500)</span></div>}
                              <div className="flex justify-between border-t border-gray-200/60 pt-1.5 font-bold text-gray-700"><span>ESTIMATED TOTAL:</span><span>₹{((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays()).toLocaleString("en-IN")}</span></div>
                              <div className="flex justify-between pt-1 border-t border-dashed border-gray-200 text-[#0071e3]"><span>30% BOOKING CHARGE:</span><span className="font-bold">₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}</span></div>
                              <div className="flex justify-between pt-0.5 text-gray-450"><span>70% DUE AT HANDOVER:</span><span className="font-semibold text-black">₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.7).toLocaleString("en-IN")}</span></div>
                            </div>
                          )}
                          <button suppressHydrationWarning type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-xl text-xs tracking-wider uppercase transition cursor-pointer flex justify-center shadow-sm">🔒 Proceed to Pay 30% Online</button>
                        </form>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="razorpay" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="p-8 md:p-10 flex flex-col items-center justify-center font-sans select-none min-h-[480px]">
                      <div className="w-full max-w-md bg-white border border-[#d2d2d7]/50 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col font-sans">
                        <div className="bg-[#0b1f3c] text-white px-6 py-5 flex items-center justify-between text-left">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">⚡ RAZORPAY SECURED</span>
                            <span className="font-bold text-sm text-white mt-0.5">Unique Premium Rentals</span>
                            <span className="text-[10px] text-gray-300 font-mono mt-0.5">{email}</span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="text-[8px] text-gray-400 font-bold uppercase text-right leading-none block mb-0.5">PAYING 30% DEPOSIT</span>
                            <span className="text-base font-bold text-[#3399ff]">₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}</span>
                          </div>
                        </div>

                        {paymentStep === "gateway" && (
                          <div className="p-6 flex flex-col text-left space-y-4">
                            <div className="space-y-1"><span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Select Payment Option</span></div>
                            <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-3">
                              <button suppressHydrationWarning type="button" onClick={() => setSelectedPaymentMethod("upi")} className={`py-2 rounded-xl font-bold text-[9px] uppercase transition ${selectedPaymentMethod === "upi" ? "bg-[#2b6bf3]/10 text-[#2b6bf3] border border-[#2b6bf3]" : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black cursor-pointer"}`}>📱 UPI / QR</button>
                              <button suppressHydrationWarning type="button" onClick={() => setSelectedPaymentMethod("card")} className={`py-2 rounded-xl font-bold text-[9px] uppercase transition ${selectedPaymentMethod === "card" ? "bg-[#2b6bf3]/10 text-[#2b6bf3] border border-[#2b6bf3]" : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black cursor-pointer"}`}>💳 CARD</button>
                              <button suppressHydrationWarning type="button" onClick={() => setSelectedPaymentMethod("netbanking")} className={`py-2 rounded-xl font-bold text-[9px] uppercase transition ${selectedPaymentMethod === "netbanking" ? "bg-[#2b6bf3]/10 text-[#2b6bf3] border border-[#2b6bf3]" : "bg-gray-50 border border-gray-200 text-gray-500 hover:text-black cursor-pointer"}`}>🏦 NETBANK</button>
                            </div>

                            <AnimatePresence mode="wait">
                              {selectedPaymentMethod === "upi" && (
                                <motion.div key="upi" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3 pt-1">
                                  <div>
                                    <label className="text-[9px] font-bold text-gray-400 uppercase">Enter Virtual Payment Address (VPA)</label>
                                    <input suppressHydrationWarning type="text" placeholder="john@okaxis" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#2b6bf3] placeholder-gray-300" />
                                  </div>
                                  <div className="flex gap-2">
                                    <button suppressHydrationWarning type="button" onClick={() => setUpiId("paytm@gpay")} className="bg-gray-50 hover:bg-gray-100 text-[10px] font-medium text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200 cursor-pointer">GPay VPA</button>
                                    <button suppressHydrationWarning type="button" onClick={() => setUpiId("success@razorpay")} className="bg-gray-50 hover:bg-gray-100 text-[10px] font-medium text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200 cursor-pointer">Auto-Fill Test</button>
                                  </div>
                                  <div className="text-[10px] text-gray-400 leading-normal font-medium bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">ℹ️ Enter any simulated handle to trigger confirmation.</div>
                                </motion.div>
                              )}

                              {selectedPaymentMethod === "card" && (
                                <motion.div key="card" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3 pt-1">
                                  <div>
                                    <label className="text-[9px] font-bold text-gray-400 uppercase">Card Number</label>
                                    <input suppressHydrationWarning type="text" placeholder="4111 2222 3333 4444" maxLength={19} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#2b6bf3] placeholder-gray-300 font-mono" />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="text-[9px] font-bold text-gray-400 uppercase">Expiry (MM/YY)</label>
                                      <input suppressHydrationWarning type="text" placeholder="12/29" maxLength={5} value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#2b6bf3] placeholder-gray-300 font-mono" />
                                    </div>
                                    <div>
                                      <label className="text-[9px] font-bold text-gray-400 uppercase">CVV</label>
                                      <input suppressHydrationWarning type="password" placeholder="•••" maxLength={3} value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-black focus:outline-none focus:border-[#2b6bf3] placeholder-gray-300 font-mono" />
                                    </div>
                                  </div>
                                  <button suppressHydrationWarning type="button" onClick={() => { setCardNumber("4111 1111 1111 1111"); setCardExpiry("12/30"); setCardCvv("123"); }} className="text-[10px] text-[#0071e3] font-semibold hover:underline block text-right cursor-pointer">Use Demo Visa Card</button>
                                </motion.div>
                              )}

                              {selectedPaymentMethod === "netbanking" && (
                                <motion.div key="netbanking" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3 pt-1">
                                  <span className="text-[10px] text-gray-400 block font-medium">Select major simulated banks:</span>
                                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
                                    <button suppressHydrationWarning type="button" onClick={handleSimulatePayment} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer">🏦 SBI Bank</button>
                                    <button suppressHydrationWarning type="button" onClick={handleSimulatePayment} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer">🏦 HDFC Bank</button>
                                    <button suppressHydrationWarning type="button" onClick={handleSimulatePayment} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer">🏦 ICICI Bank</button>
                                    <button suppressHydrationWarning type="button" onClick={handleSimulatePayment} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer">🏦 Axis Bank</button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {selectedPaymentMethod !== "netbanking" && (
                              <button suppressHydrationWarning type="button" onClick={handleSimulatePayment} className="w-full mt-4 bg-[#2b6bf3] hover:bg-[#1a56cf] text-white font-bold py-3 rounded-2xl text-xs tracking-wider uppercase transition cursor-pointer flex justify-center items-center gap-1 shadow-md shadow-blue-500/10">🔒 Securely Pay ₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}</button>
                            )}
                            <button suppressHydrationWarning type="button" onClick={() => setIsPaying(false)} className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-wider transition pt-1 cursor-pointer">Go Back to Reservation Details</button>
                          </div>
                        )}

                        {paymentStep === "processing" && (
                          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[280px]">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2b6bf3] rounded-full animate-spin" />
                            <div className="space-y-1">
                              <h4 className="font-bold text-sm text-black">Contacting secure bank gateway...</h4>
                              <p className="text-[10px] text-gray-400 font-medium">Please do not press back button or refresh the page.</p>
                            </div>
                          </div>
                        )}

                        {paymentStep === "success" && (
                          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[280px]">
                            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border-2 border-emerald-500"><Check size={24} strokeWidth={3} /></div>
                            <div className="space-y-1">
                              <h4 className="font-bold text-sm text-emerald-600">Payment Secured Successfully</h4>
                              <p className="text-[10px] text-gray-400 font-mono">ID: {paymentId}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-10 text-center flex flex-col items-center justify-center space-y-5 select-none">
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center"><ShieldCheck size={32} /></div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono">RESERVATION SECURED</span>
                      <h3 className="text-2xl font-bold text-black mt-1">Booking Confirmed!</h3>
                      <p className="text-gray-500 text-xs mt-2 max-w-md mx-auto leading-relaxed">Thank you, <span className="font-bold text-black">{fullName}</span>. Your premium rental booking for the <span className="font-bold text-black">{selectedCar.name}</span> is successfully processed.</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 max-w-sm w-full space-y-2 text-xs font-sans text-left">
                      <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-1.5">Payment Summary</h4>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Service Mode:</span>
                        <span className="font-semibold text-black uppercase text-[10px]">{serviceMode === "taxi" ? "Taxi" : "Self-Drive Rental"}</span>
                      </div>
                      {serviceMode === "self-drive" && (
                        <div className="flex justify-between text-gray-400 text-[10px]">
                          <span>Handover:</span>
                          <span className="font-semibold text-black uppercase text-[10px]">{handoverType === "delivery" ? `Delivery` : "Hub Pickup"}</span>
                        </div>
                      )}
                      {serviceMode === "self-drive" && handoverType === "delivery" && (
                        <div className="flex justify-between text-gray-400 text-[10px]">
                          <span>Address:</span>
                          <span className="font-medium truncate max-w-[200px] text-black">{deliveryAddress}</span>
                        </div>
                      )}
                      {serviceMode === "taxi" && (
                        <>
                          <div className="flex justify-between text-gray-400 text-[10px]">
                            <span>Pickup:</span>
                            <span className="font-medium truncate max-w-[200px]">{pickupAddress}</span>
                          </div>
                          <div className="flex justify-between text-gray-400 text-[10px]">
                            <span>Destination:</span>
                            <span className="font-medium truncate max-w-[200px]">{destinationAddress}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Service Cost:</span>
                        <span className="font-semibold text-black">₹{((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays()).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>30% Advanced Paid:</span>
                        <span className="font-bold">₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.3).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-medium">
                        <span>70% Balance Due on Handover:</span>
                        <span className="font-bold text-black">₹{Math.round((serviceMode === "taxi" ? selectedCar.price + 1500 : selectedCar.price) * calculateDays() * 0.7).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 text-[10px] text-gray-400 font-mono space-y-0.5">
                        <div>REF CODE: <span className="font-semibold text-black">{refCode}</span></div>
                        <div>RAZORPAY ID: <span className="font-semibold text-[#0071e3]">{paymentId}</span></div>
                      </div>
                    </div>

                    <button suppressHydrationWarning onClick={resetBookingForm} className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer transition">Done</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

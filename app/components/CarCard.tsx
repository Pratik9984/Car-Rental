"use client";

import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Car } from "../page";

const fadeUp: Variants = {
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

interface CarCardProps {
  car: Car;
  serviceMode: "self-drive" | "taxi";
  onClick: () => void;
  className?: string;
}

export default function CarCard({ car, serviceMode, onClick, className = "" }: CarCardProps) {
  const pricePerDay = serviceMode === "taxi" ? car.price + 1500 : car.price;

  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      className={`bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition duration-300 flex flex-col justify-between cursor-pointer group ${className}`}
    >
      <div className="space-y-4">
        <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center relative">
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white font-bold tracking-wider text-[9px] uppercase px-2.5 py-1 rounded-full">
            {car.category}
          </div>
        </div>

        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-black text-base group-hover:text-[#0071e3] transition">
              {car.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                {car.specs.transmission}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                ⚡ {car.specs.mileage}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-sm font-bold text-black">
              ₹{pricePerDay.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-gray-400 block font-medium mt-0.5">
              / day {serviceMode === "taxi" && "(with Driver)"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <button
          suppressHydrationWarning
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-2xl text-[11px] font-semibold tracking-wider uppercase transition cursor-pointer flex items-center justify-center shadow-sm"
        >
          Book Now
        </button>
        <button
          suppressHydrationWarning
          onClick={(e) => {
            e.stopPropagation();
            const phone = "919876543210";
            const text = encodeURIComponent(
              `Hi Unique Rentals! I would love to ask about availability and booking details for the ${car.name} (${car.category}) at ₹${pricePerDay.toLocaleString("en-IN")}/day.`
            );
            window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
          }}
          className="w-full text-center text-xs font-semibold text-gray-500 hover:text-black transition cursor-pointer flex items-center justify-center gap-1 py-1"
        >
          Inquire via WhatsApp <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const isHome = pathname === "/";

  const handleNavClick = (e: React.MouseEvent, elementId: string, fallbackHref: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "🚘 Our Fleet", id: "fleet-section", href: "/cars" },
    { label: "How it Works", id: "how-it-works-section", href: "/#how-it-works-section" },
    { label: "Features", id: "features-section", href: "/#features-section" },
    { label: "Our Hubs", id: "showroom-section", href: "/#showroom-section" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto w-full z-[10002] relative"
      >
        <Link href="/" className="text-2xl font-bold tracking-tighter z-[10002] relative cursor-pointer text-black">
          Unique
        </Link>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id, link.href)}
              className={`text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer ${
                pathname === link.href ? "text-black font-bold border-b-2 border-black pb-0.5" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/about"
            className={`text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer ${
              pathname === "/about" ? "text-black font-bold border-b-2 border-black pb-0.5" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`text-gray-500 hover:text-black transition font-semibold text-xs cursor-pointer ${
              pathname === "/contact" ? "text-black font-bold border-b-2 border-black pb-0.5" : ""
            }`}
          >
            Contact Us
          </Link>
        </div>

        {/* Social Connect Icons & App Download */}
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
        <button
          suppressHydrationWarning
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 right-0 h-screen bg-white/95 backdrop-blur-xl z-[10000] flex flex-col px-10 pt-28 space-y-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-xl font-bold text-left tracking-tight">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, link.href)}
                  className={`py-2 border-b border-gray-100 cursor-pointer ${
                    pathname === link.href ? "text-black font-bold" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 border-b border-gray-100 cursor-pointer ${
                  pathname === "/about" ? "text-black font-bold" : "text-gray-500 hover:text-black"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 border-b border-gray-100 cursor-pointer ${
                  pathname === "/contact" ? "text-black font-bold" : "text-gray-500 hover:text-black"
                }`}
              >
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
              <button
                suppressHydrationWarning
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 bg-black text-white px-6 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-sm cursor-pointer"
              >
                <Download size={18} /> Download App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
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
              <input
                suppressHydrationWarning
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
  );
}

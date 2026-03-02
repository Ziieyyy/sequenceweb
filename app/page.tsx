"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Preloader from "@/components/Preloader";
import TextReveal from "@/components/TextReveal";

// --- Components for Sections ---

const AboutSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 md:px-20 relative bg-[#0a0a0c]">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-sm md:text-base text-[#d4af37] tracking-[0.3em] uppercase mb-8">
          The Philosophy
        </h2>
        <div className="text-4xl md:text-7xl font-light leading-[1.1] text-neutral-200">
          <TextReveal>PArfums is not worn. It is experienced.</TextReveal>
        </div>
        <div className="mt-12 max-w-2xl text-lg md:text-xl text-neutral-400 font-light leading-relaxed ml-auto">
          <p>
            We believe that scent is an invisible architecture. It constructs memories,
            evokes emotions, and defines the space you inhabit. Our fragrances are
            sculpted from the finest raw materials, designed to linger like a
            beautiful thought.
          </p>
        </div>
      </div>
    </section>
  );
};

const BentoSection = () => {
  return (
    <section className="min-h-screen py-20 px-4 md:px-12 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {/* Large Card */}
        <div className="md:col-span-2 row-span-1 md:row-span-2 relative group overflow-hidden rounded-sm bg-neutral-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full bg-neutral-800"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#3e2f18] to-[#1a0f1a]" />
          </motion.div>
          <div className="absolute bottom-8 left-8 z-20">
            <h3 className="text-3xl font-light text-white mb-2">Rare Ingredients</h3>
            <p className="text-neutral-400 text-sm tracking-wide uppercase">SOURCED FROM GRASSE, FRANCE</p>
          </div>
        </div>

        {/* Small Card 1 */}
        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-sm bg-neutral-900">
          <div className="absolute inset-0 bg-neutral-800/20 group-hover:bg-neutral-800/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 blur-xl group-hover:blur-2xl transition-all duration-700" />
          </div>
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="text-xl font-light text-white">Glass Artistry</h3>
          </div>
        </div>

        {/* Small Card 2 */}
        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-sm bg-neutral-900 border border-white/5">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-5xl mb-4">✨</span>
            <p className="text-neutral-300 font-light">"A symphony of light and shadow in every bottle."</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatItem = ({ label, value, suffix = "" }: { label: string, value: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, { duration: 2000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center py-12 border-t border-white/10">
      <div className="text-6xl md:text-8xl font-light text-white mb-4">
        {displayValue}{suffix}
      </div>
      <div className="text-sm tracking-[0.2em] text-neutral-500 uppercase">
        {label}
      </div>
    </div>
  )
}

const StatsSection = () => {
  return (
    <section className="py-20 px-6 bg-[#0a0a0c]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <StatItem label="Years of Craft" value={25} />
        <StatItem label="Global Boutiques" value={120} suffix="+" />
        <StatItem label="Client Satisfaction" value={98} suffix="%" />
      </div>
    </section>
  );
}

const TestimonialsSection = () => {
  return (
    <section className="h-screen flex items-center justify-center relative bg-[#0f0f12] overflow-hidden">
      {/* Background blurred elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <p className="text-3xl md:text-5xl font-light italic leading-relaxed text-neutral-300">
          "An olfactory masterpiece. PArfums transcends the ordinary, creating a scent that feels like a memory you haven't lived yet."
        </p>
        <div className="mt-12">
          <p className="text-sm tracking-widest uppercase text-[#d4af37]">Vogue International</p>
        </div>
      </div>
    </section>
  )
}

const CTASection = () => {
  return (
    <section className="h-[80vh] flex flex-col items-center justify-center relative bg-[#0a0a0c] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-10 text-center px-6">
        <h2 className="text-6xl md:text-9xl font-light tracking-tighter mb-8 text-white">
          Find Your<br />Signature
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-white text-black rounded-full text-lg tracking-widest uppercase hover:bg-[#d4af37] transition-colors duration-300"
        >
          Explore Collection
        </motion.button>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-20 bg-black text-neutral-500 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <h3 className="text-2xl text-white font-bold uppercase mb-8">PArfums</h3>
          <div className="space-y-4 text-sm tracking-wide">
            <p>Paris • New York • Tokyo</p>
            <p>© 2024 PArfums. All rights reserved.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm tracking-widest uppercase">
          <div className="space-y-4">
            <span className="block text-white mb-4">Explore</span>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Collection</a>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">About</a>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Journal</a>
          </div>
          <div className="space-y-4">
            <span className="block text-white mb-4">Support</span>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Contact</a>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Shipping</a>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Returns</a>
          </div>
          <div className="space-y-4">
            <span className="block text-white mb-4">Legal</span>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Privacy</a>
            <a href="#" className="block hover:text-[#d4af37] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleProgress = (val: number) => {
    setProgress(val);
  };

  const handleLoadComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <main className="relative bg-[#0a0a0c] min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader progress={progress} />}
      </AnimatePresence>

      <Navbar />

      <SequenceScroll onProgress={handleProgress} onLoadComplete={handleLoadComplete} />

      <div className="-mt-[100vh] relative z-10 bg-[#0a0a0c]">
        <AboutSection />
        <BentoSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}

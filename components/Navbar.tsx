"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Collection", "Our Story", "Ingredients", "Boutiques"];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-40 px-6 py-8 md:px-12 flex justify-between items-center text-white mix-blend-difference">
                <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight uppercase relative z-50">
                    PArfums
                </Link>

                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 text-sm tracking-[0.2em] uppercase font-medium z-50"
                >
                    <span className="hidden md:inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        Menu
                    </span>
                    <div className="flex flex-col gap-1.5 items-end">
                        <span className="block w-8 h-[1px] bg-white transition-all duration-300 group-hover:w-10" />
                        <span className="block w-5 h-[1px] bg-white transition-all duration-300 group-hover:w-10" />
                    </div>
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-50 bg-[#0a0a0c] text-[#ededed] flex flex-col justify-center items-center"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-6 md:right-12 text-sm tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity"
                        >
                            Close
                        </button>

                        <div className="space-y-4 md:space-y-8 text-center">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href="#"
                                        className="block text-5xl md:text-8xl font-light tracking-tight hover:italic hover:text-[#d4af37] transition-all duration-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="absolute bottom-12 flex gap-8 text-xs tracking-widest uppercase opacity-50"
                        >
                            <Link href="#">Instagram</Link>
                            <Link href="#">Twitter</Link>
                            <Link href="#">Contact</Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

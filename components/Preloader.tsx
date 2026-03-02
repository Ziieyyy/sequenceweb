"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
    progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let animationFrameId: number;

        // Smoothly animate the percentage towards the target progress
        const animate = () => {
            setPercent(prev => {
                const diff = progress - prev;
                if (diff <= 0.5) return progress;
                return prev + diff * 0.1;
            });

            if (percent < progress) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [progress, percent]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0a0a0c] text-[#ededed]"
        >
            <div className="w-full max-w-sm px-8 flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.2em] mb-8 uppercase text-center">
                    PArfums
                </h1>

                <div className="w-full h-[1px] bg-[#333] relative overflow-hidden mb-4">
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 bg-[#d4af37] w-full origin-left"
                        style={{ scaleX: percent / 100 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                </div>

                <div className="flex justify-between w-full text-xs font-mono text-neutral-500 tracking-widest uppercase">
                    <span>Loading Experience</span>
                    <span>{Math.floor(percent)}%</span>
                </div>
            </div>
        </motion.div>
    );
}

"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 240;

interface SequenceScrollProps {
    onProgress?: (progress: number) => void;
    onLoadComplete?: () => void;
}

export default function SequenceScroll({ onProgress, onLoadComplete }: SequenceScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Load images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        const loadImages = async () => {
            const promises = [];
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                const p = new Promise<void>((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        if (onProgress) onProgress((loadedCount / FRAME_COUNT) * 100);
                        resolve();
                    };
                    img.onerror = () => {
                        // Fallback: just count it as loaded (will draw placeholder)
                        console.warn(`Failed to load frame ${i}`);
                        loadedCount++;
                        if (onProgress) onProgress((loadedCount / FRAME_COUNT) * 100);
                        resolve();
                    };
                    // Adjust path if needed
                    img.src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
                });
                imgs.push(img);
                promises.push(p);
            }

            await Promise.all(promises);
            setImages(imgs);
            setLoaded(true);
            if (onLoadComplete) onLoadComplete();
        };

        loadImages();
    }, []); // Run once

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // High DPI
        const dpr = window.devicePixelRatio || 1;
        // Check if canvas size matches display size
        const rect = canvas.getBoundingClientRect();
        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.scale(dpr, dpr);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const frameIdx = Math.max(0, Math.min(Math.floor(index) - 1, FRAME_COUNT - 1));
        const img = images[frameIdx];

        // Clear
        // ctx.clearRect(0, 0, rect.width, rect.height); // Not needed if we fill screen

        const w = rect.width;
        const h = rect.height;

        if (img && img.naturalWidth > 0) {
            // Draw Cover
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = w / h;

            let drawW, drawH, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawW = w;
                drawH = w / imgRatio;
                offsetX = 0;
                offsetY = (h - drawH) / 2;
            } else {
                drawH = h;
                drawW = h * imgRatio;
                offsetX = (w - drawW) / 2;
                offsetY = 0;
            }

            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        } else {
            // Fallback Rendering
            // Gradient based on index
            const t = index / FRAME_COUNT;
            const gradient = ctx.createLinearGradient(0, 0, 0, h);

            // Interpolate colors approximately
            if (t < 0.33) {
                // Mist
                gradient.addColorStop(0, "#2c2c30");
                gradient.addColorStop(1, "#0a0a0c");
            } else if (t < 0.66) {
                // Liquid
                gradient.addColorStop(0, "#3e2f18");
                gradient.addColorStop(1, "#0a0a0c");
            } else {
                // Bottle
                gradient.addColorStop(0, "#191f24");
                gradient.addColorStop(1, "#0a0a0c");
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            // Draw centered text
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.font = "bold 100px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`FRAME ${Math.floor(index)}`, w / 2, h / 2);
        }
    }, [images]);

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (loaded) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Initial draw
    useEffect(() => {
        if (loaded) renderFrame(1);
    }, [loaded, renderFrame]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#0a0a0c]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <SequenceOverlays progress={scrollYProgress} />
            </div>
        </div>
    );
}

function SequenceOverlays({ progress }: { progress: any }) {
    const opacity1 = useTransform(progress, [0, 0.15], [1, 0]);
    const y1 = useTransform(progress, [0, 0.15], [0, -50]);

    const opacity2 = useTransform(progress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const x2 = useTransform(progress, [0.2, 0.3, 0.4], [-50, 0, 50]);

    const opacity3 = useTransform(progress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const x3 = useTransform(progress, [0.5, 0.6, 0.7], [50, 0, -50]);

    const opacity4 = useTransform(progress, [0.85, 0.95], [0, 1]);
    const scale4 = useTransform(progress, [0.85, 0.95], [0.9, 1]);

    return (
        <div className="absolute inset-0 pointer-events-none">

            {/* 0% Center */}
            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-6 bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                    The Essence of Presence
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide uppercase">
                    A fragrance born from light and shadow
                </p>
            </motion.div>

            {/* 30% Left */}
            <motion.div style={{ opacity: opacity2, x: x2 }} className="absolute inset-0 flex items-center justify-start pl-10 md:pl-24">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-7xl font-light leading-[1.1] text-neutral-200">
                        Invisible.<br />Unforgettable.
                    </h2>
                </div>
            </motion.div>

            {/* 60% Right */}
            <motion.div style={{ opacity: opacity3, x: x3 }} className="absolute inset-0 flex items-center justify-end pr-10 md:pr-24 text-right">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-light leading-[1.1] text-neutral-200">
                        Crafted from rare notes<br />and timeless artistry.
                    </h2>
                </div>
            </motion.div>

            {/* 90% Center CTA */}
            <motion.div style={{ opacity: opacity4, scale: scale4 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
                <h2 className="text-5xl md:text-7xl font-light mb-10 text-neutral-100">Discover PArfums</h2>
                <button className="group relative px-10 py-5 overflow-hidden rounded-full border border-neutral-700 bg-transparent text-neutral-300 transition-all hover:border-gold-highlight hover:text-gold-highlight">
                    <span className="relative z-10 text-lg tracking-[0.2em] font-medium">ENTER THE SCENT</span>
                    <div className="absolute inset-0 -translate-x-[101%] bg-white/5 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
            </motion.div>
        </div>
    )
}

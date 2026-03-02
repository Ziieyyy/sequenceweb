"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
    const elementRef = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: ["start 0.9", "start 0.25"],
    });

    const chars = children.split("");

    return (
        <p ref={elementRef} className={`flex flex-wrap ${className}`}>
            {chars.map((char, i) => {
                const start = i / chars.length;
                const end = start + 1 / chars.length;
                // Character specific transforms
                // We can create a separate component for each char to isolate hook usage
                // or loop hooks (hooks must be consistent, can't loop if length is dynamic? 
                // No, map inside render is fine as long as array length is stable or keyed properly. However, rules of hooks apply.
                // Creating useTransform inside a loop is technically risky if children change, but since children is prop, useMemo might needed.
                // Actually, creating a sub-component for each char is safer.
                return (
                    <Char key={i} progress={scrollYProgress} range={[start, end]} char={char} />
                );
            })}
        </p>
    );
}

const Char = ({ progress, range, char }: { progress: any; range: [number, number]; char: string }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    const y = useTransform(progress, range, [20, 0]); // Vertical translate per character

    return (
        <motion.span style={{ opacity, y }} className="inline-block whitespace-pre">
            {char}
        </motion.span>
    );
};

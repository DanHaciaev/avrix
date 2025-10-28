"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
    text: string;
    highlightWords?: number; // сколько слов сделать другим цветом
}

export default function AnimatedText({ text, highlightWords = 0 }: AnimatedTextProps) {
    const [words, setWords] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => setWords(text.split(" ")), [text]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <p ref={ref} className="text-[51px] text-[#808080] font-light flex flex-wrap">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`inline-block mr-2 ${index < highlightWords ? "text-[#0d0d0d]" : "text-[#808080]"} opacity-0`}
                    style={{
                        animationName: isVisible ? "fadeIn" : undefined,
                        animationDuration: isVisible ? "0.3s" : undefined,
                        animationFillMode: isVisible ? "forwards" : undefined,
                        animationDelay: isVisible ? `${index * 0.1}s` : undefined,
                    }}
                >
                    {word}
                </span>
            ))}

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </p>
    );
}

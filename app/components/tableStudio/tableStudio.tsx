"use client";

import { useEffect, useRef, useState } from "react";

export default function TableStudio() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (rootRef.current) observer.observe(rootRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={rootRef} className="flex flex-col gap-[50px]">
            {/* ANIMATED TITLE */}
            <p
                className={`text-[36px] text-[#0d0d0d] transition-all duration-700 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                Awards
            </p>

            {/* TABLE WITHOUT ANIMATION */}
            <div className="w-full">
                <div className="grid grid-cols-1 text-lg text-[#0d0d0d]">

                    {/* HEADER */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 py-5 border-b border-black text-[#333] opacity-[.4] font-medium uppercase">
                        <p>Year</p>
                        <p>Project</p>
                        <p>Award</p>
                    </div>

                    {/* ROWS */}
                    {[
                        ["2025", "Fjordline", "Nordic Architecture Prize"],
                        ["2023", "Inner Garden", "European Design House Awards"],
                        ["2021", "Cala Sol", "Mediterranean Architecture Showcase"],
                        ["2019", "Haus Schnee", "Alpine Modern Architecture Prize"],
                    ].map((row, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-3 md:grid-cols-4 items-center gap-4 py-5 border-b border-black"
                        >
                            <p>{row[0]}</p>
                            <p>{row[1]}</p>
                            <p>{row[2]}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

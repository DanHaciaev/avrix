"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TeamSection() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (rootRef.current) observer.observe(rootRef.current);

        return () => observer.disconnect();
    }, []);

    const team = [
        { src: "/woman1.avif", name: "Nora Talin", role: "Architect & Founder" },
        { src: "/man1.avif", name: "Henrik Schaal", role: "Architect & Partner" },
        { src: "/woman2.avif", name: "Elena Vargas", role: "Creative Director" },
        { src: "/man2.avif", name: "Lukas Mertens", role: "3D Visualizer" },
    ];

    return (
        <div ref={rootRef} className="flex flex-col gap-[50px]">

            {/* ANIMATED TITLE */}
            <p
                className={`text-[36px] text-[#0d0d0d] transition-all duration-700 transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                Ideas Begin With Us
            </p>

            <div className="flex gap-2.5">

                {team.map((person, i) => (
                    <div
                        key={i}
                        className={`max-w-[350px] w-full flex flex-col gap-2.5 transition-all duration-700 transform
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        style={{ transitionDelay: `${(i + 1) * 0.2}s` }} // ✅ задержка 0.5s между блоками
                    >
                        <div className="relative w-[350px] h-[350px]">
                            <Image
                                src={person.src}
                                alt={person.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-lg">{person.name}</p>
                            <p className="text-lg text-[#333333] italic opacity-[.4]">{person.role}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

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
        { src: "/nora.avif", name: "Nora Talin", role: "Architect & Founder" },
        { src: "/henrik.avif", name: "Henrik Schaal", role: "Architect & Partner" },
        { src: "/elena.avif", name: "Elena Vargas", role: "Creative Director" },
        { src: "/lukas.avif", name: "Lukas Mertens", role: "3D Visualizer" },
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

            <div className="flex flex-col gap-5 md:flex-row md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-10 3xl:flex! 3xl:flex-row 3xl:gap-2.5">

                {team.map((person, i) => (
                    <div
                        key={i}
                        className={`flex flex-col gap-2.5 transition-all md:max-w-[673px] 3xl:max-w-[350px] w-full 3xl:min-h-[350px] duration-700 transform
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        style={{ transitionDelay: `${(i + 1) * 0.2}s` }}
                    >
                        <div className="relative w-full aspect-square md:max-w-[700px] 3xl:max-w-[350px]">
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
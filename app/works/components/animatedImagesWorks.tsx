"use client";

import { useEffect, useRef, useState } from "react";
import { worksData } from "@/app/data/worksData";
import Link from "next/link";

export default function AnimatedImagesWorks() {
    const useInView = (threshold = 0.3) => {
        const ref = useRef<HTMLDivElement>(null);
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                },
                { threshold }
            );

            if (ref.current) observer.observe(ref.current);

            return () => observer.disconnect();
        }, [threshold]);

        return { ref, isVisible };
    };

    // Разбиваем работы на группы 2–1–2
    const groups = [
        worksData.slice(0, 2), // первые 2
        worksData.slice(2, 3), // третья
        worksData.slice(3, 5), // две последние
    ];

    // Создаём refs для трёх секций
    const { ref: ref1, isVisible: visible1 } = useInView();
    const { ref: ref2, isVisible: visible2 } = useInView();
    const { ref: ref3, isVisible: visible3 } = useInView();

    const visibility = [visible1, visible2, visible3];
    const refs = [ref1, ref2, ref3];

    return (
        <section className="flex flex-col gap-5 py-[90px] max-w-[1440px] mx-auto">

            {groups.map((group, index) => (
                <div
                    key={index}
                    ref={refs[index]}
                    className={`flex gap-5 transition-all duration-1000 ease-out
                        ${visibility[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                    `}
                >
                    {group.map((item) => (
                        <Link key={item.slug} href={`/works/${item.slug}`} className="block flex-1">
                            <div

                                className="bg-cover bg-center bg-no-repeat flex-1 h-[700px] flex items-center relative transition-transform duration-500 
                                       ease-out hover:scale-[0.98]"
                                style={{ backgroundImage: `url(${item.mainImage})` }}
                            >
                                <div className="absolute inset-0 bg-linear-to-t from-black to-black/5"></div>

                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                                    <p className="text-white text-[36px]">{item.title}</p>
                                    <p className="text-[#E5E5E5] text-lg opacity-[.4]">{item.year}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}

        </section>
    );
}

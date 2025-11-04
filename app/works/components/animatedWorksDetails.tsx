"use client";

import { useEffect, useRef, useState } from "react";
import { worksData } from "@/app/data/worksData";
import Link from "next/link";

export default function AnimatedWorksDetails({ project }: { project: any }) {
    // Хук для отслеживания видимости
    const useInView = (threshold = 0.3) => {
        const ref = useRef<HTMLDivElement>(null);
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target); // разовая анимация
                    }
                },
                { threshold }
            );

            if (ref.current) observer.observe(ref.current);

            return () => observer.disconnect();
        }, [threshold]);

        return { ref, isVisible };
    };

    // Создаем ref для каждого блока
    const { ref: ref1, isVisible: visible1 } = useInView(0.3);
    const { ref: ref2, isVisible: visible2 } = useInView(0.3);
    const { ref: ref3, isVisible: visible3 } = useInView(0.3);
    const { ref: ref4, isVisible: visible4 } = useInView(0.3);


    const index = worksData.findIndex(w => w.slug === project.slug);

    const prev = index > 0 ? worksData[index - 1] : null;
    const next = index < worksData.length - 1 ? worksData[index + 1] : null;


    return (
        <section className="flex flex-col gap-5 max-w-[1440px] mx-auto relative">

            {/* Первый блок с двумя фото */}
            <div
                ref={ref1}
                className={`flex gap-5 transition-all duration-1000 ease-out ${visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div
                    className="bg-cover bg-center h-[600px] flex-1"
                    style={{ backgroundImage: `url(${project.gallery[0]})` }}
                />

                <div
                    className="bg-cover bg-center h-[600px] flex-1"
                    style={{ backgroundImage: `url(${project.gallery[1]})` }}
                />
            </div>

            {/* Второй блок - одно фото */}
            <div
                ref={ref2}
                className={`transition-all duration-1000 ease-out ${visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div
                    className="bg-cover bg-center h-[700px]"
                    style={{ backgroundImage: `url(${project.gallery[2]})` }}
                />
            </div>

            {/* Третий блок с двумя фото */}
            <div
                ref={ref3}
                className={`flex gap-5 transition-all duration-1000 ease-out ${visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div
                    className="bg-cover bg-center h-[600px] flex-1"
                    style={{ backgroundImage: `url(${project.gallery[3]})` }}
                />

                <div
                    className="bg-cover bg-center h-[600px] flex-1"
                    style={{ backgroundImage: `url(${project.gallery[4]})` }}
                />
            </div>

            {/* Четвёртый блок - одно фото, такое же как второй */}
            <div
                ref={ref4}
                className={`transition-all duration-1000 ease-out ${visible4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div
                    className="bg-cover bg-center h-[600px] flex-1"
                    style={{ backgroundImage: `url(${project.gallery[5]})` }}
                />
            </div>




            <div className="flex items-center justify-between max-w-[660px] w-full mx-auto mt-[70px]">

                {prev ? (
                    <Link href={`/works/${prev.slug}`} className="text-[26px]">
                        ‹ {prev.title}
                    </Link>
                ) : <div />}

                {next && (
                    <Link href={`/works/${next.slug}`} className="text-[26px]">
                        {next.title} ›
                    </Link>
                )}

            </div>


        </section>
    );
}

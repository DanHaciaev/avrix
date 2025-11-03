"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AnimatedImagesWorks() {
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

    return (
        <section className="flex flex-col gap-5 py-[90px] max-w-[1440px] mx-auto relative">

            {/* Первый блок с двумя фото */}
            <div
                ref={ref1}
                className={`flex gap-5 transition-all duration-1000 ease-out ${visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div className="bg-[url(/house1.avif)] bg-cover bg-center bg-no-repeat max-w-[860px] w-full h-[600px] flex items-center relative"></div>

                <div className="bg-[url(/house2.avif)] bg-cover bg-center bg-no-repeat max-w-[564px] w-full h-[600px] flex items-center relative"></div>
            </div>

            {/* Второй блок - одно фото */}
            <div
                ref={ref2}
                className={`transition-all duration-1000 ease-out ${visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div className="bg-[url(/house3.avif)] bg-cover bg-center bg-no-repeat h-[700px] flex items-center relative"></div>
            </div>

            {/* Третий блок с двумя фото */}
            <div
                ref={ref3}
                className={`flex gap-5 transition-all duration-1000 ease-out ${visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div className="bg-[url(/main.avif)] bg-cover bg-center bg-no-repeat max-w-[860px] w-full h-[600px] flex items-center relative"></div>

                <div className="bg-[url(/house4.avif)] bg-cover bg-center bg-no-repeat max-w-[564px] w-full h-[600px] flex items-center relative"></div>
            </div>

            {/* Четвёртый блок - одно фото, такое же как второй */}
            <div
                ref={ref4}
                className={`transition-all duration-1000 ease-out ${visible4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <div className="bg-[url(/main.avif)] bg-cover bg-center bg-no-repeat h-[700px] flex items-center relative"></div>
            </div>


            <Link href="/works" className="absolute bottom-0 left-[65%] -translate-1/2 text-[26px]">
                Inner Garden ›
            </Link>

        </section>
    );
}

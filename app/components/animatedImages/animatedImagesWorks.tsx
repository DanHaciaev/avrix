"use client";

import { useEffect, useRef, useState } from "react";

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

    return (
        <section className="flex flex-col gap-5 py-[90px] max-w-[1440px] mx-auto">

            {/* Первый блок с двумя фото */}
            <div
                ref={ref1}
                className={`flex gap-5 transition-all duration-1000 ease-out ${visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="bg-[url(/house1.avif)] bg-cover bg-center bg-no-repeat flex-1 h-[700px] flex items-center relative transition-transform duration-500 ease-out hover:scale-[0.98]">
                    <div className="absolute inset-0 bg-linear-to-t from-black to-black/5"></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                        <p className="text-white text-[36px]">Fjordline</p>
                        <p className="text-[#E5E5E5] text-lg opacity-[.4]">2025</p>
                    </div>
                </div>

                <div className="bg-[url(/house2.avif)] bg-cover bg-center bg-no-repeat flex-1 h-[700px] flex items-center relative">
                    <div className="absolute inset-0 bg-linear-to-t from-black to-black/5"></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                        <p className="text-white text-[36px]">Inner Garden</p>
                        <p className="text-[#E5E5E5] text-lg opacity-[.4]">2022</p>
                    </div>
                </div>
            </div>

            {/* Второй блок */}
            <div
                ref={ref2}
                className={`transition-all duration-1000 ease-out ${visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="bg-[url(/house3.avif)] bg-cover bg-center bg-no-repeat h-[700px] flex items-center relative">
                    <div className="absolute inset-0 bg-linear-to-t from-black to-black/5"></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                        <p className="text-white text-[36px]">Cala Sol</p>
                        <p className="text-[#E5E5E5] text-lg opacity-[.4]">2021</p>
                    </div>
                </div>
            </div>

            {/* Третий блок с двумя фото */}
            <div
                ref={ref3}
                className={`flex gap-5 transition-all duration-1000 ease-out ${visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="bg-[url(/main.avif)] bg-cover bg-center bg-no-repeat flex-1 h-[700px] flex items-center relative hover:scale-[-1]">
                    <div className="absolute inset-0 bg-linear-to-t from-black to-black/5"></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                        <p className="text-white text-[36px]">Circle 27</p>
                        <p className="text-[#E5E5E5] text-lg opacity-[.4]">2020</p>
                    </div>
                </div>

                <div className="bg-[url(/house4.avif)] bg-cover bg-center bg-no-repeat flex-1 h-[700px] flex items-center relative">
                    <div className="absolute inset-0 bg-linear-to-t from-black to-black/5"></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                        <p className="text-white text-[36px]">Haus Schnee</p>
                        <p className="text-[#E5E5E5] text-lg opacity-[.4]">2019</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
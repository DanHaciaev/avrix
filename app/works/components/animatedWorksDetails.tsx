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

            {project.gallery[0] && project.gallery[1] && (
                <div
                    ref={ref1}
                    className={`flex flex-col lg:flex-row lg:gap-5 transition-all duration-1000 ease-out ${visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div
                        className="bg-cover bg-center h-[550px] lg:h-[500px] 3xl:h-[600px] lg:max-w-3/5 w-full"
                        style={{ backgroundImage: `url(${project.gallery[0]})` }}
                    />
                    <div
                        className="bg-cover bg-center h-[550px] lg:h-[500px] 3xl:h-[600px] flex-1"
                        style={{ backgroundImage: `url(${project.gallery[1]})` }}
                    />
                </div>
            )}


            {project.gallery[2] && (
                <div
                    ref={ref2}
                    className={`transition-all duration-1000 ease-out ${visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div
                        className="bg-cover bg-center h-[550px] lg:h-[500px] 3xl:h-[600px]"
                        style={{ backgroundImage: `url(${project.gallery[2]})` }}
                    />
                </div>
            )}

            {project.gallery[3] && project.gallery[4] && (
                <div
                    ref={ref3}
                    className={`flex flex-col lg:flex-row lg:gap-5 transition-all duration-1000 ease-out ${visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div
                        className="bg-cover bg-center h-[550px] lg:h-[500px] 3xl:h-[600px] lg:max-w-3/5 w-full"
                        style={{ backgroundImage: `url(${project.gallery[3]})` }}
                    />
                    <div
                        className="bg-cover bg-center h-[550px] lg:h-[500px] 3xl:h-[600px] flex-1"
                        style={{ backgroundImage: `url(${project.gallery[4]})` }}
                    />
                </div>
            )}
            

            {project.gallery[5] && (
                <div
                    ref={ref4}
                    className={`transition-all duration-1000 ease-out ${visible4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div
                        className="bg-cover bg-center h-[550px] lg:h-[500px] 3xl:h-[600px] flex-1"
                        style={{ backgroundImage: `url(${project.gallery[5]})` }}
                    />
                </div>
            )}




            <div className="flex flex-col md:flex-row gap-2.5 md:gap-0 items-center justify-between max-w-[660px] w-full mx-auto mt-[70px]">

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

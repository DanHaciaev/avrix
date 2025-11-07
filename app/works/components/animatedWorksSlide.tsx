"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
    src: string;
}

export default function AnimatedSwiperWorks({ slides }: { slides: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [visibleIndex, setVisibleIndex] = useState<number | null>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    // Создаем массив с клонами: [последний, ...оригиналы, первый]
    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    const goToSlide = (index: number) => {
        const realIndex = ((index - 1) % slides.length + slides.length) % slides.length;
        setVisibleIndex(null);
        setTimeout(() => setVisibleIndex(realIndex), 500);
    };

    const goToNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
        goToSlide(currentIndex + 1);
    };

    const goToPrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
        goToSlide(currentIndex - 1);
    };

    const resetAutoplay = () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(goToNext, 10000);
    };

    useEffect(() => {
        resetAutoplay();
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [currentIndex]);

    // Обработка бесконечного цикла
    useEffect(() => {
        if (currentIndex === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(slides.length);
            }, 300);
        } else if (currentIndex === extendedSlides.length - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }, 300);
        }
    }, [currentIndex]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        setTranslateX(diff);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        setTranslateX(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (translateX > 100) {
            goToPrev();
        } else if (translateX < -100) {
            goToNext();
        }
        setTranslateX(0);
    };

    const getRealIndex = (index: number) => {
        return ((index - 1) % slides.length + slides.length) % slides.length;
    };

    return (
        <div className="relative 3xl:max-w-[710px] w-full mx-auto">
            <p className="absolute z-100 text-white right-2 top-3 text-[26px]">
                Project Highlights
            </p>
            <div
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleDragEnd}
            >
                <div
                    className={`flex gap-4 ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
                    style={{
                        transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px + ${translateX}px))`,
                    }}
                >
                    {extendedSlides.map((slide, i) => {
                        const realIndex = getRealIndex(i);
                        return (
                            <div key={i} className="min-w-full">
                                <div className="relative w-full h-[600px]">
                                    <img
                                        src={slide}
                                        className="w-full h-full object-cover"
                                        draggable="false"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Кастомные кнопки переключения */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-[60px] md:left-auto md:translate-x-0 md:right-0 flex gap-2 z-10">
                <button
                    onClick={goToPrev}
                    className="w-10 h-10 flex items-center justify-center bg-black opacity-[0.2] rounded-full cursor-pointer transition-colors hover:opacity-30"
                    aria-label="Previous slide"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    onClick={goToNext}
                    className="w-10 h-10 flex items-center justify-center bg-black opacity-[0.2] rounded-full cursor-pointer transition-colors hover:opacity-30"
                    aria-label="Next slide"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
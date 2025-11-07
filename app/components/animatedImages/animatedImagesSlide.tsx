import { useEffect, useRef, useState } from "react";

interface Slide {
  src: string;
  title: string;
  text: string;
}

export default function AnimatedSwiper() {
  const slides: Slide[] = [
    {
      src: "/item1.avif",
      title: "Concept Development",
      text: "We shape the foundation of each project through a careful balance of vision, constraints, and context. Early-stage concepts are developed through sketches, models, and dialogue — always grounded in real needs, not abstract ideas."
    },
    {
      src: "/item2.avif",
      title: "Planning & Feasibility",
      text: "Before design begins, we assess what's possible — legally, spatially, and financially. Through planning studies and feasibility reports, we bring clarity to the development path, reducing risk and aligning expectations early."
    },
    {
      src: "/item3.avif",
      title: "Landscape Integration",
      text: "Every project responds to its setting — not just visually, but experientially. Whether placed in a dense urban context or a natural open site, we carefully consider how the built form meets, shapes, and respects its environment."
    },
    {
      src: "/item4.avif",
      title: "Architectural Design",
      text: "From massing and materiality to spatial flow, our architectural work is defined by restraint and clarity. We design environments that are intuitive to navigate, calm to inhabit, and enduring in both form and function."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [gapSize, setGapSize] = useState(16);
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

  // Отслеживание размера экрана для gap
  useEffect(() => {
    const updateGapSize = () => {
      setGapSize(window.innerWidth < 640 ? 8 : 16);
    };

    updateGapSize();
    window.addEventListener('resize', updateGapSize);

    return () => {
      window.removeEventListener('resize', updateGapSize);
    };
  }, []);

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
    <div className="relative w-full max-w-[1440px] mx-auto px-2.5 md:px-[30px]">
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
          className={`flex gap-2 sm:gap-4 ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * gapSize}px + ${translateX}px))`,
          }}
        >
          {extendedSlides.map((slide, i) => {
            const realIndex = getRealIndex(i);
            return (
              <div key={i} className="min-w-full">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
                <div
                  className={`mt-3 sm:mt-4 md:mt-6 max-w-full lg:max-w-[670px] transition-all duration-700 ease-out transform ${visibleIndex === realIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-10"
                    }`}
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[51px] font-semibold mb-1 sm:mb-2">{slide.title}</p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">{slide.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Кастомные кнопки переключения */}
      <div className="absolute -bottom-16 left-2.5 md:left-[30px] flex gap-2 z-10">
        <button
          onClick={goToPrev}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black opacity-[0.2] rounded-full cursor-pointer transition-colors hover:opacity-30"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black opacity-[0.2] rounded-full cursor-pointer transition-colors hover:opacity-30"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
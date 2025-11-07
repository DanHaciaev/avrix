"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AnimatedImagesSofa() {
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>([false, false]);

  useEffect(() => {
    const isLarge = typeof window !== "undefined" && window.innerWidth >= 1024;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = containerRefs.current.indexOf(entry.target as HTMLDivElement);

          // Логика для больших экранов (ожидание первой картинки)
          if (isLarge && index === 0 && entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[0]) return prev;

              const newVisible = [true, prev[1]];

              setTimeout(() => {
                setVisible((prev2) => [prev2[0], true]);
              }, 500);

              return newVisible;
            });
          }

          // Логика для мобильных → показываем вторую сразу
          if (!isLarge && index === 1 && entry.isIntersecting) {
            setVisible((prev) => [prev[0], true]);
          }
        });
      },
      { threshold: 0.6 }
    );

    containerRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);


  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRefs.current[index] = el;
  };

  const blocks = [
    { src: "/divan.avif", alts: "Fjordline", maxW: "350px", height: "400px" },
    {
      src: "/divan2.avif",
      number:
        "At Avrix, we approach every project with a focus on context, material honesty, and enduring quality. Our work balances form and function — aligning design principles with real-world constraints and possibilities. We collaborate closely with our clients throughout the entire process, ensuring that every space is shaped not only by vision, but by intention.",
      alts: "",
      title:
        "Our services are structured yet flexible, designed to meet the specific needs of each project while maintaining a high standard of design and execution. Whether it’s a single residence or a larger development, we take a holistic view — considering architecture, experience, and environment as a single, unified system.",
      maxW: "1003px",
      height: "500px",
    },
  ];

  return (
    <div className="flex items-start justify-center gap-[50px]">
      {blocks.map((block, i) => (
        <div
          key={i}
          ref={(el) => setRef(el, i)}
          className={`relative w-full h-auto transition-all duration-700 ease-out transform
      ${visible[i] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      ${i === 0 ? "hidden lg:block" : ""}
    `}
          style={{ maxWidth: block.maxW }}
        >
          <div className="relative w-full" style={{ height: block.height }}>
            <Image src={block.src} alt={block.alts} fill className="object-cover" />
          </div>

          <div className="mt-[50px] max-w-[700px] text-lg flex justify-between">
            <div className="flex flex-col gap-4">
              <p>{block.number}</p>
              <p>{block.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

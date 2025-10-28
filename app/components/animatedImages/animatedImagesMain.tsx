"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AnimatedImages() {
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = containerRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisible((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.6 } // 20% видимости
    );

    containerRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  // helper функция для добавления ref
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRefs.current[index] = el;
  };

  const blocks = [
    { src: "/house1.avif", number: "(01)", title: "Fjordline", year: "2025", maxW: "820px" },
    { src: "/house2.avif", number: "(02)", title: "Inner Garden", year: "2022", maxW: "606px" },
    { src: "/house3.avif", number: "(03)", title: "Cala Sol", year: "2021", maxW: "606px" },
    { src: "/house4.avif", number: "(04)", title: "Haus Schnee", year: "2019", maxW: "820px" },
  ];

  return (
    <div className="flex flex-col gap-5 text-[18px]">
      {/* верхняя строка */}
      <div className="flex items-center justify-center gap-5">
        {blocks.slice(0, 2).map((block, i) => (
          <div
            key={i}
            ref={(el) => setRef(el, i)}
            className={`relative w-full h-auto max-w-[${block.maxW}] transition-all duration-700 ease-out transform ${
              visible[i] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative w-full h-[460px]">
              <Image src={block.src} alt={block.title} fill className="object-cover" />
            </div>
            <div className="mt-2.5 flex justify-between">
              <div className="flex gap-[100px]">
                <p>{block.number}</p>
                <p>{block.title}</p>
              </div>
              <p>{block.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* нижняя строка */}
      <div className="flex items-center justify-center gap-5">
        {blocks.slice(2, 4).map((block, i) => (
          <div
            key={i + 2}
            ref={(el) => setRef(el, i + 2)}
            className={`relative w-full h-auto max-w-[${block.maxW}] transition-all duration-700 ease-out transform ${
              visible[i + 2] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative w-full h-[460px]">
              <Image src={block.src} alt={block.title} fill className="object-cover" />
            </div>
            <div className="mt-2.5 flex justify-between">
              <div className="flex gap-[100px]">
                <p>{block.number}</p>
                <p>{block.title}</p>
              </div>
              <p>{block.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

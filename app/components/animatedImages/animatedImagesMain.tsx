"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AnimatedImages() {
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  const [visibleRow1, setVisibleRow1] = useState(false);
  const [visibleRow2, setVisibleRow2] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === row1Ref.current && entry.isIntersecting) {
            setVisibleRow1(true);
          }
          if (entry.target === row2Ref.current && entry.isIntersecting) {
            setVisibleRow2(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (row1Ref.current) observer.observe(row1Ref.current);
    if (row2Ref.current) observer.observe(row2Ref.current);

    return () => observer.disconnect();
  }, []);

  const blocks = [
    { src: "/house1.avif", number: "(01)", title: "Fjordline", year: "2025", wide: true, slug: "fjordline" },
    { src: "/house2.avif", number: "(02)", title: "Inner Garden", year: "2022", wide: false, slug: "inner-garden" },
    { src: "/house3.avif", number: "(03)", title: "Cala Sol", year: "2021", wide: false, slug: "cala-sol" },
    { src: "/house4.avif", number: "(04)", title: "Haus Schnee", year: "2019", wide: true, slug: "haus-schnee" },
  ];

  return (
    <div className="flex flex-col gap-5 text-lg">
      {/* Верхняя строка */}
      <div
        ref={row1Ref}
        className={`flex flex-col xl:flex-row items-center justify-center gap-5 transition-all duration-700 ease-out transform ${
          visibleRow1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        {blocks.slice(0, 2).map((block) => (
          <Link
            key={block.slug}
            href={`/works/${block.slug}`}
            className={`relative w-full transition-all duration-700 ease-out group ${
              block.wide ? "xl:max-w-[820px]" : "xl:max-w-[606px]"
            }`}
          >
            <div className="relative w-full h-[460px] overflow-hidden">
              <Image 
                src={block.src} 
                alt={block.title} 
                fill 
                className="object-cover transition-opacity duration-300 group-hover:opacity-90" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            <div className="mt-2.5 flex justify-between">
              <div className="flex gap-[100px]">
                <p>{block.number}</p>
                <p>{block.title}</p>
              </div>
              <p>{block.year}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Нижняя строка */}
      <div
        ref={row2Ref}
        className={`flex flex-col xl:flex-row items-center justify-center gap-5 transition-all duration-700 ease-out transform ${
          visibleRow2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        {blocks.slice(2).map((block) => (
          <Link
            key={block.slug}
            href={`/works/${block.slug}`}
            className={`relative w-full transition-all duration-700 ease-out group ${
              block.wide ? "xl:max-w-[820px]" : "xl:max-w-[606px]"
            }`}
          >
            <div className="relative w-full h-[460px] overflow-hidden">
              <Image 
                src={block.src} 
                alt={block.title} 
                fill 
                className="object-cover transition-opacity duration-300 group-hover:opacity-90" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            <div className="mt-2.5 flex justify-between">
              <div className="flex gap-[100px]">
                <p>{block.number}</p>
                <p>{block.title}</p>
              </div>
              <p>{block.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
"use client";

import Image from "next/image";
import { gallery } from "../data/gallery";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedItem({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.3 } // 20% видимости
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section className="flex flex-col items-center flex-none gap-2.5 h-min overflow-hidden pt-[180px] md:px-[30px] pb-[90px] relative w-full">
      <div className="flex flex-col items-center flex-none gap-[70px] h-min max-w-[1440px] overflow-visible p-0 relative w-full">

        <div className="grid grid-cols-1 gap-y-4 max-w-[770px] w-full md:grid-cols-2 md:justify-center md:auto-rows-fr md:gap-[180px_90px] md:flex-none md:h-min md:p-0 md:relative md:w-full">
          {gallery.gallery.map((src, index) => {
            const isBottomPadding = index % 2 === 0; // чётные — pb, нечётные — pt

            return (
              <AnimatedItem key={index}>
                <div className="flex flex-row items-center justify-start gap-2.5 flex-1 h-[556px] md:max-w-[640px] md:h-[698px] 3xl:h-screen p-0 relative w-full">
                  <div
                    className={`flex flex-row items-center flex-1 h-full gap-2.5 overflow-hidden relative max-w-[770px] w-full ${isBottomPadding ? "md:pb-[180px]" : "md:pt-[180px]"
                      }`}
                  >
                    <div className="flex-1 h-full overflow-hidden relative max-w-[770px] w-full">
                      <div className="absolute inset-0 rounded-inherit max-w-[770px] w-full">
                        <img
                          src={src}
                          alt=""
                          className="block max-w-[770px] w-full h-full rounded-inherit object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            );
          })}
        </div>

      </div>
    </section>
  );
}

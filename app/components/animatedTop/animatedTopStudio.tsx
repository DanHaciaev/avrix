"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function animatedTopStudio() {
    return (
        <div>
            <div className="flex gap-[90px]">
                {/* TEXT BLOCK */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-[414px] flex flex-col gap-[30px]"
                >
                    <p className="text-[70px]">Our Ethos</p>

                    <span className="text-lg">
                        At Arvix, we approach every project with a focus on context, material honesty,
                        and enduring quality. Our work balances form and function — aligning design
                        principles with real-world constraints and possibilities. We collaborate closely
                        with our clients throughout the entire process, ensuring that every space is
                        shaped not only by vision, but by intention.
                        <br />
                        <br />
                        Our services are structured yet flexible, designed to meet the specific needs of
                        each project while maintaining a high standard of design and execution. Whether
                        it’s a single residence or a larger development, we take a holistic view —
                        considering architecture, experience, and environment as a single, unified system.
                    </span>
                </motion.div>

                {/* IMAGE BLOCK */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative max-w-[940px] w-full h-[651px] aspect-4/3 overflow-hidden"
                >
                    <Image
                        src="/studio.avif"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    )
}
"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (rootRef.current) observer.observe(rootRef.current);

        return () => observer.disconnect();
    }, []);

    // helper for delay
    const animate = (index: number) =>
        `transition-all duration-700 transform ${visible
            ? `opacity-100 translate-y-0`
            : `opacity-0 translate-y-10`
        }`
        + ` delay-[${index * 150}ms]`; // 0.15s задержка между блоками

    return (
        <div ref={rootRef}>
            <div className="bg-[url(/contact.avif)] bg-cover bg-top bg-no-repeat min-h-[70vh] flex items-center"></div>

            <section>
                <div className="max-w-[1440px] mx-auto py-[90px] flex gap-5">

                    {/* LEFT SIDE — text blocks */}
                    <div className="flex flex-col items-start flex-1">

                        <div className="flex flex-col max-w-[568px] gap-[70px]">

                            {/* BLOCK 1 */}
                            <div className={animate(1)}>
                                <p className="text-[53px]">Contact us</p>
                                <span className="text-lg">
                                    For inquiries, collaborations, or project discussions, fill out the form.
                                    Our team will respond as soon as possible to explore the next steps.
                                </span>
                            </div>

                            {/* BLOCK 2 */}
                            <div className={`text-[18px] text-[#0D0D0D] leading-relaxed ${animate(2)}`}>
                                <a href="tel:+44123456789" className="block">
                                    +44 (0)1 2345 6789
                                </a>
                                <a href="mailto:studio@arvix.co" className="block">
                                    studio@arvix.co
                                </a>
                            </div>

                            {/* BLOCK 3 */}
                            <p className={`text-[18px] text-[#0D0D0D] ${animate(3)}`}>
                                42 Kingstreet Hollow <br />
                                London, LDN 1AB <br />
                                United Kingdom
                            </p>

                        </div>
                    </div>

                    {/* RIGHT SIDE — form */}
                    <form action="" className="flex-1 flex flex-col gap-[30px]">

                        {/* FORM BLOCK 1 */}
                        <div className={`flex flex-col gap-2.5 ${animate(4)}`}>
                            <label htmlFor="name" className="text-[18px] font-medium text-[#0D0D0D]">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="border-b border-b-gray-300 py-3 text-lg placeholder-[#666] focus:outline-none"
                                placeholder="Jane Smith"
                            />
                        </div>

                        {/* FORM BLOCK 2 */}
                        <div className={`flex flex-col gap-2.5 ${animate(5)}`}>
                            <label htmlFor="company" className="text-[18px] font-medium text-[#0D0D0D]">
                                Company Name
                            </label>
                            <input
                                id="company"
                                type="text"
                                className="border-b border-b-gray-300 py-3 text-lg placeholder-[#666] focus:outline-none"
                                placeholder="Frame Inc."
                            />
                        </div>

                        {/* FORM BLOCK 3 */}
                        <div className={`flex flex-col gap-2.5 ${animate(6)}`}>
                            <label htmlFor="email" className="text-[18px] font-medium text-[#0D0D0D]">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                className="border-b border-b-gray-300 py-3 text-lg placeholder-[#666] focus:outline-none"
                                placeholder="jane@framer.com"
                            />
                        </div>

                        {/* FORM BLOCK 4 */}
                        <div className={`flex flex-col gap-2.5 ${animate(7)}`}>
                            <label htmlFor="message" className="text-[18px] font-medium text-[#0D0D0D]">
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="border-b border-b-gray-300 py-3 min-h-[100px] text-lg placeholder-[#666] focus:outline-none"
                                placeholder="Project information"
                            />
                        </div>

                        {/* FORM BUTTON */}
                        <button
                            type="submit"
                            className={`bg-[#0D0D0D] text-white p-2.5 text-lg ${animate(8)}`}
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </section>
        </div>
    );
}

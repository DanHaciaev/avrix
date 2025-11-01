"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
    const refs = useRef<(HTMLElement | null)[]>([]);
    const [visible, setVisible] = useState<boolean[]>([]);

    const registerRef = (el: HTMLElement | null, index: number) => {
        if (el) refs.current[index] = el;
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute("data-index"));
                    setVisible((prev) => {
                        const updated = [...prev];
                        updated[index] = true;
                        return updated;
                    });
                }
            });
        }, { threshold: 1 });

        refs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);


    // helper for delay
    const animate = (index: number) =>
        `transition-all duration-700 transform ${visible[index]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } delay-[${index * 1000}ms]`;

    return (
        <div>
            <div className="bg-[url(/contact.avif)] bg-cover bg-top bg-no-repeat min-h-[70vh] flex items-center"></div>

            <section>
                <div className="max-w-[1440px] mx-auto py-[90px] flex gap-5">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col items-start flex-1">

                        <div className="flex flex-col max-w-[568px] gap-[70px]">

                            {/* BLOCK 1 */}
                            <div
                                data-index={1}
                                ref={(el) => registerRef(el, 1)}
                                className={animate(1)}
                            >
                                <p className="text-[53px]">Contact us</p>
                                <span className="text-lg">
                                    For inquiries, collaborations, or project discussions, fill out the form.
                                    Our team will respond as soon as possible to explore the next steps.
                                </span>
                            </div>

                            {/* BLOCK 2 */}
                            <div
                                data-index={2}
                                ref={(el) => registerRef(el, 2)}
                                className={`text-[18px] text-[#0D0D0D] leading-relaxed ${animate(2)}`}
                            >
                                <a href="tel:+44123456789" className="block">
                                    +44 (0)1 2345 6789
                                </a>
                                <a href="mailto:studio@arvix.co" className="block">
                                    studio@arvix.co
                                </a>
                            </div>

                            {/* BLOCK 3 */}
                            <p
                                data-index={3}
                                ref={(el) => registerRef(el, 3)}
                                className={`text-[18px] text-[#0D0D0D] ${animate(3)}`}
                            >
                                42 Kingstreet Hollow <br />
                                London, LDN 1AB <br />
                                United Kingdom
                            </p>

                        </div>
                    </div>

                    {/* RIGHT SIDE — form */}
                    <form className="flex-1 flex flex-col gap-[30px]">

                        {/* FORM BLOCK 1 */}
                        <div
                            data-index={4}
                            ref={(el) => registerRef(el, 4)}
                            className={`flex flex-col gap-2.5 ${animate(4)}`}
                        >
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
                        <div
                            data-index={5}
                            ref={(el) => registerRef(el, 5)}
                            className={`flex flex-col gap-2.5 ${animate(5)}`}
                        >
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
                        <div
                            data-index={6}
                            ref={(el) => registerRef(el, 6)}
                            className={`flex flex-col gap-2.5 ${animate(6)}`}
                        >
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
                        <div
                            data-index={7}
                            ref={(el) => registerRef(el, 7)}
                            className={`flex flex-col gap-2.5 ${animate(7)}`}
                        >
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
                            data-index={8}
                            ref={(el) => registerRef(el, 8)}
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

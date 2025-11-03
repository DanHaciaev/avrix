"use client";

import AnimatedWorksDetails from "@/app/components/animatedImages/animatedWorksDetails";
import AnimatedSwiperWorks from "@/app/components/animatedImages/animatedWorksSlide";

export default function WorksDetail() {
    return (
        <div>
            <section className="bg-[url(/work1.avif)] bg-cover bg-center bg-no-repeat min-h-screen relative flex items-end px-[30px]">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-black/0"></div>
                <div className="max-w-[1440px] mx-auto w-full flex items-end justify-between relative gap-[70px] mb-[90px]">
                    <p className="flex-1 text-[51px] text-white">
                        Fjordline
                    </p>

                    <p className="flex-1 text-lg text-white max-w-[650px]">
                        Fjordline is a modern lakeside retreat in Western Norway, blending minimalist architecture with stunning natural surroundings. Featuring dark timber cladding, expansive glass walls, and a seamless connection to the fjord, the home offers a serene and dramatic living experience.
                    </p>
                </div>
            </section>

            <section className="px-[30px] py-[90px]">
                <div className="max-w-[1440px] mx-auto flex justify-between gap-5">
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-5 max-w-[568px]">
                            <p className="text-[36px]">
                                Dark minimalism meets Scandinavian serenity
                            </p>

                            <p className="text-lg max-w-[530px]">
                                The design prioritized harmony with the landscape, using local materials and biophilic principles. A restrained palette, thoughtful lighting, and clean lines define the interiors, creating a cohesive and tranquil atmosphere throughout the space.
                            </p>
                        </div>

                        <div className="flex gap-[30px]">
                            <p className="text-lg">
                                <strong className="font-normal!">Location</strong> Norway
                            </p>
                            <p className="text-lg">
                                <strong className="font-normal!">Surface</strong> 320 m²
                            </p>
                            <p className="text-lg">
                                <strong className="font-normal!">Year</strong> 2025
                            </p>
                        </div>

                    </div>

                    <div className="max-w-[710px] w-full">
                        <AnimatedSwiperWorks />
                    </div>
                </div>
            </section>

            <section className="px-[30px] py-[90px]">
                <AnimatedWorksDetails />
            </section>
        </div>
    )
}
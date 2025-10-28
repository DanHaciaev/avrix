"use client";

import AnimatedImages from "./components/animatedImages/animatedImagesMain";
import AnimatedImagesSlide from "./components/animatedImages/animatedImagesSlide";
import AnimatedImagesSofa from "./components/animatedImages/animatedImagesSofa";
import AnimatedText from "./components/animatedText/animatedTextMain";
import AnimatedTextSpace from "./components/animatedText/animatedTextSpace";
import Bottom from "./components/bottomPart/bottom";

export default function Home() {

  return (
    <div className="">
      <section className="bg-[url(/main.avif)] bg-cover bg-center bg-no-repeat min-h-screen flex items-center" data-bg="dark">
        <div className="max-w-[1440px] mx-auto w-full">
          <ul className="uppercase text-[18px] text-white flex justify-between">
            <li>Featured project</li>
            <li>Circle 27</li>
            <li>2025</li>
            <li>View project</li>
          </ul>
        </div>
      </section>


      <section className="max-w-[1440px] mx-auto py-[90px]" data-bg="light">
        <div className="max-w-[682px] flex flex-col gap-[70px]">
          <AnimatedText text="Avrix is a design-forward development studio focused on creating built environments architectural experiences that stand the test of time." highlightWords={6} />


          <button className="border uppercase w-fit px-5 py-2.5 text-[20px]">
            About the studio
          </button>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto py-[90px]">
        <div className="flex flex-col gap-[50px]">
          <p className="text-[36px] text-[#0d0d0d] ">
            Featured Projects (04)
          </p>

          <AnimatedImages />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto py-[90px]">
        <div className="max-w-[720px] mx-auto text-center">
          <AnimatedTextSpace text="A space should not demand attention — it should reward presence." />

        </div>
      </section>

      <section className="max-w-[1440px] mx-auto py-[90px]">
        <div className="flex flex-col gap-[50px]">

          <AnimatedImagesSofa />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto pt-[90px] mb-40" id="services">
        <div className="flex flex-col gap-[50px]">

          <AnimatedImagesSlide />
        </div>
      </section>

      <Bottom />
    </div>
  );
}

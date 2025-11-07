import AnimatedImagesWorks from "./components/animatedImagesWorks";

export default function Works() {
  return (
    <div className="bg-black px-2.5 md:px-[30px]">
      <section className="flex flex-col gap-[30px] pt-[180px] pb-[90px] max-w-[1440px] mx-auto">
        <p className="max-w-[864px] text-white text-[73px]">
          Work that balances form, function, and feeling.
        </p>
        <p className="max-w-[410px] text-white text-lg">
          Each project is rooted in context and built with clarity — shaped not only by aesthetic decisions, but by intention, rhythm, and restraint.
        </p>
      </section>

      <AnimatedImagesWorks />
    </div >
  );
}

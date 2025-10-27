
export default function Home() {
  return (
    <div className="">
      <section className="bg-[url(/main.avif)] bg-cover bg-center bg-no-repeat min-h-screen flex items-center">
        <div className="max-w-[1440px] mx-auto w-full">
          <ul className="uppercase text-[18px] text-white flex justify-between">
            <li>Featured project</li>
            <li>Circle 27</li>
            <li>2025</li>
            <li>View project</li>
          </ul>
        </div>
      </section>


      <section className="max-w-[1440px] mx-auto py-[90px]">
        <div className="max-w-[682px] flex flex-col gap-[70px]">
          <p className="text-[51px] text-[#808080] font-light">
            <span className="text-[#0d0d0d]">Avrix is a design-forward development studio</span> focused
            on creating built environments architectural experiences that stand the test of time.
          </p>

          <button className="border uppercase w-fit px-5 py-2.5 text-[20px]">
            About the studio
          </button>
        </div>
      </section>
    </div>
  );
}

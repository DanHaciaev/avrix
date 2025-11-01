import Image from "next/image"
import Link from "next/link"

export default function Bottom() {
    return (
        <div className="">
            <section className="relative h-[400px] px-[30px] flex items-center">
                <Image
                    src="/bottom.avif"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="relative max-w-[1440px] mx-auto w-full">
                    <div className="flex flex-col gap-[100px]">
                        <p className="max-w-[432px] text-white text-[36px]">
                            Let's Build Somehing Timeless.
                        </p>

                        <button className="bg-white text-[#0d0d0d] w-fit px-5 py-2.5 text-[20px]">
                            <Link href="/contact">Get in touch</Link>
                        </button>
                    </div>
                </div>
            </section>
        </div>

    )
}
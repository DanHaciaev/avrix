import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="fixed top-0 z-10 w-full py-8">
            <div className="max-w-[1440px] mx-auto flex flex-1 justify-between items-center h-min">
                <Image
                    src="/logo.avif"
                    width={69}
                    height={24}
                    alt="Picture" />


                <ul className="flex gap-[23px] text-white text-[18px]">
                    <li>
                        <Link href='/works'>Works</Link>
                    </li>
                    <li>
                        <Link href='/works'>Studio</Link>
                    </li>
                    <li>
                        <Link href='/works'>Services</Link>
                    </li>
                    <li>
                        <Link href='/works'>Gallery</Link>
                    </li>
                </ul>

                <p className="text-[17px] text-white">
                    <Link href="/works">Get in touch</Link>
                </p>
            </div>

        </div>
    );
}

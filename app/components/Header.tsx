"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      // Уже на главной — плавно скроллим
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Если на другой странице — переходим на главную с якорем
      router.push("/#services");
    }
  };

  return (
    <header className="fixed top-0 z-10 w-full py-8">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <p className="text-[36px] text-[#808080]">
          <Link href="/">Avrix</Link>
        </p>

        <ul className="flex gap-[23px] text-[#808080] text-[18px]">
          <li><Link href="/works">Works</Link></li>
          <li><Link href="/works">Studio</Link></li>
          <li>
            <a href="#services" onClick={handleScrollToServices}>
              Services
            </a>
          </li>
          <li><Link href="/works">Gallery</Link></li>
        </ul>

        <p className="text-[17px] text-[#808080]">
          <Link href="/works">Get in touch</Link>
        </p>
      </div>
    </header>
  );
}

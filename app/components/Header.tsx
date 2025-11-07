"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent, useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleScrollToServices = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#services");
    }
    closeMenu();
  };

  const toggleMenu = () => {
    if (!menuOpen) {
      setOverlayVisible(true); // overlay сразу в DOM
      // через 10ms включаем видимость, чтобы сработал transition
      setTimeout(() => setMenuOpen(true), 10);
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // через 300ms скрываем overlay после окончания анимации
    setTimeout(() => setOverlayVisible(false), 300);
  };

  return (
    <>
      <header className="fixed top-0 z-20 w-full py-8 backdrop-blur px-2.5 md:px-[30px]">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <p className="text-[36px] text-[#808080]">
            <Link href="/" scroll={false}>Avrix</Link>
          </p>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-[23px] items-center max-w-1/2 w-full justify-between">
            <ul className="flex gap-[23px] text-[#808080] text-[18px]">
              <li><Link href="/works" scroll={false}>Works</Link></li>
              <li><Link href="/studio" scroll={false}>Studio</Link></li>
              <li><a href="#services" onClick={handleScrollToServices}>Services</a></li>
              <li><Link href="/gallery" scroll={false}>Gallery</Link></li>
            </ul>

            <p className="text-[18px] text-[#808080]">
              <Link
                href="/contact"
                scroll={false}
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-[#808080] after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100"
              >
                Get in touch
              </Link>
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative lg:hidden text-[18px] text-[#808080] focus:outline-none"
          >
            <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-[#808080] after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {overlayVisible && (
        <div
          className={`fixed inset-0 z-30 bg-black flex flex-col transition-all duration-300 ease-in-out
            ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          {/* Top Bar: Logo + Close */}
          <div className="flex justify-between items-center px-5 py-8">
            <p className="text-[36px] text-white">
              <Link href="/" scroll={false} onClick={closeMenu}>Avrix</Link>
            </p>
            <button
              onClick={toggleMenu}
              className="relative text-[18px] text-white focus:outline-none"
            >
              <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100">
                Close
              </span>
            </button>
          </div>

          {/* Centered Links */}
          <div className="flex flex-col items-center justify-center flex-1 gap-2.5 text-white text-[43px]">
            <Link href="/" scroll={false} onClick={closeMenu}>Home</Link>
            <Link href="/works" scroll={false} onClick={closeMenu}>Works</Link>
            <Link href="/studio" scroll={false} onClick={closeMenu}>Studio</Link>
            <a href="#services" onClick={handleScrollToServices}>Services</a>
            <Link href="/gallery" scroll={false} onClick={closeMenu}>Gallery</Link>
            <Link href="/contact" scroll={false} onClick={closeMenu}>Contact</Link>
          </div>
        </div>
      )}
    </>
  );
}

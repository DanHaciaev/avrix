export default function Footer() {
    return (
        <div>
            <footer className="py-[90px] bg-black">
                <div className="max-w-[1440px] mx-auto h-[200px] flex items-center justify-between">
                    {/* Left part of footer */}
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-2.5">
                            <p className="text-white text-[26px]">Follow Us</p>
                            <ul className="flex gap-2.5 text-[15px] text-white opacity-[0.5]">
                                <li>Instagram</li>
                                <li>Linkedin</li>
                                <li>Twitter</li>
                                <li>YouTube</li>
                            </ul>
                        </div>

                        <p className="text-[15px] text-white opacity-[0.5]">
                            © 2025 Avrix. All rights reserved.
                        </p>
                    </div>

                    {/* Right part of footer */}
                    <div className="flex gap-[90px] justify-between h-full">
                        <div className="flex flex-col justify-between max-w-[165px]">
                            <div className="flex flex-col gap-2.5">
                                <p className="text-white text-[26px]">
                                    Headquaters
                                </p>
                                <p className="text-[15px] text-white opacity-[0.5]">
                                    42 Kingstreet Hollow
                                    London, LDN 1AB <br />
                                    United Kingdom
                                </p>
                            </div>

                            <div className="flex gap-2.5">
                                <p className="text-[15px] text-white opacity-[0.5]">
                                    Privacy
                                </p>
                                <p className="text-[15px] text-white opacity-[0.5]">
                                    Terms of Service
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col gap-2.5">
                                <p className="text-white text-[26px]">Contact</p>
                                <div className="text-[15px] text-white opacity-[0.5] leading-relaxed">
                                    <a
                                        href="tel:+44123456789"
                                        className="hover:opacity-100 transition-opacity block"
                                    >
                                        +44 (0)1 2345 6789
                                    </a>
                                    <a
                                        href="mailto:studio@arvix.co"
                                        className="hover:opacity-100 transition-opacity block"
                                    >
                                        studio@arvix.co
                                    </a>
                                </div>
                            </div>


                            <p className="text-[15px] text-white">
                                Designed by Foci Studio
                            </p>
                        </div>
                    </div>
                </div>


            </footer>
        </div>
    )
}
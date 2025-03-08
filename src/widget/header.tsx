"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Wave from "react-wavify";
import { tiaraFont } from "@/lib/fonts";
import { cn, tiaraAssetsPrefix } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../public/assets/sjeclogo.png";
import Link from "next/link";
const ButtonHoverRegister = () => {
    return (
        <>
            <Link href="/register">
                <button className="group relative inline-flex h-10  overflow-hidden rounded-md border-2 dark:border-[#ca4a4a] border-[#e03838]  font-medium">
                    <div className="inline-flex h-10 translate-y-0 items-center justify-center px-6  bg-gradient-to-r dark:from-[#EB1C2C] dark:to-[#EB1C2C] dark:text-white text-black transition duration-500 group-hover:-translate-y-[150%]">
                        register
                    </div>
                    <div className="absolute inline-flex h-10  w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                        <span className="absolute h-full w-full translate-y-full skew-y-10 scale-y-0 bg-[#EB1C2C] dark:bg-[#EB1C2C] transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                        <span className="z-10">now</span>
                    </div>
                </button>
            </Link>
        </>
    );
};
const ButtonHoverRulebook = () => {
    const router = useRouter();
    return (
        <>
            <a href={`${tiaraAssetsPrefix}/rulebook.pdf`}>
                <button className="group relative inline-flex h-10  overflow-hidden rounded-md border-2 dark:border-[#ca4a4a] border-[#e03838]  font-medium">
                    <div className="inline-flex h-10 translate-y-0 items-center justify-center px-6  bg-gradient-to-r dark:from-[#EB1C2C] dark:to-[#EB1C2C] dark:text-white text-black transition duration-500 group-hover:-translate-y-[150%]">
                        rule book
                    </div>
                    <div className="absolute inline-flex h-10 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                        <span className="absolute h-full w-full translate-y-full skew-y-10 scale-y-0 bg-[#EB1C2C] dark:bg-[#EB1C2C] transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                        <span className="z-10">rule book</span>
                    </div>
                </button>
            </a>
        </>
    );
};
export const Header = () => {
    // State to store wave parameters
    const [waveParams, setWaveParams] = useState({
        height: 40,
        amplitude: 20,
        speed: 0.15,
        points: 7,
    });

    // State for mobile menu toggle
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Update wave parameters based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                // sm breakpoint in Tailwind
                setWaveParams({
                    height: 80, // smaller height for mobile
                    amplitude: 5, // smaller amplitude for mobile
                    speed: 0.15,
                    points: 3, // fewer points for mobile (smoother)
                });
            } else if (window.innerWidth < 1024) {
                // md breakpoint
                setWaveParams({
                    height: 25,
                    amplitude: 18,
                    speed: 0.15,
                    points: 5,
                });
            } else {
                // large screens
                setWaveParams({
                    height: 50,
                    amplitude: 20,
                    speed: 0.15,
                    points: 7,
                });
            }
        };

        // Set initial parameters
        handleResize();

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        // Close menu when resizing to desktop
        const handleResizeForMenu = () => {
            if (window.innerWidth >= 768) {
                // md breakpoint
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResizeForMenu);

        // Prevent scrolling when menu is open
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("resize", handleResizeForMenu);
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    return (
        <header className="fixed top-0 w-full z-50">
            <Wave
                fill="url(#gradient)"
                paused={false}
                style={{ display: "flex", opacity: 0.5, transform: "rotate(180deg)" }}
                options={{
                    height: waveParams.height,
                    amplitude: waveParams.amplitude,
                    speed: waveParams.speed,
                    points: waveParams.points,
                }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8B0000" />
                        <stop offset="50%" stopColor="#000000" />
                    </linearGradient>
                </defs>
            </Wave>

            {/* Text container positioned above the wave */}
            <div className="absolute md:px-10  inset-x-0 top-0 z-[60] flex flex-row justify-between items-center p-4 w-full">
                {/* Logo and Name - positioned on the left */}
                <div className="flex order-1">
                    <ul className="flex items-center">
                        <li>
                            <Image
                                src={logo}
                                alt="Tiara'25 Logo"
                                width={60} // Adjust width as needed
                                height={60} // Adjust height as needed
                                className="cursor-crosshair"
                            />
                        </li>
                    </ul>
                </div>

                {/* Desktop Navigation - Original layout for larger screens */}
                <div className="hidden md:block order-2 ml-auto">
                    <ul
                        className={cn(
                            "flex flex-wrap justify-end text-white items-center tracking-wider",
                            tiaraFont.className
                        )}
                    >
                        <li className="mx-2 hover:text-red-600 text-sm mt-1 relative group">
                            <a href="/" className="transition-colors duration-300 ease-in-out">
                                home
                            </a>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="mx-2 hover:text-red-600 text-sm relative mt-1 group">
                            <a href="/about" className="transition-colors duration-300 ease-in-out">
                                about
                            </a>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="mx-2 hover:text-red-600 text-sm relative mt-1 group">
                            <a href="/events" className="transition-colors duration-300 ease-in-out">
                                events
                            </a>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="mx-2 hover:text-red-600 text-sm relative mt-1 group">
                            <a href="/team" className="transition-colors duration-300 ease-in-out">
                                team
                            </a>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="mx-2 text-sm">
                            <ButtonHoverRulebook />
                        </li>
                        <li className="mx-2 text-sm">
                            <ButtonHoverRegister />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu (animated slide-in) */}
            <div
                className={`fixed inset-0 z-[65] bg-black bg-opacity-95 transform transition-transform duration-500 ease-in-out ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ top: "0", paddingTop: "4rem" }}
            >
                <ul
                    className={cn(
                        "flex flex-col w-full h-full py-8 px-6 space-y-6 text-white overflow-auto tracking-wider",
                        tiaraFont.className
                    )}
                >
                    <li
                        className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                        style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "100ms" }}
                    >
                        <a href="/" onClick={toggleMenu} className="text-lg font-semibold block">
                            home
                        </a>
                    </li>
                    <li
                        className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                        style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "150ms" }}
                    >
                        <a href="/about" onClick={toggleMenu} className="text-lg font-semibold block">
                            about
                        </a>
                    </li>
                    <li
                        className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                        style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "200ms" }}
                    >
                        <a href="/events" onClick={toggleMenu} className="text-lg font-semibold block">
                            events
                        </a>
                    </li>
                    <li
                        className="transform transition-all duration-500 ease-in-out hover:translate-x-2 hover:text-red-500"
                        style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "250ms" }}
                    >
                        <a href="/team" onClick={toggleMenu} className="text-lg font-semibold block">
                            team
                        </a>
                    </li>
                    <li className="pt-4" style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "300ms" }}>
                        <ButtonHoverRulebook />
                    </li>
                    <li className=" pt-4" style={{ opacity: menuOpen ? 1 : 0, transitionDelay: "350ms" }}>
                        <ButtonHoverRegister />
                    </li>
                </ul>
            </div>

            {/* Hamburger Menu Button - Moved outside previous containers to ensure it's always on top */}
            <div className="fixed top-4 right-4 md:hidden z-[100]">
                <button
                    onClick={toggleMenu}
                    className="text-white focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? (
                        <X size={24} className="animate-spin-once mt-2" />
                    ) : (
                        <Menu size={24} className="mt-2" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;

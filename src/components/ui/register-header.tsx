"use client";
import Image from "next/image";
import { tiaraFont } from "@/lib/fonts";
import { cn, tiaraAssetsPrefix } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import logo from "../../../public/assets/sjeclogo.png";
import Link from "next/link";
import { useState, useEffect } from "react";

export function RegisterHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    return (
        <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
            <div className="md:px-10 flex flex-row justify-between items-center p-4 w-full">
                {/* Logo and Name */}
                <div className="flex">
                    <ul className="flex items-center">
                        <li>
                            <Image
                                src={logo}
                                alt="Tiara'25 Logo"
                                width={60}
                                height={60}
                                className="cursor-pointer"
                            />
                        </li>
                    </ul>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <ul className={cn("flex items-center space-x-8 text-white", tiaraFont.className)}>
                        <li>
                            <Link href="/" className="hover:text-red-500 transition-colors">
                                home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-red-500 transition-colors">
                                about
                            </Link>
                        </li>
                        <li>
                            <Link href="/events" className="hover:text-red-500 transition-colors">
                                events
                            </Link>
                        </li>
                        <li>
                            <Link href="/team" className="hover:text-red-500 transition-colors">
                                team
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`${tiaraAssetsPrefix}/rulebook.pdf`}
                                className="group relative inline-flex h-10 overflow-hidden rounded-md border-2 border-[#ca4a4a] px-6 items-center font-medium hover:bg-[#EB1C2C] transition-colors duration-300"
                            >
                                rulebook
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-50 bg-black/95 transform transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ top: "0", paddingTop: "4rem" }}
            >
                <ul className={cn("flex flex-col space-y-6 p-6 text-white", tiaraFont.className)}>
                    <li>
                        <Link
                            href="/"
                            onClick={toggleMenu}
                            className="text-lg hover:text-red-500 transition-colors"
                        >
                            home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            onClick={toggleMenu}
                            className="text-lg hover:text-red-500 transition-colors"
                        >
                            about
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/events"
                            onClick={toggleMenu}
                            className="text-lg hover:text-red-500 transition-colors"
                        >
                            events
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/team"
                            onClick={toggleMenu}
                            className="text-lg hover:text-red-500 transition-colors"
                        >
                            team
                        </Link>
                    </li>
                    <li>
                        <a
                            href={`${tiaraAssetsPrefix}/rulebook.pdf`}
                            className="inline-flex h-10 items-center px-6 rounded-md border-2 border-[#ca4a4a] hover:bg-[#EB1C2C] transition-colors duration-300"
                            onClick={toggleMenu}
                        >
                            rulebook
                        </a>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="fixed top-4 right-4 md:hidden z-[60]">
                <button
                    onClick={toggleMenu}
                    className="text-white focus:outline-none"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    );
}

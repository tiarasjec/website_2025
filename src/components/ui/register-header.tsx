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
            <nav className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src={logo}
                            alt="Tiara'25 Logo"
                            width={48}
                            height={48}
                            className="cursor-pointer"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className={cn("flex items-center gap-8 text-white", tiaraFont.className)}>
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm hover:text-[#EB1C2C] transition-colors duration-200"
                                >
                                    home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm hover:text-[#EB1C2C] transition-colors duration-200"
                                >
                                    about
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/events"
                                    className="text-sm hover:text-[#EB1C2C] transition-colors duration-200"
                                >
                                    events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/team"
                                    className="text-sm hover:text-[#EB1C2C] transition-colors duration-200"
                                >
                                    team
                                </Link>
                            </li>
                            <li>
                                <a
                                    href={`${tiaraAssetsPrefix}/rulebook.pdf`}
                                    className="inline-flex h-9 items-center px-4 rounded-md border-2 border-[#ca4a4a] text-sm font-medium hover:bg-[#EB1C2C] transition-colors duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    rulebook
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/95 transform transition-all duration-300 ease-in-out",
                    menuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full pt-20 px-6">
                    <ul className={cn("flex flex-col space-y-6 text-white", tiaraFont.className)}>
                        <li>
                            <Link
                                href="/"
                                onClick={toggleMenu}
                                className="text-lg hover:text-[#EB1C2C] transition-colors duration-200 block"
                            >
                                home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                onClick={toggleMenu}
                                className="text-lg hover:text-[#EB1C2C] transition-colors duration-200 block"
                            >
                                about
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/events"
                                onClick={toggleMenu}
                                className="text-lg hover:text-[#EB1C2C] transition-colors duration-200 block"
                            >
                                events
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/team"
                                onClick={toggleMenu}
                                className="text-lg hover:text-[#EB1C2C] transition-colors duration-200 block"
                            >
                                team
                            </Link>
                        </li>
                        <li>
                            <a
                                href={`${tiaraAssetsPrefix}/rulebook.pdf`}
                                className="inline-flex h-10 items-center px-6 rounded-md border-2 border-[#ca4a4a] hover:bg-[#EB1C2C] transition-colors duration-200"
                                onClick={toggleMenu}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                rulebook
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

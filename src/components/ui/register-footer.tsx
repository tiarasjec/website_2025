import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Instagram, Globe, Mail, Phone } from "lucide-react";

export function RegisterFooter() {
    return (
        <footer className="bg-black/80 backdrop-blur-sm border-t border-white/10 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Desktop Layout */}
                <div className="hidden md:flex justify-between items-center">
                    {/* Logo and Copyright */}
                    <div className="flex items-center">
                        <div className={cn("tracking-widest", tiaraFont.className)}>
                            <span className="text-white">Ti</span>
                            <span className="text-[#EB1C2C]">ar</span>
                            <span className="text-white">a</span>
                            <span className="text-[#EB1C2C]">&apos;</span>
                            <span className="text-white">25</span>
                        </div>
                        <span className="mx-4 text-2xl">|</span>
                        <span className="text-sm">
                            © Developed by{" "}
                            <a
                                href="https://gdg.community.dev/gdg-on-campus-st-joseph-engineering-college-mangaluru-india/"
                                className="hover:text-[#EB1C2C]"
                            >
                                Google DG SJEC
                            </a>{" "}
                            &{" "}
                            <a href="https://sceptix.in" className="hover:text-[#EB1C2C]">
                                The Sceptix Club
                            </a>
                        </span>
                    </div>

                    {/* Links and Social */}
                    <div className="flex items-center space-x-6">
                        <a
                            href="https://www.instagram.com/tiarasjec/"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://sjec.ac.in/"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Website"
                        >
                            <Globe size={20} />
                        </a>
                        <a
                            href="mailto:tiarasjec@sjec.ac.in"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="tel:+91 8867656481"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Phone"
                        >
                            <Phone size={20} />
                        </a>
                        <span className="text-2xl">|</span>
                        <a href="/privacy" className="hover:text-[#EB1C2C] text-sm">
                            Privacy Policy
                        </a>
                        <a href="/tc" className="hover:text-[#EB1C2C] text-sm">
                            Terms & Conditions
                        </a>
                        <a href="/refund" className="hover:text-[#EB1C2C] text-sm">
                            Refund
                        </a>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-6">
                    {/* Logo and Copyright */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className={cn("tracking-widest", tiaraFont.className)}>
                            <span className="text-white">Ti</span>
                            <span className="text-[#EB1C2C]">ar</span>
                            <span className="text-white">a</span>
                            <span className="text-[#EB1C2C]">&apos;</span>
                            <span className="text-white">25</span>
                        </div>
                        <span className="text-sm text-center">
                            © Developed by{" "}
                            <a
                                href="https://gdg.community.dev/gdg-on-campus-st-joseph-engineering-college-mangaluru-india/"
                                className="hover:text-[#EB1C2C]"
                            >
                                Google DG SJEC
                            </a>{" "}
                            &{" "}
                            <a href="https://sceptix.in" className="hover:text-[#EB1C2C]">
                                The Sceptix Club
                            </a>
                        </span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-8">
                        <a
                            href="https://www.instagram.com/tiarasjec/"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://sjec.ac.in/"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Website"
                        >
                            <Globe size={20} />
                        </a>
                        <a
                            href="mailto:tiarasjec@sjec.ac.in"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="tel:+91 8867656481"
                            className="hover:text-[#EB1C2C] transition-colors"
                            aria-label="Phone"
                        >
                            <Phone size={20} />
                        </a>
                    </div>

                    {/* Links */}
                    <div className="flex justify-center space-x-4 text-sm">
                        <a href="/privacy" className="hover:text-[#EB1C2C]">
                            Privacy Policy
                        </a>
                        <a href="/tc" className="hover:text-[#EB1C2C]">
                            Terms & Conditions
                        </a>
                        <a href="/refund" className="hover:text-[#EB1C2C]">
                            Refund
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

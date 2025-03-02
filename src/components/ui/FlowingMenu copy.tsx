"use client";
import React, { useLayoutEffect, useRef } from "react";
import { tiaraFont } from "@/lib/fonts";
import { gsap } from "gsap";

interface MenuItemProps {
    link: string;
    text: string;
    image: string;
}

interface FlowingMenuProps {
    items?: MenuItemProps[];
    paragraph?: string;
    categories?: string[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
    items = [],
    paragraph,
    categories = [],
}) => {
    return (
        <div className="w-full h-full overflow-hidden">
            {categories.length > 0 && (
                <ul className="flex space-x-4 mb-4">
                    {categories.map((cat, i) => (
                        <li key={i} className="text-lg uppercase">
                            <span className={tiaraFont.className}>{cat.slice(0, 1)}</span>
                            <span className={tiaraFont.className}>{cat.slice(1)}</span>
                        </li>
                    ))}
                </ul>
            )}
            {paragraph && <p className="my-4 text-base">{paragraph}</p>}
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps & { paragraph?: string }> = ({
    link,
    text,
    image,
    paragraph,
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);

    const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: "expo" };

    const distMetric = (x: number, y: number, x2: number, y2: number): number => {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
    };

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number
    ): "top" | "bottom" => {
        const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
        const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
        return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        const tl = gsap.timeline({ defaults: animationDefaults });

        tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
            .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        const tl = gsap.timeline({ defaults: animationDefaults });

        tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0).to(
            marqueeInnerRef.current,
            { y: edge === "top" ? "101%" : "-101%" },
            0
        );
    };

    const repeatedMarqueeContent = React.useMemo(() => {
        return Array.from({ length: 3 }).map((_, idx) => (
            <React.Fragment key={idx}>
                <span className={`${tiaraFont.className} text-[#060606] font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]`}>{text}
                </span>
                <div
                    className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
                {paragraph && (
                    <span className={`text-[#060606] text-[2vh] leading-[1.2] p-[1vh_1vw_0]`}>
                        {paragraph}
                    </span>
                )}
            </React.Fragment>
        ));
    }, [text, image, paragraph]);

    useLayoutEffect(() => {
        if (marqueeRef.current && marqueeInnerRef.current) {
            gsap.set(marqueeRef.current, { y: "101%" });
            gsap.set(marqueeInnerRef.current, { y: "101%" });
        }
    }, []);

    return (
        <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
            <a
                className="flex items-center justify-center h-full relative cursor-pointer no-underline text-white text-[4vh] hover:text-[#060606] focus:text-white focus-visible:text-[#060606]"
                href={`/events/${text}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className={`${tiaraFont.className} font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]`}>{text}
                </span>
            </a>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white marquee-hidden" ref={marqueeRef}>
                <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
                    <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;

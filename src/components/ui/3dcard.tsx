"use client"
import Image from "next/image";
import { forwardRef } from "react";
import Link  from "next/link";

interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backSrc: string;
    link: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ id, frontSrc, frontAlt, backSrc, link }, ref) => {
    return(
        <div className="card" id={id} ref={ref}>
            <div className="card-wrapper">
                <div className="flip-card-inner">
                <div className="flip-card-front">
                    <Image 
                    priority
                    src={frontSrc}
                    width={500}
                    height={500}
                    alt={frontAlt}
                    />
                </div>
                <div className="flip-card-back">
                    <Link href={link}>
                        <Image 
                            priority
                            src={backSrc}
                            width={500}
                            height={500}
                            alt={frontAlt}
                        />
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
})

Card.displayName = "Card";
export default Card;
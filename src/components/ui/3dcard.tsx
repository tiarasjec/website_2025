"use client"
import Image from "next/image";
import { forwardRef } from "react";
interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backSrc: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ id, frontSrc, frontAlt, backSrc }, ref) => {
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
                <Image 
                    priority
                    src={backSrc}
                    width={500}
                    height={500}
                    alt={frontAlt}
                />
                </div>
                </div>
            </div>
        </div>
    )
})

Card.displayName = "Card";
export default Card;
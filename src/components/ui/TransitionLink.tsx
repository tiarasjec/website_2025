"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "../../utils/animations";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface Props {
  href: string
  label: string
}

const TransitionLink = ({ href, label }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn("text-center text-3xl mr-24 text-white hover:text-red-700", tiaraFont.className)}
    >
      {label}
    </button>
  )
}

export default TransitionLink

"use client";
import TransitionLink from "../components/TransitionLink";
import ShaderVisualization from "../components/Background";

export default function Home(){
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <ShaderVisualization />
            <div className="absolute text-4xl top-16 rounded-full">
            <nav className="h-20 w-max pl-20 backdrop-blur-xl flex flex-row place-items-center justify-between rounded-2xl bg-white/10">
                <div className="flex gap-2">
                    <TransitionLink href="/" label="Home" />
                    <TransitionLink href="/work" label="Work" />
                    <TransitionLink href="/about" label="About" />
                    <TransitionLink href="/rules" label="Rules" />
                    <button className='group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md font-medium'>
                        <div className='inline-flex h-12 translate-y-0 items-center justify-center px-6  bg-gradient-to-r dark:from-[#ff3f3f] dark:to-[#f04131] dark:text-white text-black transition duration-500 group-hover:-translate-y-[150%]'>
                        <TransitionLink href="/register" label="Register" />
                        </div>
                        <div className='absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0'>
                        <span className='absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-[#ff2727] dark:bg-[#ff3333] transition duration-500 group-hover:translate-y-0 group-hover:scale-150'></span>
                        <span className='z-10'><TransitionLink href="/rules" label="Register" /></span>
                        </div>
                    </button>
                </div>
                </nav>
            </div>
            <h1 className="text-3xl font-bold text-gray-500">
                hello tiara2k25
            </h1>
        </div>
    );
}